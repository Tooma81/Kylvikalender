const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');

// Supabase kliendi seadistamine
// Server-side scraper vajab service_role key't, mis ületab RLS poliitikad
// Kui SERVICE_ROLE_KEY pole määratud, kasutame anon key't (ei tööta RLS-iga)
const supabaseUrl = 'https://juflbpgirbhwxqkxrhaq.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_7VZ4HS4jtAWjOL9--1hJUg_P23Te4vn';

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('⚠️  HOIATUS: Kasutame anon key\'t. RLS võib blokeerida salvestamise.');
    console.warn('   Määra SUPABASE_SERVICE_ROLE_KEY keskkonnamuutuja, et vältida RLS vigu.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

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
        await new Promise(r => setTimeout(r, 3000)); // Andme aega popupi sulgemiseks

        // Ootame, kuni lehel on vähemalt mingi toote konteiner
        console.log('Ootan, kuni tooted laadivad...');
        try {
            await page.waitForFunction(() => {
                const selectors = [
                    '.product',
                    'li.product',
                    '.type-product',
                    '.woocommerce-loop-product__link',
                    '.products li'
                ];
                return selectors.some(sel => document.querySelectorAll(sel).length > 0);
            }, { timeout: 30000 });
            console.log('✓ Tooted on lehel laetud');
        } catch (waitError) {
            console.log('⚠ Ootamine aegus, aga jätkame...');
        }

        // Debug: Kontrollime, mis on lehel tegelikult
        console.log('=== DEBUG: Kontrollin lehe struktuuri ===');
        const pageInfo = await page.evaluate(() => {
            const info = {
                productCount: document.querySelectorAll('.product').length,
                productTypeCount: document.querySelectorAll('.type-product').length,
                wcProductCount: document.querySelectorAll('.woocommerce-loop-product__link').length,
                allLinks: document.querySelectorAll('a[href*="product"]').length,
                allImages: document.querySelectorAll('img').length,
                bodyClasses: document.body.className,
                // Proovime leida mis tahes toote konteineri
                possibleSelectors: {}
            };
            
            // Testime erinevaid selektoreid
            const selectors = [
                '.product',
                '.type-product',
                '.woocommerce-loop-product__link',
                'li.product',
                '.products li',
                '.wc-block-grid__product',
                '[class*="product"]'
            ];
            
            selectors.forEach(sel => {
                try {
                    const elements = document.querySelectorAll(sel);
                    info.possibleSelectors[sel] = elements.length;
                    if (elements.length > 0) {
                        // Võtame esimese elemendi näidise
                        const firstEl = elements[0];
                        info.possibleSelectors[sel + '_sample'] = {
                            className: firstEl.className,
                            tagName: firstEl.tagName,
                            innerHTML: firstEl.innerHTML.substring(0, 200)
                        };
                    }
                } catch (e) {
                    info.possibleSelectors[sel] = 'error: ' + e.message;
                }
            });
            
            return info;
        });
        
        console.log('Lehe info:', JSON.stringify(pageInfo, null, 2));
        
        // Proovime erinevaid selektoreid
        let productSelector = null;
        const selectorOptions = [
            '.product',
            'li.product',
            '.type-product',
            '.woocommerce-loop-product__link',
            '.products li',
            '[class*="product"]'
        ];
        
        for (const selector of selectorOptions) {
            const count = await page.evaluate((sel) => {
                return document.querySelectorAll(sel).length;
            }, selector);
            
            if (count > 0) {
                console.log(`✓ Leitud ${count} elementi selektoriga: ${selector}`);
                productSelector = selector;
                break;
            } else {
                console.log(`✗ Selektor "${selector}" ei leidnud elemente`);
            }
        }
        
        if (!productSelector) {
            console.error('❌ Ühtegi toote selektorit ei leitud!');
            console.log('Võtan ekraanipildi debugimiseks...');
            await page.screenshot({ path: 'debug-page.png', fullPage: true });
            console.log('Ekraanipilt salvestatud: debug-page.png');
            
            // Proovime veel kord oodata
            console.log('Ootan 5 sekundit ja proovin uuesti...');
            await new Promise(r => setTimeout(r, 5000));
            
            const retryCount = await page.evaluate(() => {
                return document.querySelectorAll('.product, li.product, .type-product').length;
            });
            
            if (retryCount === 0) {
                throw new Error('Tooteid ei leitud. Võimalik, et lehe struktuur on muutunud või popup blokeerib sisu.');
            }
            productSelector = '.product, li.product, .type-product';
        }

        console.log(`Tooted leitud selektoriga: ${productSelector}`);
        console.log('Kerin lehe lõpuni, et laadida pildid...');
        await autoScroll(page);
        
        // Väike paus pärast kerimist, et pildid jõuaksid "kohale hüpata"
        await new Promise(r => setTimeout(r, 2000));

        const products = await page.evaluate((selector) => {
            const items = [];
            const elements = document.querySelectorAll(selector);
            
            console.log(`Eval: Leitud ${elements.length} elementi`);
            
            elements.forEach((el, index) => {
                // Proovime erinevaid nime selektoreid
                const nameSelectors = [
                    '.woocommerce-loop-product__title',
                    'h2',
                    'h3',
                    '.product-title',
                    'a.woocommerce-loop-product__link',
                    '[class*="title"]'
                ];
                
                let name = null;
                for (const nameSel of nameSelectors) {
                    const nameEl = el.querySelector(nameSel);
                    if (nameEl && nameEl.innerText && nameEl.innerText.trim()) {
                        name = nameEl.innerText.trim();
                        break;
                    }
                }
                
                // Kui nimi on linkis, proovime seda
                if (!name) {
                    const linkEl = el.querySelector('a');
                    if (linkEl && linkEl.title) {
                        name = linkEl.title.trim();
                    } else if (linkEl && linkEl.innerText) {
                        name = linkEl.innerText.trim();
                    }
                }
                
                // Hinna otsing (proovime erinevaid variante)
                const priceSelectors = [
                    '.price bdi',
                    '.price .amount',
                    '.price',
                    '[class*="price"]',
                    '.woocommerce-Price-amount'
                ];
                
                let priceText = null;
                for (const priceSel of priceSelectors) {
                    const priceEl = el.querySelector(priceSel);
                    if (priceEl && priceEl.innerText) {
                        priceText = priceEl.innerText.replace(/[^\d.,]/g, '').replace(',', '.').trim();
                        if (priceText) break;
                    }
                }
                
                // Pildi kättesaamine (toetab lazy-load'i)
                const imgEl = el.querySelector('img');
                const img = imgEl ? (imgEl.getAttribute('data-src') || imgEl.getAttribute('data-lazy-src') || imgEl.src) : null;
                
                const url = el.querySelector('a')?.href;

                if (name && priceText) {
                    items.push({
                        name: name,
                        price: parseFloat(priceText),
                        image_url: img,
                        product_url: url
                    });
                } else {
                    // Debug: logime, miks element ei läinud läbi
                    console.log(`Element ${index} ei läinud läbi:`, {
                        hasName: !!name,
                        name: name,
                        hasPrice: !!priceText,
                        priceText: priceText,
                        className: el.className
                    });
                }
            });
            return items;
        }, productSelector);

        console.log(`\n=== TULEMUSED ===`);
        console.log(`Leitud tooteid: ${products.length}`);
        
        if (products.length > 0) {
            console.log('Esimene toode näidis:', products[0]);
        }

        if (products.length === 0) {
            console.log("❌ Hoiatus: 0 toodet leitud.");
            console.log("Võimalikud põhjused:");
            console.log("1. Popup blokeerib sisu");
            console.log("2. Lehe struktuur on muutunud");
            console.log("3. Tooted laadivad AJAX-iga ja vajavad rohkem aega");
            
            // Võtame veel ühe ekraanipildi
            await page.screenshot({ path: 'debug-no-products.png', fullPage: true });
            console.log('Debug ekraanipilt salvestatud: debug-no-products.png');
        } else {
            console.log(`✓ Edu! Leiti ${products.length} toodet. Salvestan Supabase'i...`);
            
            // Upsert (uuenda kui nimi on sama, muidu lisa uus)
            const { error: upsertError } = await supabase
                .from('products')
                .upsert(products, { onConflict: 'name' });

            if (upsertError) {
                console.error('Viga salvestamisel:', upsertError.message);
            } else {
                console.log('✓ Andmebaas on edukalt uuendatud!');
            }
        }

    } catch (err) {
        console.error('❌ Viga kraapimisprotsessis:', err);
        console.error(err.stack);
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