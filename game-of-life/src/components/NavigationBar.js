import React from 'react';
import { Redirect } from 'react-router-dom';
import UserStore from '../stores/UserStore';
import { runInAction } from 'mobx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

class NavigationBar extends React.Component {
    constructor() {
        super();

        this.state = {
            redirectDashboard: false,
            redirectHistory: false,
        }

        runInAction(() => {
            UserStore.key = sessionStorage.getItem('key');
        });
    }

    async doLogout() {
        sessionStorage.removeItem('key');
        sessionStorage.removeItem('username');

        runInAction(() => {
            UserStore.key = '';
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

        if (this.state.redirectHistory) {
            return <Redirect to="/history" />
        }
    }

    render() {
        return (
            <AppBar position="static" style={{ background: '#355e3b' }}>
                <Toolbar>
                    {this.renderRedirect()}
                    <Typography variant='h5' style={{fontWeight: 'bold'}} >
                        Welcome {UserStore.username}
                    </Typography>
                    <Container disableGutters>
                        <div style={{ float: 'right', color: 'd3d3d3' }}>
                            <Button color="inherit" size="medium" onClick={this.props.renderDashboard}>
                                <Typography style={{fontWeight: 'bold'}}>
                                    Dashboard
                            </Typography>
                            </Button>
                            <Button color="inherit" size="medium" onClick={this.props.renderGameHistory}>
                                <Typography style={{fontWeight: 'bold'}}>
                                    Game History
                            </Typography>
                            </Button>
                            <Button data-testid='logOut' color="inherit" size="medium" onClick={this.doLogout} style={{ marginLeft: '20px' }}>
                                <Typography style={{fontWeight: 'bold'}}>
                                    Log out
                            </Typography>
                            </Button>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
        );
    }
}

export default NavigationBar;