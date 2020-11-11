import React from 'react';
import { Redirect } from 'react-router-dom';
import UserStore from '../../stores/UserStore';
import { runInAction } from 'mobx';

class Welcome extends React.Component {

    constructor() {
        super();

        this.state = {
            redirectLogin: false,
            refirectRegister: false
        }
        
        runInAction(() => {
            UserStore.loading = false;
            UserStore.isLoggedIn = sessionStorage.getItem('isLoggedIn');
        });
    }

    setRedirectLogin = () => {
        this.setState({
            redirectLogin: true
        })
    }
    
    renderRedirect = () => {
        if (this.state.redirectLogin) {
          return <Redirect to='/login' />
        }

        if (this.state.redirectRegister) {
            return <Redirect to='/register' />
        }
    }

    setRedirectRegister = () => {
        this.setState({
            redirectRegister: true
        })
    }

    render() {
        return (
            <div className="app">
                <div className='container'>
                    {this.renderRedirect()}
                    Welcome to the Game of Life.
                    <br/>
                    <br/>
                    Click here to log in <button onClick={this.setRedirectLogin}>Log in</button>
                    <br/>
                    <br/>
                    Or here if you don't have an account already <button onClick={this.setRedirectRegister}>Register</button>
                </div>
            </div>
        );
    }
}

export default Welcome;