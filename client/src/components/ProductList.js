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
      <a href="..." className="view-all">Vaata kõiki külvitooteid!</a>
    </div>

    <div className="carousel-container">
      {/* Vasak nool ilmub vaid siis, kui on keritud */}
      <button className="nav-btn left" onClick={() => scroll('left')}></button>
      
      <div className="product-grid" ref={scrollRef}>
        {products.map((product) => (
          <a key={product.id} href={product.product_url} className="product-card">
            <div className="image-container">
              <img src={product.image_url} alt={product.name} />
            </div>
            <h3 className="product-title">{product.name}</h3>
            <div className="price-info">
              <span className="current-price">{product.price.toFixed(2)} €</span>
              {/* Lisa siia ka säästu info kui andmebaasis olemas */}
            </div>
          </a>
        ))}
      </div>

      {/* Parem nool asetseb gridi lõpus viimase toote peal */}
      <button className="nav-btn right" onClick={() => scroll('right')}></button>
    </div>
  </div>
);
};

export default ProductList;