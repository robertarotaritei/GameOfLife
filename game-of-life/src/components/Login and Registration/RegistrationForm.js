import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import { Redirect } from 'react-router-dom';
import UserStore from '../../stores/UserStore';
import { runInAction } from 'mobx';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class RegistrationForm extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
    }

    runInAction(() => {
      UserStore.isLoggedIn = sessionStorage.getItem('isLoggedIn');
      UserStore.loading = false;
    });
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 15) {
      return;
    }
    this.setState({
      [property]: val
    })
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  }


  async doRegister() {
    if (!this.state.username) {
      return;
    }

    if (!this.state.password) {
      return;
    }

    if (!this.state.passwordConfirmation) {
      return;
    }

    runInAction(() => {
      UserStore.loading = true;
    });

    let error = '';
    error = this.state.password !== this.state.passwordConfirmation ? 'Passwords do not match' : '';
    let res = await fetch(`/credentials/user/verifyusername?username=${this.state.username}`)
    let result = await res.json();

    runInAction(() => {
      UserStore.loading = false;
    });

    error = result.title !== "Not Found" ? 'Username already exists' : error;
    if (error === '') {
      runInAction(() => {
        UserStore.loading = true;
      });

      var newUser = {
        username: this.state.username,
        password: this.state.password
      };
      fetch('/credentials/user', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      })

      alert("New user created");
      this.setRedirect();

      runInAction(() => {
        UserStore.loading = false;
      });
    }
    else {
      alert(error);
    }
  }

  render() {
    return (
      <div className="loginForm">
        {this.renderRedirect()}
        <div style={{ textAlign: 'center', color: '#355e3b', marginTop: '30px' }}>
          <Typography variant='h5' style={{fontWeight: 'bold'}}>
            Register
          </Typography>
        </div>
        <InputField
          type='text'
          placeholder='Username'
          value={this.state.username ? this.state.username : ''}
          onChange={(val) => this.setInputValue('username', val)}
        />
        <InputField
          type='password'
          placeholder='Password'
          value={this.state.password ? this.state.password : ''}
          onChange={(val) => this.setInputValue('password', val)}
        />
        <InputField
          type='password'
          placeholder='Repeat Password'
          value={this.state.passwordConfirmation ? this.state.passwordConfirmation : ''}
          onChange={(val) => this.setInputValue('passwordConfirmation', val)}
        />
        <div style={{ textAlign: 'center' }}>
          <SubmitButton
            text='Register'
            onClick={() => this.doRegister()}
          />
        </div>
        <div style={{ display: 'flex', marginTop: '30px' }}>
          <Typography variant='h6' style={{fontWeight: 'bold'}}>
            Already have an account?
          </Typography>
          <div style={{ color: '#355e3b' }}>
            <Button color="inherit" size="medium" onClick={this.setRedirect}>
              <Typography style={{fontWeight: 'bold'}}>
                Log in
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;