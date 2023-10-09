
import React, { useState } from 'react';
import './App.css';
import ItemForm from './component/item/ItemForm';
import ItemList from './component/item/ItemList';
import Cart from './component/cart/Cart';

function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToItems = (item) => {
    setItems([...items, item]);
  };

  const addToCart = (item) => {
    const updatedItems = items.map((i) =>
    i === item ? { ...i, quantity: i.quantity - 1 } : i
  );
  setItems(updatedItems);
    setCart([...cart, item]);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="App">
      <header>
        <h1>Shopping Cart Project</h1>
        <button onClick={toggleCart}>Cart</button>
      </header>
      <div className="container">
        <ItemForm addToItems={addToItems} />
        <ItemList items={items} addToCart={addToCart}  />
      </div>
      {showCart && <Cart cart={cart} />}
    </div>
  );
}

export default App;
