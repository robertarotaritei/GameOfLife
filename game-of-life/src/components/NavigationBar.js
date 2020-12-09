import React from 'react';
import UserStore from '../stores/UserStore';
import { runInAction } from 'mobx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

class NavigationBar extends React.Component {
    constructor() {
        super();

        runInAction(() => {
            UserStore.key = sessionStorage.getItem('key');
        });
    }

    async doLogout() {
        sessionStorage.removeItem('key');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('selectedPage');
        sessionStorage.removeItem('initialState');

        runInAction(() => {
            UserStore.key = '';
            UserStore.username = '';
        })
    }

    render() {
        return (
            <AppBar className='navbar' position="fixed" style={{ background: '#063A4C', borderBottom: 'solid thin #009ECE', borderTop: 'solid thin #009ECE' }}>
                <Toolbar variant="dense" style={{ maxHeight: '1.2rem' }}>
                    <p style={{ color: '#9BE8FF' }} >
                        Welcome {UserStore.username}
                    </p>
                    <Container disableGutters>
                        <div style={{ float: 'right', color: '#9BE8FF' }}>
                            <button className='btnNav' onClick={this.props.renderDashboard} style={{ backgroundColor: this.props.selectedPage === 'dashboard' ? '#009ECE' : null }}>
                                Dashboard
                            </button>
                            <button className='btnNav' onClick={this.props.renderGameHistory} style={{ backgroundColor: this.props.selectedPage === 'history' ? '#009ECE' : null }} >
                                Game History
                            </button>
                            <button className='btnNav' onClick={this.props.renderWelcome} style={{ backgroundColor: this.props.selectedPage === 'welcome' ? '#009ECE' : null }} >
                                About
                            </button>
                            <button className='btnNav' data-testid={'logOut'} onClick={this.doLogout} style={{ marginLeft: '30px' }}>
                                Log out
                            </button>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
        );
    }
}

export default NavigationBar;