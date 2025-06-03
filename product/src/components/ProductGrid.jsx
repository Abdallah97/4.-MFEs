import React from "react";
import ProductCard from "./ProductCard.jsx";
import "./ProductGrid.css";

const ProductGrid = ({ products }) => {
    if (products.length === 0) {
        return (
            <div className="no-products">
                <div className="no-products-icon">🍽️</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters to see more items</p>
            </div>
        );
    }

    return (
        <div className="product-grid">
            <div className="products-header">
                <h2>Available Items ({products.length})</h2>
            </div>
            <div className="products-container">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
