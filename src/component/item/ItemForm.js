// ItemForm.js
import React, { useState } from 'react';
import axios from 'axios';

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
    axios.post('https://crudcrud.com/api/651488945048411aa2fc4ac9eec50a47/items', newItem)
    .then((response) => {
      // addToItems(response.data); // Add the new item to the local state
      console.log(response.data)
    })
    .catch((error) => {
      console.error('Error posting data:', error);
    });
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
