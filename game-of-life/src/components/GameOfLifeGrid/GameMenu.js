import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
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

	renderPlayPause = () => {
		switch (this.props.playState) {
			case 'play':
				return <button className='btnIcon'  data-testid='play' onClick={this.props.playButton} >
					<PlayArrowIcon style={{ color: '#17c5fa' }}/>
				</button>;
			case 'resume':
				return <button className='btnIcon' data-testid='resume' onClick={this.props.resumeButton} >
					<PlayArrowIcon style={{ color: '#17c5fa' }}/>
				</button>
			case 'pause':
				return <button className='btnIcon' data-testid='pause' onClick={this.props.pauseButton}>
					<PauseIcon style={{ color: '#17c5fa' }}/>
				</button>
			default :
				return null;
		}
	}

	render() {
		return (
			<div>
				<ButtonToolbar>
					{this.renderPlayPause()}
					<button className='btnIcon' data-testid='speed' onClick={this.changeSpeed}>
						<SpeedIcon style={{ color: '#17c5fa' }}/>
					</button>
					{this.state.speed ? (
						<button className='btnIcon' data-testid='slow' onClick={this.props.slow} style={{ backgroundColor: '#063A4C' }} >
							<AcUnitIcon style={{ color: '#17c5fa' }}/>
						</button>
					) : null
					}
					{this.state.speed ? (
						<button className='btnIcon' data-testid='fast' onClick={this.props.fast} style={{ backgroundColor: '#063A4C' }} >
							<FastForwardIcon style={{ color: '#17c5fa' }}/>
						</button>
					) : null
					}
					<button className='btnIcon' data-testid='back' onClick={this.props.stop}>
						<RestoreIcon style={{ color: '#17c5fa' }}/>
					</button>
					{this.props.history ?
						null : (
							<button className='btnIcon' data-testid='reset' onClick={this.props.clear}>
								<ClearIcon style={{ color: '#17c5fa' }}/>
							</button>
						)
					}
					{this.props.history ?
						null : (
							<button className='btnIcon' data-testid='seed' onClick={this.props.seed}>
								<SpaIcon style={{ color: '#17c5fa' }}/>
							</button>
						)
					}
					{this.props.history ?
						null : (
							<button className='btnIcon' data-testid='save' onClick={this.props.save}>
								<SaveIcon style={{ color: '#17c5fa' }}/>
							</button>
						)
					}
				</ButtonToolbar>
			</div>
		)
	}
}

export default GameMenu;