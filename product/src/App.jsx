import React, { useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard.jsx";
import ProductGrid from "./components/ProductGrid.jsx";

const ProductApp = () => {
    const [products] = useState([
        {
            id: 1,
            image: "https://cdn.dummyjson.com/recipe-images/1.webp",
            name: "Classic Margherita Pizza",
            category: "Italian",
            price: 299,
            originalPrice: 349,
            rating: 4.5,
            reviews: 128,
            description: "A classic Italian pizza with fresh tomato sauce, mozzarella cheese, and fresh basil leaves.",
            tags: ["Vegetarian", "Popular", "Italian"],
            cookTime: "15-20 mins",
            isNew: false,
            inStock: true
        },
        {
            id: 2,
            image: "https://cdn.dummyjson.com/recipe-images/2.webp",
            name: "Chicken Biryani",
            category: "Indian",
            price: 399,
            originalPrice: 449,
            rating: 4.7,
            reviews: 256,
            description: "Aromatic basmati rice cooked with tender chicken pieces and traditional Indian spices.",
            tags: ["Spicy", "Non-Veg", "Chef's Special"],
            cookTime: "25-30 mins",
            isNew: true,
            inStock: true
        },
        {
            id: 3,
            image: "https://cdn.dummyjson.com/recipe-images/3.webp",
            name: "Chocolate Brownie",
            category: "Dessert",
            price: 199,
            originalPrice: 229,
            rating: 4.3,
            reviews: 89,
            description: "Rich and fudgy chocolate brownie served warm with vanilla ice cream.",
            tags: ["Sweet", "Dessert", "Popular"],
            cookTime: "5-10 mins",
            isNew: false,
            inStock: true
        },
        {
            id: 4,
            image: "https://cdn.dummyjson.com/recipe-images/4.webp",
            name: "Caesar Salad",
            category: "Healthy",
            price: 249,
            originalPrice: 279,
            rating: 4.2,
            reviews: 67,
            description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan cheese.",
            tags: ["Healthy", "Vegetarian", "Light"],
            cookTime: "10-15 mins",
            isNew: false,
            inStock: false
        },
        {
            id: 5,
            image: "https://cdn.dummyjson.com/recipe-images/5.webp",
            name: "Beef Burger",
            category: "American",
            price: 329,
            originalPrice: 369,
            rating: 4.6,
            reviews: 142,
            description: "Juicy beef patty with lettuce, tomato, cheese, and our special sauce.",
            tags: ["Non-Veg", "American", "Bestseller"],
            cookTime: "15-20 mins",
            isNew: true,
            inStock: true
        },
        {
            id: 6,
            image: "https://cdn.dummyjson.com/recipe-images/6.webp",
            name: "Pasta Alfredo",
            category: "Italian",
            price: 279,
            originalPrice: 319,
            rating: 4.4,
            reviews: 98,
            description: "Creamy alfredo pasta with garlic, parmesan cheese, and fresh herbs.",
            tags: ["Vegetarian", "Creamy", "Italian"],
            cookTime: "20-25 mins",
            isNew: false,
            inStock: true
        }
    ]);

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("name");

    const categories = ["All", "Italian", "Indian", "American", "Healthy", "Dessert"];

    const filteredProducts = products.filter(product => 
        selectedCategory === "All" || product.category === selectedCategory
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            case "rating":
                return b.rating - a.rating;
            case "name":
            default:
                return a.name.localeCompare(b.name);
        }
    });

    return (
        <div className="product-app">
            <div className="app-header">
                <h1>🍽️ Our Menu</h1>
                <p>Discover delicious food from around the world</p>
                
                <div className="filters">
                    <div className="category-filter">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    
                    <div className="sort-filter">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </div>
            </div>

            <ProductGrid products={sortedProducts} />
        </div>
    )
}

export default ProductApp;
