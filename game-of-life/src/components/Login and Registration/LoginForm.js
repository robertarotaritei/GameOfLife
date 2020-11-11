import React from 'react';
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import UserStore from '../../stores/UserStore'
import { runInAction } from 'mobx';
import { Redirect } from 'react-router-dom'

class LoginForm extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false,
      redirect: false,
      redirectDashboard: false
    }

    runInAction(() => {
      UserStore.isLoggedIn = sessionStorage.getItem('isLoggedIn');
      UserStore.loading = false;
    });
  }

  setInputValue(property, val) {
    val = val.trim();
    if(val.length > 15) {
      return;
    }
    this.setState({
      [property]: val
    })
  }

  resetForm() {
    this.setState({
      username: '',
      password: '',
      buttonDisabled: false
    })
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/register' />
    }
    if (this.state.redirectDashboard) {
      return <Redirect to='/dashboard' />
    }
  }

  async doLogin() {
    if(!this.state.username) {
      return;
    }
    if(!this.state.password) {
      return;
    }
      
    runInAction(() => {
      UserStore.loading = true;
    });

    let userId = 0;
    let res = await fetch(`/credentials/user/verify?username=${this.state.username}&password=${this.state.password}`)
    let result = await res.json();
      
    runInAction(() => {
      UserStore.loading = false;
    });

    userId = result;
    if(userId.title !== "Not Found") {
        
      runInAction(() => {
        UserStore.loading = true;
      });

      sessionStorage.setItem('isLoggedIn', true);
      sessionStorage.setItem('username', userId.username);
      sessionStorage.setItem('id', userId.id);
      runInAction(() => {
        UserStore.isLoggedIn = true;
        UserStore.userId = userId.id;
        UserStore.username = userId.username;
      })

      runInAction(() => {
        UserStore.loading = false;
      });

      this.setState({redirectDashboard: true});
    }
    else {
      alert("Username and password combination not valid");
    }
  }

  render() {
    return (
      <div className="loginForm">
        Log in
        <InputField 
          type='text'
          placeholder='Username'
          value={this.state.username ? this.state.username : ''}
          onChange={ (val) => this.setInputValue('username', val) }
        />
        <InputField 
          type='password'
          placeholder='Password'
          value={this.state.password ? this.state.password : ''}
          onChange={ (val) => this.setInputValue('password', val) }
        />
        <SubmitButton 
          text='Login'
          disabled={this.state.buttonDisabled}
          onClick={ () => this.doLogin()}
        />
        {this.renderRedirect()}
        <p>
          Don't have an account? <button className="linkbutton" onClick={this.setRedirect}> Register</button>
        </p>
      </div>
    );
  }
}

export default LoginForm;