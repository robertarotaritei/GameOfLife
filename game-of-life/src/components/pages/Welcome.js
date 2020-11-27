import React from 'react';
import { Redirect } from 'react-router-dom';
import UserStore from '../../stores/UserStore';
import { runInAction } from 'mobx';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GameOfLifeGIF from '../../gameoflife.gif';

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
            <div>
                {this.renderRedirect()}
                <Typography variant='h3' style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Welcome to the <span style={{ color: '#355e3b' }}> Game of Life</span>.
                </Typography>
                <div style={{ display: 'flex', marginTop: '40px' }}>
                    <img src={GameOfLifeGIF} style={{ border: 'solid', borderWidth: 'thick', borderColor: '#355e3b' }} alt="GameOfLife" />
                    <Typography variant='h6' style={{ marginLeft: '20px' }}>
                        &nbsp;&nbsp;&nbsp;The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970.<br />
                        It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. <br />
                        &nbsp;&nbsp;&nbsp;One interacts with the Game of Life by creating an initial configuration and observing how it evolves. <br />
                        &nbsp;&nbsp;&nbsp;The game has three rules: <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Any live cell with two or three live neighbours survives. <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Any dead cell with three live neighbours becomes a live cell.<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. All other live cells die in the next generation. <br />
                    </Typography>
                </div>
                <div style={{ display: 'flex', marginTop: '40px', justifyContent: 'center' }}>
                    <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                        Click here to
                    </Typography>
                    <div style={{ color: '#355e3b' }}>
                        <Button color="inherit" size="medium" onClick={this.setRedirectLogin}>
                            <Typography style={{ fontWeight: 'bold' }}>
                                Log in
                            </Typography>
                        </Button>
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: '40px', justifyContent: 'center' }}>
                    <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                        Or
                    </Typography>
                    <div style={{ color: '#355e3b' }}>
                        <Button color="inherit" size="medium" onClick={this.setRedirectLogin}>
                            <Typography style={{ fontWeight: 'bold' }}>
                                here
                            </Typography>
                        </Button>
                    </div>

                    <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                        if you don't have an account already
                    </Typography>
                </div>
            </div>
        );
    }
}

export default Welcome;