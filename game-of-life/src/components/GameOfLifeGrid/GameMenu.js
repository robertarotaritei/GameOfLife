import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';

class GameMenu extends React.Component {

	render() {
		return (
			<div>
				<ButtonToolbar>
					{this.props.playState === 'play' ? (
						<button className="btn-default" onClick={this.props.playButton}>
							Play
						</button>
					) : (
						<button className="btn-default" onClick={this.props.resumeButton}>
							Resume
						</button>
					)}
					<button className="btn-default" onClick={this.props.pauseButton}>
						Pause
					</button>
					<button className="btn-default" onClick={this.props.stop}>
						Back to First Generation
					</button>
					<button className="btn-default" onClick={this.props.clear}>
					 	Reset
					</button>
					<button className="btn-default" onClick={this.props.slow}>
						Slow
					</button>
					<button className="btn-default" onClick={this.props.fast}>
						Fast
					</button>
					<button className="btn-default" onClick={this.props.seed}>
						Seed
					</button>
					<button className="btn-default" onClick={this.props.save}>
						Save First Generation
					</button>
				</ButtonToolbar>
			</div>
		)
	}
}

export default GameMenu;