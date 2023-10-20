import React, { Component } from 'react';
import './Tracker.css';
import {fire ,auth}from '../../config/Fire';
import {onAuthStateChanged,  signOut } from 'firebase/auth';
import { getDatabase, ref, push, get } from 'firebase/database'; 
import Transaction from './Transaction/Transaction';

class Tracker extends Component {

    state = {
        transactions: [],
        money: 0,

        transactionName: '',
        transactionType: '',
        price: '',
        currentUID: null,
        isBlackBackground: false ,
    }
    componentDidMount() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.setState({ currentUID: user.uid }, () => {
                    this.loadTransactions(user.uid);
                });
            }
        });
    }
    loadTransactions(currentUID) {
        if (!currentUID) {
            return; // Exit if currentUID is not available
        }
        const db = getDatabase(fire);  // Get the database object associated with your Firebase app
        const transactionsRef = ref(db, `Transactions/${currentUID}`);

        get(transactionsRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const transactions = Object.keys(data).map((id) => ({
                    id,
                    ...data[id],
                }));
                const totalMoney = transactions.reduce((total, transaction) => {
                    return transaction.type === 'deposit' ? total + parseFloat(transaction.price) : total - parseFloat(transaction.price);
                }, 0);

                this.setState({
                    transactions,
                    money: totalMoney,
                });
            }
        });
    }

    // logout function
    logout = () => {
        signOut(auth);
    }

    handleChange = input => e => {
        this.setState({
            [input]: e.target.value !=="0" ? e.target.value : ""
        });
    }

    // add transaction
    addNewTransaction = () => {
        const { transactionName, transactionType, price, currentUID, money } = this.state;
    
        if (transactionName && transactionType && price && currentUID) {
            const db = getDatabase(fire); // Get the database object associated with your Firebase app
            const transactionsRef = ref(db, `Transactions/${currentUID}`);
    
            const newTransaction = {
                name: transactionName,
                type: transactionType,
                price: price,
                user_id: currentUID,
            };
    
            // Push the new transaction to the database
            push(transactionsRef, newTransaction)
                .then(() => {
                    // Success callback
                    const transactions = [...this.state.transactions, newTransaction];
                    const updatedMoney = transactionType === 'deposit' ? money + parseFloat(price) : money - parseFloat(price);
    
                    this.setState({
                        transactions,
                        money: updatedMoney,
                        transactionName: '',
                        transactionType: '',
                        price: '',
                    });
                })
                .catch((error) => {
                    // Error callback
                    console.log('Error:', error);
                });
        } else {
            // Handle the case where data is missing or currentUID is undefined
            console.log('Incomplete data or undefined currentUID.');
        }
    }
    toggleBackground = () => {
        this.setState((prevState) => ({
            isBlackBackground: !prevState.isBlackBackground,
        }));
    };

    render() {
        // const app = initializeApp(appConfig); // Initialize Firebase app using your configuration
        // const auth = getAuth(app); // Get the auth object associated with your Firebase app
        const currentUser = auth.currentUser;
        const { isBlackBackground } = this.state;
        const backgroundClass = isBlackBackground ? 'black-background' : 'white-background';
        return (
        <div  className={`trackerBlock ${backgroundClass}`}>
                <div className="welcome">
                    <span>Hi, {currentUser.displayName}!</span>
                    {
                        this.state.money>=10000 && <button className="exit" onClick={this.toggleBackground}>PREMIUM</button>
                    }
                    {
                        isBlackBackground && <button className="exit" >DOWNLOAD</button>
                    }
                    <button className="exit" onClick={this.logout}>Logout</button>
                </div>
                <div className="totalMoney">${this.state.money}</div>

                <div className="newTransactionBlock">
                    <div className="newTransaction">
                        <form>
                            <input
                                onChange={this.handleChange('transactionName')}
                                value={this.state.transactionName}
                                placeholder="Transaction Name"
                                type="text"
                                name="transactionName"
                            />
                            <div className="inputGroup">
                                <select name="type"
                                    onChange={this.handleChange('transactionType')}
                                    value={this.state.transactionType}
                                >
                                    <option value="0">Type</option>
                                    <option value="expense">Expense</option>
                                    <option value="deposit">Deposit</option>
                                </select>
                                <input
                                    onChange={this.handleChange('price')}
                                    value={this.state.price}
                                    placeholder="Price"
                                    type="text"
                                    name="price"
                                />
                            </div>
                        </form>
                        <button onClick={this.addNewTransaction} className="addTransaction">+ Add Transaction</button>
                    </div>
                </div>

                <div className="latestTransactions">
                    <p>Latest Transactions</p>
                    <ul>
                        {this.state.transactions.map((transaction) => (
                            <Transaction 
                                key = {transaction.id}
                                transactionId = {transaction.id}
                                type={transaction.type}
                                name={transaction.name}
                                price={transaction.price}
                                currentUID={this.state.currentUID}
                                // onDelete={() => this.onDelete(transaction.id)}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Tracker;