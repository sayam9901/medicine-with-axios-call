import React, { Component } from 'react';
import './Main.css';
import {auth, fire} from '../config/Fire';
import {onAuthStateChanged } from 'firebase/auth'
import Login from './Forms/Login';
import Register from './Forms/Register';
import Spinner from '../assets/loader.gif';
import Tracker from './Tracker/Tracker';

export default class Main extends Component {
    state = {
        user: 1,
        loading: true,
        formSwitcher: false,
    }

    componentDidMount(){
      this.authListener(auth);
    }

    authListener(){
      onAuthStateChanged(auth ,(user) => {
        if(user){
          this.setState({user});
        }else{
          this.setState({user:null});
        }
        this.setState({ loading: false });
      });
    }

    formSwitcher = (action) => {
        this.setState({formSwitcher: action === 'register' ? true : false});
    }

    render() {
        const form = !this.state.formSwitcher ? <Login /> : <Register />;

        if (this.state.loading){
            return (
              <div className="mainBlock">
                <div className="Spinner">
                  <img src={Spinner} alt="Spinner" className="ImgSpinner" />
                </div>
              </div>
              );
        }

        return (
          <>
              {!this.state.user ? (
                  <div className="mainBlock">
                      {form}
                      <span className="underLine">
                          {this.state.formSwitcher
                              ? "Have an account already? "
                              : "Not registered? "}
                          <button
                              onClick={() =>
                                  this.formSwitcher(!this.state.formSwitcher ? 'register' : 'login')
                              }
                              className="linkBtn"
                          >
                              {this.state.formSwitcher ? 'Sign in here' : 'Create an account'}
                          </button>
                      </span>
                  </div>
              ) : (
                  <Tracker />
              )}
          </>
      );
    }
}