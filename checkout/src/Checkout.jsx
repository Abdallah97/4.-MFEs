import React, { useState } from "react";
import "./Checkout.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Classic Margherita Pizza", price: 299, quantity: 1, image: "🍕" },
    { id: 2, name: "Chicken Biryani", price: 399, quantity: 2, image: "🍛" },
    { id: 3, name: "Burger Deluxe", price: 199, quantity: 1, image: "🍔" }
  ]);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "card"
  });

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryFee = () => {
    return getSubtotal() > 500 ? 0 : 50;
  };

  const getTotalPrice = () => {
    return getSubtotal() + getDeliveryFee() - discount;
  };

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo({ ...customerInfo, [field]: value });
  };

  const applyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setDiscount(getSubtotal() * 0.1);
    } else if (promoCode === "FIRSTORDER") {
      setDiscount(50);
    } else {
      alert("Invalid promo code");
    }
  };

  const handleCheckout = () => {
    if (customerInfo.name && customerInfo.email && customerInfo.address) {
      alert(`Order placed successfully! Total: ₹${getTotalPrice()}`);
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <div className="checkout-app">
      <div className="checkout-header">
        <h1>🛒 Checkout</h1>
        <p>Review your order and complete your purchase</p>
      </div>
      
      <div className="checkout-container">
        <div className="order-summary">
          <h2>Order Summary</h2>
          <OrderItems 
            items={cartItems} 
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
          
          <div className="promo-section">
            <div className="promo-input-group">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-input"
              />
              <button onClick={applyPromoCode} className="promo-btn">Apply</button>
            </div>
          </div>

          <div className="total-section">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>₹{getSubtotal()}</span>
            </div>
            <div className="total-row">
              <span>Delivery Fee:</span>
              <span>{getDeliveryFee() === 0 ? "FREE" : `₹${getDeliveryFee()}`}</span>
            </div>
            {discount > 0 && (
              <div className="total-row discount">
                <span>Discount:</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="total-row total-final">
              <span>Total:</span>
              <span>₹{getTotalPrice()}</span>
            </div>
          </div>
        </div>

        <div className="customer-details">
          <h2>Delivery Information</h2>
          <CustomerForm 
            customerInfo={customerInfo}
            onChange={handleCustomerInfoChange}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

const OrderItems = ({ items, updateQuantity, removeItem }) => (
  <div className="order-items">
    {items.map((item) => (
      <OrderItem 
        key={item.id} 
        item={item} 
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    ))}
  </div>
);

const OrderItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="order-item">
      <div className="item-image">{item.image}</div>
      <div className="item-info">
        <h3>{item.name}</h3>
        <p className="item-price">₹{item.price} each</p>
      </div>
      <div className="item-controls">
        <div className="quantity-controls">
          <button 
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button 
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="item-total">₹{item.price * item.quantity}</div>
        <button 
          className="remove-btn"
          onClick={() => removeItem(item.id)}
        >
          ×
        </button>
      </div>
    </div>
  );
};

const CustomerForm = ({ customerInfo, onChange, onCheckout }) => {
  return (
    <div className="customer-form">
      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          value={customerInfo.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Enter your full name"
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          value={customerInfo.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="Enter your email"
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="tel"
          value={customerInfo.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="Enter your phone number"
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label>Delivery Address *</label>
        <textarea
          value={customerInfo.address}
          onChange={(e) => onChange('address', e.target.value)}
          placeholder="Enter your complete address"
          className="form-textarea"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>Payment Method</label>
        <select
          value={customerInfo.paymentMethod}
          onChange={(e) => onChange('paymentMethod', e.target.value)}
          className="form-select"
        >
          <option value="card">Credit/Debit Card</option>
          <option value="upi">UPI</option>
          <option value="cod">Cash on Delivery</option>
        </select>
      </div>
      
      <button className="checkout-btn" onClick={onCheckout}>
        🚀 Place Order
      </button>
    </div>
  );
};

// Export as Checkout for compatibility with existing imports
export default Checkout;
