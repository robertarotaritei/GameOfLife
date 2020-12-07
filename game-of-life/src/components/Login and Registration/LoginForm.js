import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from '../../stores/UserStore';
import { runInAction } from 'mobx';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

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
      UserStore.key = sessionStorage.getItem('key');
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
      return <Redirect to='/' />
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

    let res = await fetch(`/credentials/user/verify?username=${this.state.username}&password=${this.state.password}`)
    let result = await res.json();
    runInAction(() => {
      UserStore.loading = false;
    });

    if (result.title !== "Not Found") {

      runInAction(() => {
        UserStore.loading = true;
      });

      sessionStorage.setItem('key', result);
      sessionStorage.setItem('username', this.state.username);
      sessionStorage.setItem('selectedPage', 'dashboard');
      runInAction(() => {
        UserStore.key = result;
        UserStore.username = this.state.username;
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
        <div style={{ textAlign: 'center', color: '#17c5fa', marginTop: '25px' }}>
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
            text='LOG IN'
            onClick={() => this.doLogin()}
          />
        </div>
        {this.renderRedirect()}
        <div style={{ display: 'flex', marginTop: '30px', marginBottom: '20px' }}>
          <Typography variant='h5' style={{ fontWeight: 'bold' }}>
            Don't have an account?
          </Typography>
          <div style={{ color: '#17c5fa' }}>
            <button className='button' onClick={this.setRedirectLogin}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;