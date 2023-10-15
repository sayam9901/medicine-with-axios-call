import React from 'react';

const Transaction = props => {
    return (
        <li>
            <div>{props.name}</div>
            <div>{props.type === 'deposit' ? (
                <span className="deposit"> +{props.price} <button>X</button> </span>
            ) : (
                <span className="expense">
                    -{props.price}
                    <button>X</button> 
                </span>
            )}</div>
        </li>
    );
}

export default Transaction;