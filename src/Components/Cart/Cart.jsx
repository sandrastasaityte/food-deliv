import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return <p className="empty-cart">Your cart is empty</p>;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div className="details">
            <h4>{item.title}</h4>
            <p>${item.price.toFixed(2)} x {item.quantity}</p>
          </div>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
