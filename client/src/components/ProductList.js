import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient'; 
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Küsime andmed tabelist 'products'
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error("Supabase viga:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="product-section">Laen Gardesti tooteid...</div>;

  return (
    <div className="product-section">
      <div className="product-header">
        <h2>Võib vaja minna...</h2>
        <a href="https://gardest.ee" target="_blank" rel="noreferrer" className="view-all">
          Vaata kõiki külvitooteid!
        </a>
      </div>
      
      <div className="product-grid">
        {products.map((product) => (
          <a key={product.id} href={product.product_url} target="_blank" rel="noreferrer" className="product-card">
            <div className="image-container">
              {/* Kui pilt on Supabase Storage'is, pane siia täispikk URL */}
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
    </div>
  );
};

export default ProductList;