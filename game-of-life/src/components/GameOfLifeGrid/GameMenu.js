import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';

class GameMenu extends React.Component {

	render() {
		return (
			<div>
				<ButtonToolbar>
					{this.props.playState === 'play' ? (
						<button data-testid='play' className="btn-default" onClick={this.props.playButton}>
							Play
						</button>
					) : (
							<button data-testid='resume' className="btn-default" onClick={this.props.resumeButton}>
								Resume
							</button>
						)}
					<button data-testid='pause' className="btn-default" onClick={this.props.pauseButton}>
						Pause
					</button>
					<button data-testid='back' className="btn-default" onClick={this.props.stop}>
						Back to First Generation
					</button>
					<button data-testid='reset' className="btn-default" onClick={this.props.clear}>
						Reset
					</button>
					<button data-testid='slow' className="btn-default" onClick={this.props.slow}>
						Slow
					</button>
					<button data-testid='fast' className="btn-default" onClick={this.props.fast}>
						Fast
					</button>
					{this.props.history ?
						null
						:
						(
							<button data-testid='seed' className="btn-default" onClick={this.props.seed}>
								Seed
							</button>
						)}
					{this.props.history ?
						null
						:
						(
							<button data-testid='save' className="btn-default" onClick={this.props.save}>
								Save First Generation
							</button>
						)}
				</ButtonToolbar>
			</div>
		)
	}
}

export default GameMenu;