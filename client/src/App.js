import React from 'react';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="app">
      <div className="content-section"></div>
      <div className="content-section">
        <ProductList /> {/* Keskmine box */}
        </div>
      <div className="content-section"></div>
    </div>
  );
}

export default App;
