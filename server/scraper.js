const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');

// Supabase kliendi seadistamine
const supabase = createClient('https://juflbpgirbhwxqkxrhaq.supabase.co', 'sb_publishable_7VZ4HS4jtAWjOL9--1hJUg_P23Te4vn');

// Andmebaasi ühenduse testimine käivitamisel
async function testDb() {
  const { data, error } = await supabase.from('products').select('count', { count: 'exact', head: true });
  if (error) console.error('Supabase ühenduse viga:', error.message);
  else console.log('Supabase ühendus toimib, ridu tabelis hetkel:', data || 0);
}
testDb();

async function scrapeGardest() {
    const browser = await puppeteer.launch({ 
        headless: false, // Näeme akent, et saaksid vajadusel nupule vajutada
        args: ['--no-sandbox', '--disable-web-security'] 
    });
    const page = await browser.newPage();
    
    try {
        await page.setViewport({ width: 1280, height: 1000 });
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        console.log('Navigeerin lehele...');
        await page.goto('https://gardest.ee/aiatarbed/kulvitarbed/kulvi_abivahendid/', { waitUntil: 'networkidle2' });

        // Ootame hetke ja liigutame hiirt, et popupid aktiveeruksid
        await new Promise(r => setTimeout(r, 2000));
        await page.mouse.move(100, 100);

        console.log('SULGE NÜÜD KÄSITSI KÜPSISTE AKEN (LILLA NUPP), KUI SEE ON EES!');

        // Ootame, kuni DOM-i ilmub vähemalt üks .product element (sinu testitud klass)
        console.log('Ootan, kuni tooted (.product) ilmuvad lehele...');
        await page.waitForFunction(() => document.querySelectorAll('.product').length > 0, { timeout: 30000 });

        console.log('Tooted leitud! Kerin lehe lõpuni, et laadida pildid...');
        await autoScroll(page);
        
        // Väike paus pärast kerimist, et pildid jõuaksid "kohale hüpata"
        await new Promise(r => setTimeout(r, 2000));

        const products = await page.evaluate(() => {
            const items = [];
            const elements = document.querySelectorAll('.product');
            
            elements.forEach(el => {
                const name = el.querySelector('.woocommerce-loop-product__title')?.innerText.trim();
                
                // Hinna otsing (bdi märgend WooCommerce-s)
                const priceEl = el.querySelector('.price bdi') || el.querySelector('.amount');
                let priceText = priceEl?.innerText.replace(/[^\d.,]/g, '').replace(',', '.').trim();
                
                // Pildi kättesaamine (toetab lazy-load'i)
                const imgEl = el.querySelector('img');
                const img = imgEl?.getAttribute('data-src') || imgEl?.src;
                
                const url = el.querySelector('a')?.href;

                if (name && priceText) {
                    items.push({
                        name: name,
                        price: parseFloat(priceText),
                        image_url: img,
                        product_url: url
                    });
                }
            });
            return items;
        });

        if (products.length === 0) {
            console.log("Hoiatus: Ikka 0 toodet. Kontrolli, kas vajutasid popupi kinni.");
        } else {
            console.log(`Edu! Leiti ${products.length} toodet. Salvestan Supabase'i...`);
            
            // Upsert (uuenda kui nimi on sama, muidu lisa uus)
            const { error: upsertError } = await supabase
                .from('products')
                .upsert(products, { onConflict: 'name' });

            if (upsertError) {
                console.error('Viga salvestamisel:', upsertError.message);
            } else {
                console.log('Andmebaas on edukalt uuendatud!');
            }
        }

    } catch (err) {
        console.error('Viga kraapimisprotsessis:', err);
    } finally {
        console.log('Kraapimine lõpetatud. Sulgen brauseri 5 sekundi pärast...');
        await new Promise(r => setTimeout(r, 5000));
        await browser.close();
    }
}

// Abifunktsioon lehe sujuvaks kerimiseks
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 150; // Natuke suurem samm kiiremaks kerimiseks
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

module.exports = scrapeGardest;