import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../services/supabaseClient';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  const cleanProductName = (fullName) => {
    if (!fullName) return "";
    let cleaned = fullName;
    // Eemaldab algusest allahindluse protsendi (nt -14%)
    cleaned = cleaned.replace(/^-\d+%\s*/, '');
    // Lõikab nime pooleks esimese numbri või märksõna juurest
    const splitIndex = cleaned.search(/\d|Püsikliendi|Säästad|Saadaval/);
    if (splitIndex !== -1) {
      cleaned = cleaned.substring(0, splitIndex);
    }
    return cleaned.trim();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(10); // Võtame näiteks 10 toodet
      if (!error) setProducts(Array.isArray(data) ? data : []);
    };
    fetchProducts();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (!current) return;
    if (direction === 'left') {
      current.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

return (
  <div className="product-section">
    <div className="product-header">
      <h2>Võib vaja minna...</h2>
      <a 
      href="https://gardest.ee/aiatarbed/kulvitarbed/kulvi_abivahendid/" 
      className="view-all" 
      target="_blank" 
      rel="noopener noreferrer"
      >Vaata kõiki külvitooteid!</a>
    </div>

    <div className="carousel-container">
      {/* Vasak nool ilmub vaid siis, kui on keritud */}
      <button className="nav-btn left" onClick={() => scroll('left')}></button>
      
<div className="product-grid" ref={scrollRef}>
  {(products || []).map((product) => {
    // Veendume, et hinnad on olemas, et vältida arvutusvigu
    const price = product.price || 0;
    const memberPrice = product.member_price || 0;
    
    // Soodustus on siis, kui member_price on reaalne number ja väiksem kui tavahind
    const hasDiscount = memberPrice > 0 && memberPrice < price;
    const discountAmount = (price - memberPrice).toFixed(2);

    return (
      <a key={product?.id} href={product?.product_url || '#'} className="product-card" target="_blank" rel="noopener noreferrer">
        <div className="image-container">
          <img src={product?.image_url} alt={product?.name ?? ''} />
          {hasDiscount && (
            <div className="discount-badge">
              -{Math.round(((price - memberPrice) / price) * 100)}%
            </div>
          )}
        </div>
        
        <h3 className="product-title">{cleanProductName(product?.name)}</h3>
        
        <div className="price-info">
          {hasDiscount ? (
            /* SOODUSTUSEGA VAADE: Hind on lilla, vana hind hall ja lisaks "Säästad" */
            <>
              <div className="price-row">
                <span className="current-price discount">{memberPrice.toFixed(2)} €</span>
                <span className="old-price">{price.toFixed(2)} €</span>
              </div>
              <div className="save-amount">Säästad: {discountAmount} €</div>
            </>
          ) : (
            /* TAVALINE VAADE: Hind on must, all lilla püsikliendi info */
            <>
              <span className="current-price">{price.toFixed(2)} €</span>
              <div className="member-price-row">
                Püsikliendi hind: <span className="price-value">{(price * 0.9).toFixed(2)} €</span>
              </div>
            </>
          )}
        </div>
      </a>
    );
  })}
</div>

      {/* Parem nool asetseb gridi lõpus viimase toote peal */}
      <button className="nav-btn right" onClick={() => scroll('right')}></button>
    </div>
  </div>
);
};

export default ProductList;