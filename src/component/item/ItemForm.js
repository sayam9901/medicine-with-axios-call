// ItemForm.js
import React, { useState } from 'react';

function ItemForm({ addToItems }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, description, price, quantity };
    addToItems(newItem);
    // Clear the form fields
    setName('');
    setDescription('');
    setPrice(0);
    setQuantity(1);
  };

  return (
    <div className="item-form">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} required />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default ItemForm;
