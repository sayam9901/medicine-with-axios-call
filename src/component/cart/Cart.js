
import React from 'react';
import CartItem from './CartItem';

function Cart({ cart }) {
  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-items">
        {cart.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Cart;
