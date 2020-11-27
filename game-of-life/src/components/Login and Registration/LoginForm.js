import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from '../../stores/UserStore';
import { runInAction } from 'mobx';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class LoginForm extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
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
    this.setState({
      [property]: val
    })
  }

  setRedirectLogin = () => {
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
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
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
    if (userId.title !== "Not Found") {

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

      this.setState({ redirectDashboard: true });
    }
    else {
      alert("Username and password combination not valid");
    }
  }

  render() {
    return (
      <div className="loginForm">
        <div style={{ textAlign: 'center', color: '#355e3b', marginTop: '30px' }}>
          <Typography variant='h5' style={{ fontWeight: 'bold' }}>
            Log in
          </Typography>
        </div>
        <InputField
          className='username'
          type='text'
          placeholder='Username'
          value={this.state.username ? this.state.username : ''}
          onChange={(val) => this.setInputValue('username', val)}
        />
        <InputField
          className='password'
          type='password'
          placeholder='Password'
          value={this.state.password ? this.state.password : ''}
          onChange={(val) => this.setInputValue('password', val)}
        />
        <div style={{ textAlign: 'center' }}>
          <SubmitButton
            text='Log in'
            onClick={() => this.doLogin()}
          />
        </div>
        {this.renderRedirect()}
        <div style={{ display: 'flex', marginTop: '30px' }}>
          <Typography variant='h6' style={{ fontWeight: 'bold' }}>
            Don't have an account?
          </Typography>
          <div style={{ color: '#355e3b' }}>
            <Button color="inherit" size="medium" onClick={this.setRedirectLogin}>
              <Typography style={{ fontWeight: 'bold' }}>
                Register
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;