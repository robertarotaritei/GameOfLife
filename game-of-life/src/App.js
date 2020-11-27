import React from 'react';
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css'
import UserStore from './stores/UserStore';
import LoginForm from './components/Login and Registration/LoginForm';
import RegistrationForm from './components/Login and Registration/RegistrationForm';
import Dashboard from './components/pages/Dashboard';
import Welcome from './components/pages/Welcome';
import { runInAction } from 'mobx';

class App extends React.Component {

  constructor(){
    super();

    runInAction(() => {
      UserStore.isLoggedIn = sessionStorage.getItem('isLoggedIn');
      UserStore.userId = sessionStorage.getItem('id');
      UserStore.username = sessionStorage.getItem('username');
      UserStore.loading = false;
    });
    
  }

  render() {

    if(UserStore.loading) {
      return (
        <div className="app">
          <div className='container'>
            Loading, please wait...
          </div>
        </div>
      )
    }
    else {

      if(UserStore.isLoggedIn) {
        return (
          <div className="app">
              <Router>
                <Switch>
                  <Route exact path="/" render={() => (<Redirect to="/dashboard" />)}/>
                  <Route exact path="/register" render={() => (<Redirect to="/dashboard" />)} />
                  <Route exact path="/login" render={() => (<Redirect to="/dashboard" />)} />
                  <Route exact path="/dashboard" component={Dashboard}/>
                </Switch>
            </Router>
          </div>
        );
      }

      return (
        <div className="app">
          <div className='container'>
            <Router>
              <Switch>
                <Route exact path="/" component={Welcome}/>
                <Route exact path="/register" component={RegistrationForm} />
                <Route exact path="/login" component={LoginForm}/>
                <Route exact path="/dashboard" render={() => (<Redirect to="/login" />)} />
              </Switch>
            </Router>
          </div>
        </div>
      );
    }
  }
}

export default observer(App);