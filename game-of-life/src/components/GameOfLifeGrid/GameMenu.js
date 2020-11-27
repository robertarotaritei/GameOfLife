import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { IconButton } from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import RestoreIcon from '@material-ui/icons/Restore';
import ClearIcon from '@material-ui/icons/Clear';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import FastForwardIcon from '@material-ui/icons/FastForward';
import SpaIcon from '@material-ui/icons/Spa';
import SaveIcon from '@material-ui/icons/Save';
import SpeedIcon from '@material-ui/icons/Speed';

class GameMenu extends React.Component {
	constructor() {
		super();

		this.state = {
			speed: false
		}
	}

	changeSpeed = (e) => {
		e.preventDefault();
		this.setState({ speed: !this.state.speed });
	}

	render() {
		return (
			<div>
				<ButtonToolbar>
					{this.props.playState === 'play' ? (
						<IconButton data-testid='play' onClick={this.props.playButton} >
							<PlayArrowIcon />
						</IconButton>
					) : (
							<IconButton data-testid='pause' onClick={this.props.pauseButton}>
								<PauseIcon />
							</IconButton>
						)
					}
					<IconButton data-testid='slow' onClick={this.changeSpeed}>
						<SpeedIcon />
					</IconButton>
					{this.state.speed ? (
						<IconButton data-testid='slow' onClick={this.props.slow}  size='small' style={{backgroundColor: '#93b498'}} >
							<AcUnitIcon />
						</IconButton>
					) : null
					}
					{this.state.speed ? (
						<IconButton data-testid='fast' onClick={this.props.fast} size='small' style={{backgroundColor: '#93b498'}} >
							<FastForwardIcon />
						</IconButton>
					) : null
					}
					<IconButton data-testid='back' onClick={this.props.stop}>
						<RestoreIcon />
					</IconButton>
					<IconButton data-testid='reset' onClick={this.props.clear}>
						<ClearIcon />
					</IconButton>
					{this.props.history ?
						null : (
							<IconButton data-testid='seed' onClick={this.props.seed}>
								<SpaIcon />
							</IconButton>
						)
					}
					{this.props.history ?
						null : (
							<IconButton data-testid='save' onClick={this.props.save}>
								<SaveIcon />
							</IconButton>
						)
					}
				</ButtonToolbar>
			</div>
		)
	}
}

export default GameMenu;