import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../services/supabaseClient';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(10); // Võtame näiteks 10 toodet
      if (!error) setProducts(data);
    };
    fetchProducts();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
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
        <a href="https://gardest.ee/aiatarbed/kulvitarbed/kulvi_abivahendid/" target="_blank" rel="noreferrer" className="view-all">
          Vaata kõiki külvitooteid!
        </a>
      </div>

      <div className="carousel-container">
        <button className="nav-btn left" onClick={() => scroll('left')}>‹</button>
        
        <div className="product-grid" ref={scrollRef}>
          {products.map((product) => (
            <a key={product.id} href={product.product_url} target="_blank" rel="noreferrer" className="product-card">
              <div className="image-container">
                <img src={product.image_url} alt={product.name} />
              </div>
              <h3 className="product-title">{product.name}</h3>
              <div className="price-info">
                <span className="current-price">{product.price} €</span>
                {product.member_price && (
                  <div className="member-price">Püsikliendi hind: {product.member_price} €</div>
                )}
              </div>
            </a>
          ))}
        </div>

        <button className="nav-btn right" onClick={() => scroll('right')}>›</button>
      </div>
    </div>
  );
};

export default ProductList;