import React from 'react';
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

    render() {
        return (
            <AppBar position="static" style={{ background: '#355e3b' }}>
                <Toolbar>
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