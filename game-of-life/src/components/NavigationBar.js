import React from 'react';
import { Redirect } from 'react-router-dom';
import UserStore from '../stores/UserStore';
import { runInAction } from 'mobx';

class NavigationBar extends React.Component {
    constructor() {
        super();

        this.state = {
            redirectDashboard: false,
            redirectHistory: false,
        }

        runInAction(() => {
            UserStore.isLoggedIn = sessionStorage.getItem('isLoggedIn');
        });
    }

    async doLogout() {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('id');

        runInAction(() => {
            UserStore.isLoggedIn = false;
            UserStore.userId = 0;
            UserStore.username = '';
        })
    }

    setRedirectDashboard = () => {
        this.setState({
            redirectDashboard: true,
            redirectHistory: false
        })
    }

    setRedirectHistory = () => {
        this.setState({
            redirectHistory: true,
            redirectDashboard: false
        })
    }

    renderRedirect = () => {
        if (this.state.redirectDashboard) {
          return <Redirect to="/dashboard" />
        }

        if(this.state.redirectHistory) {
            return <Redirect to="/history" />
        }
    }
      
    render(){
        return(
            <div className="topnav">
                {this.renderRedirect()}
                Welcome {UserStore.username}
                <button className="linkbutton" onClick={this.setRedirectDashboard}>Dashboard</button>
                <button className="linkbutton" onClick={this.setRedirectHistory}>Game History</button>
                <button data-testid='logOut' className="linkbutton" onClick={this.doLogout}>Log out</button>
            </div>
        );
    }
}

export default NavigationBar;