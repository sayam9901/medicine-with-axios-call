import React, {Component} from 'react';
import {auth} from '../../config/Fire';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import './Reg.css';

class Register extends Component {
    state = {
        email: '',
        password: '',
        displayName: '',
        fireErrors: ''
    }

    register = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth ,this.state.email, this.state.password).then((userCredential) => {
            const user = userCredential.user;

            updateProfile(user, {
                displayName: this.state.displayName,
            })
                .then(() => {
                    // Profile updated successfully
                })
                .catch((error) => {
                    // Handle profile update errors
                    console.error('Profile update error:', error);
                });
        })
        .catch((error) => {
            this.setState({ fireErrors: error.message });
        });
};

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        let errorNotification = this.state.fireErrors ? 
            ( <div className="Error"> {this.state.fireErrors} </div> ) : null;

        
        return (
            <>
                {errorNotification}
                <form>
                    <input type="text"
                        className="regField"
                        placeholder="Your Name"
                        value={this.state.displayName} 
                        onChange={this.handleChange}
                        name="displayName"
                        />
                    <input type="text"
                        className="regField"
                        placeholder="Email"
                        value={this.state.email} 
                        onChange={this.handleChange}
                        name="email"
                        />
                    <input
                        className="regField"
                        placeholder="Pasword"
                        value={this.state.password} 
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                    />
                    <input className="submitBtn" type="submit" onClick={this.register} value="REGISTER" />
                </form>
            </>
        );
    }
}
export default Register;