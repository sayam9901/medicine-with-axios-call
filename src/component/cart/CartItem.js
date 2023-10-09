
import React from 'react';

function CartItem({ item }) {
  return (
    <div className="cart-item">
      <div>
        <strong>{item.name}</strong>
        <p>{item.description}</p>
        <p>Price: ${item.price.toFixed(2)}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    </div>
  );
}

export default CartItem;
