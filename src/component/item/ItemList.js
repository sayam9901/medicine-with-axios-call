
import React from 'react';

function ItemList({ items, addToCart }) {
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
      // Fetch initial data from the API when the component mounts
      if (!dataFetched) {
        axios.get('https://crudcrud.com/api/651488945048411aa2fc4ac9eec50a47/items')
          .then((response) => {
            setItems(response.data);
            setDataFetched(true);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    }, [dataFetched, setItems]);
  return (
    <div className="item-list">
      <h2>Items</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => addToCart(item)} disabled={item.quantity <= 0} >Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;
