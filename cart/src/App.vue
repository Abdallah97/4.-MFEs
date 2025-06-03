<template>
  <div class="shopping-cart-app">
    <div class="cart-header">
      <h1>🛍️ Shopping Cart</h1>
      <p>{{ cartItems.length }} {{ cartItems.length === 1 ? 'item' : 'items' }} in your cart</p>
    </div>

    <div class="cart-content" v-if="cartItems.length > 0">
      <div class="cart-items">
        <div 
          v-for="item in cartItems" 
          :key="item.id" 
          class="cart-item"
        >
          <div class="item-image">{{ item.emoji }}</div>
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-category">{{ item.category }}</p>
            <p class="item-price">₹{{ item.price }}</p>
          </div>
          <div class="item-actions">
            <div class="quantity-controls">
              <Button 
                text="-" 
                variant="secondary" 
                :small="true"
                @click="updateQuantity(item.id, item.quantity - 1)"
              />
              <span class="quantity">{{ item.quantity }}</span>
              <Button 
                text="+" 
                variant="secondary" 
                :small="true"
                @click="updateQuantity(item.id, item.quantity + 1)"
              />
            </div>
            <div class="item-total">₹{{ item.price * item.quantity }}</div>
            <Button 
              text="Remove" 
              variant="danger" 
              :small="true"
              @click="removeFromCart(item.id)"
            />
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>₹{{ subtotal }}</span>
        </div>
        <div class="summary-row">
          <span>Tax (18%):</span>
          <span>₹{{ tax }}</span>
        </div>
        <div class="summary-row">
          <span>Delivery:</span>
          <span>{{ deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee }}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>₹{{ total }}</span>
        </div>
        
        <div class="cart-actions">
          <Button 
            text="Continue Shopping" 
            variant="secondary" 
            @click="continueShopping"
          />
          <Button 
            text="Proceed to Checkout" 
            variant="primary" 
            @click="proceedToCheckout"
          />
        </div>
      </div>
    </div>

    <div class="empty-cart" v-else>
      <div class="empty-cart-icon">🛒</div>
      <h2>Your cart is empty</h2>
      <p>Add some delicious items to get started!</p>
      <Button 
        text="Start Shopping" 
        variant="primary" 
        @click="startShopping"
      />
    </div>

    <div class="suggested-items" v-if="cartItems.length > 0">
      <h3>You might also like</h3>
      <div class="suggested-grid">
        <div 
          v-for="item in suggestedItems" 
          :key="item.id"
          class="suggested-item"
          @click="addToCart(item)"
        >
          <div class="suggested-emoji">{{ item.emoji }}</div>
          <h4>{{ item.name }}</h4>
          <p>₹{{ item.price }}</p>
        </div>
      </div>
    </div>

    <div v-if="lastAction" class="notification" :class="notificationClass">
      {{ lastAction }}
    </div>
  </div>
</template>

<script>
import Button from './components/Button.vue';

export default {
  components: {
    Button
  },
  data() {
    return {
      cartItems: [
        {
          id: 1,
          name: "Classic Margherita Pizza",
          category: "Italian",
          price: 299,
          quantity: 1,
          emoji: "🍕"
        },
        {
          id: 2,
          name: "Chicken Biryani",
          category: "Indian",
          price: 399,
          quantity: 2,
          emoji: "🍛"
        },
        {
          id: 3,
          name: "Chocolate Cake",
          category: "Dessert",
          price: 199,
          quantity: 1,
          emoji: "🍰"
        }
      ],
      suggestedItems: [
        { id: 4, name: "French Fries", price: 99, emoji: "🍟" },
        { id: 5, name: "Ice Cream", price: 149, emoji: "🍦" },
        { id: 6, name: "Burger", price: 249, emoji: "🍔" },
        { id: 7, name: "Pasta", price: 279, emoji: "🍝" }
      ],
      lastAction: null,
      notificationClass: ''
    };
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    tax() {
      return Math.round(this.subtotal * 0.18);
    },
    deliveryFee() {
      return this.subtotal > 500 ? 0 : 50;
    },
    total() {
      return this.subtotal + this.tax + this.deliveryFee;
    }
  },
  methods: {
    updateQuantity(id, newQuantity) {
      if (newQuantity > 0) {
        const item = this.cartItems.find(item => item.id === id);
        if (item) {
          item.quantity = newQuantity;
          this.showNotification(`Updated ${item.name} quantity`, 'success');
        }
      }
    },
    removeFromCart(id) {
      const item = this.cartItems.find(item => item.id === id);
      if (item) {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
        this.showNotification(`Removed ${item.name} from cart`, 'error');
      }
    },
    addToCart(item) {
      const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cartItems.push({ ...item, quantity: 1 });
      }
      this.showNotification(`Added ${item.name} to cart`, 'success');
    },
    continueShopping() {
      this.showNotification('Redirecting to shop...', 'info');
    },
    proceedToCheckout() {
      this.showNotification(`Proceeding to checkout with ${this.cartItems.length} items`, 'success');
    },
    startShopping() {
      this.showNotification('Redirecting to shop...', 'info');
    },
    showNotification(message, type) {
      this.lastAction = message;
      this.notificationClass = type;
      setTimeout(() => {
        this.lastAction = null;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.shopping-cart-app {
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.cart-header {
  text-align: center;
  margin-bottom: 40px;
  color: white;
}

.cart-header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.cart-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .cart-header h1 {
    font-size: 2rem;
  }
}

.cart-items {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.cart-item:hover {
  background: #f7fafc;
  border-radius: 12px;
  padding: 20px 16px;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  font-size: 3rem;
  margin-right: 20px;
  background: #f7fafc;
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-details {
  flex: 1;
  margin-right: 20px;
}

.item-details h3 {
  color: #2d3748;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.item-category {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.item-price {
  color: #4299e1;
  font-size: 1.1rem;
  font-weight: 600;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f7fafc;
  padding: 8px 16px;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
}

.quantity {
  font-weight: 600;
  color: #2d3748;
  font-size: 1.1rem;
  min-width: 20px;
  text-align: center;
}

.item-total {
  font-weight: 700;
  color: #2d3748;
  font-size: 1.3rem;
  min-width: 100px;
  text-align: center;
}

.cart-summary {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  font-size: 1.1rem;
  border-bottom: 1px solid #e2e8f0;
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-row.total {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  border-top: 3px solid #4299e1;
  margin-top: 16px;
  padding-top: 16px;
}

.cart-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.empty-cart {
  text-align: center;
  background: white;
  border-radius: 20px;
  padding: 60px 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.empty-cart-icon {
  font-size: 5rem;
  margin-bottom: 20px;
}

.empty-cart h2 {
  color: #2d3748;
  font-size: 2rem;
  margin-bottom: 12px;
}

.empty-cart p {
  color: #718096;
  font-size: 1.1rem;
  margin-bottom: 30px;
}

.suggested-items {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.suggested-items h3 {
  color: #2d3748;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.suggested-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.suggested-item {
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.suggested-item:hover {
  background: #4299e1;
  color: white;
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(66, 153, 225, 0.3);
}

.suggested-emoji {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.suggested-item h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.suggested-item p {
  font-weight: 700;
  font-size: 1.1rem;
}

.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 16px 24px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

.notification.success {
  background: #38a169;
}

.notification.error {
  background: #e53e3e;
}

.notification.info {
  background: #4299e1;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
