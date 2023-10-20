import React from 'react';
import { getDatabase, ref, remove } from 'firebase/database';

const Transaction = props => {
    const { name, price, type, currentUID, transactionId } = props;
    //function to delete the transaction from the firebase realtime database
    const handleDelete = () => {
        const db = getDatabase();
        const transactionRef = ref(db, `Transactions/${currentUID}/${transactionId}`);

        remove(transactionRef)
            .then(() => {
                console.log('Transaction deleted successfully.');
            })
            .catch(error => {
                console.error('Error deleting transaction:', error);
            });
    };
    return (
        <li>
            <div>{name}</div>
            <div>{type === 'deposit' ? (
                <span className="deposit"> +{price} <button onClick={handleDelete}>X</button> </span>
            ) : (
                <span className="expense">
                    -{price}
                    <button onClick={handleDelete}>X</button> 
                </span>
            )}</div>
        </li>
    );
}

export default Transaction;