import React, { useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        alert(`Added ${quantity} x ${product.name} to cart!`);
    };

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return (
        <div className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}>
            {product.isNew && <div className="badge new-badge">NEW</div>}
            {discountPercentage > 0 && (
                <div className="badge discount-badge">{discountPercentage}% OFF</div>
            )}
            
            <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button 
                    className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={handleWishlist}
                >
                    {isWishlisted ? '❤️' : '🤍'}
                </button>
                {!product.inStock && <div className="out-of-stock-overlay">Out of Stock</div>}
            </div>

            <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-tags">
                    {product.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>

                <div className="product-meta">
                    <div className="rating">
                        <span className="stars">⭐</span>
                        <span>{product.rating}</span>
                        <span className="reviews">({product.reviews} reviews)</span>
                    </div>
                    <div className="cook-time">🕒 {product.cookTime}</div>
                </div>

                <div className="product-pricing">
                    <div className="price-section">
                        <span className="current-price">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                            <span className="original-price">₹{product.originalPrice}</span>
                        )}
                    </div>
                </div>

                {product.inStock && (
                    <div className="product-actions">
                        <div className="quantity-selector">
                            <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="qty-btn"
                            >
                                -
                            </button>
                            <span className="quantity">{quantity}</span>
                            <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="qty-btn"
                            >
                                +
                            </button>
                        </div>
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
