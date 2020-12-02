import React from 'react';
import GameMenu from './GameMenu';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import UserStore from '../../stores/UserStore';

class Game extends React.Component {
	constructor() {
		super();
		this.speed = 800;
		this.cols = 80;
		this.rows = 40;

		this.state = {
			gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
			nextGeneration: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
			click: false,
			initialState: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
			playState: 'play',
			reactConnectionId: '',
			runnerConnectionId: '',
		}
	}

	componentDidMount = () => {
		let mounted = true;

		if (mounted) {
			this.ConnectToHub();

			if (this.props.game) {
				this.setState({
					initialState: JSON.parse(this.props.game.initialState),
					gridFull: JSON.parse(this.props.game.initialState),
					nextGeneration: JSON.parse(this.props.game.initialState)
				});
			}
		}

		return () => mounted = false;
	}

	ConnectToHub() {
		const hubConnection = new HubConnectionBuilder()
			.withUrl('https://activegamesapi.azurewebsites.net/Progress')
			.configureLogging(LogLevel.Information)
			.build();

		this.setState({ hubConnection }, () => {
			this.state.hubConnection
				.start()
				.then(() => console.log('Connection started!'))
				.then(() => this.getConnectionId(hubConnection))
				.catch(err => console.log('Error while establishing connection :('));

			this.state.hubConnection.on('GameProgressed', (gameState) => {
				if (this.intervalId) {
					this.setState({
						nextGeneration: gameState.generation,
						runnerConnectionId: gameState.reactConnectionId
					});
				}
			});
		});
	}

	getConnectionId = (hubConnection) => {
		hubConnection.invoke('getconnectionid').then(
			(data) => {
				this.setState({ reactConnectionId: data });
			}
		);
	}

	onMouseClicked = (event) => {
		if (event.type === "mousedown") {
			this.setState({ click: true });
		}
		else {
			this.setState({ click: false });
		}
	}

	seed = () => {
		let gridCopy = JSON.parse(JSON.stringify((this.state.gridFull)));
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (Math.floor(Math.random() * 4) === 1) {
					gridCopy[i][j] = !gridCopy[i][j];
				}
			}
		}
		this.setState({
			gridFull: gridCopy,
			nextGeneration: gridCopy
		});
	}

	playButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
		this.setState({ initialState: this.state.gridFull });
		this.setState({ playState: "pause" });
	}

	resumeButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
		this.setState({ playState: "pause" });
	}

	pauseButton = () => {
		clearInterval(this.intervalId);
		this.setState({ playState: "resume" });
	}

	stopButton = () => {
		clearInterval(this.intervalId);
		this.setState({
			gridFull: this.state.initialState,
			nextGeneration: this.state.initialState
		});
		this.setState({ playState: "play" });
	}

	slow = () => { this.speed = 800; this.resumeButton(); }

	fast = () => { this.speed = 450; this.resumeButton(); }

	clear = () => {
		var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
		this.setState({
			nextGeneration: grid,
			gridFull: grid,
			generation: 0
		});
		clearInterval(this.intervalId);
		this.setState({ playState: "play" });
	}

	save = () => {
		let game = {
			author: UserStore.username,
			initialState: JSON.stringify(this.state.gridFull)
		};
		fetch('/history/gamehistory', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(game)
		}).catch(console.log)

		alert('Your game has been saved.');
	}

	play = () => {
		let gameState = {
			runnerConnectionId: this.state.runnerConnectionId,
			reactConnectionId: this.state.reactConnectionId,
			generation: this.state.gridFull
		};
		fetch('/games/activegames', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(gameState)
		}).catch(console.log)

		if (this.state.gridFull !== this.state.nextGeneration) {
			this.setState({ gridFull: this.state.nextGeneration });
		}
	}

	mapGrid() {
		return (
			<div
				style={{ display: "grid", gridTemplateColumns: `repeat(${this.cols}, 16px)` }}>
				{this.state.gridFull.map((rows, i) =>
					rows.map((col, k) => (
						<div
							data-testid={`${i}-${k}`}
							key={`${i}-${k}`}
							onClick={() => {
								if (!this.props.history) {
									let g = this.state.gridFull;
									g[i][k] = !g[i][k];
									this.setState({
										gridFull: g,
										nextGeneration: g
									})
								}
							}}
							onMouseEnter={() => {
								if (this.state.click === true) {
									let g = this.state.gridFull;
									g[i][k] = !g[i][k];
									this.setState({
										gridFull: g,
										nextGeneration: g
									})
								}
							}}
							style={{
								width: 16,
								height: 16,
								backgroundColor: this.state.gridFull[i][k] ? "black" : undefined,
								border: "solid thin #355e3b"
							}}
						/>
					))
				)}
			</div>
		);
	}

	render() {
		return (
			<div style={{ marginTop: '30px' }}>
				{this.props.history ? (
					<div>
						{this.props.game ? (
							<div>
								<h3>{this.props.game.author}'s Game</h3>
								<GameMenu
									playState={this.state.playState}
									playButton={this.playButton}
									pauseButton={this.pauseButton}
									stop={this.stopButton}
									slow={this.slow}
									fast={this.fast}
									history={this.props.history}
								/>
								{this.mapGrid()}
							</div>
						) : null}
					</div>
				) : (
						<div onMouseDown={this.onMouseClicked} onMouseUp={this.onMouseClicked}>
							<GameMenu
								playState={this.state.playState}
								playButton={this.playButton}
								resumeButton={this.resumeButton}
								pauseButton={this.pauseButton}
								stop={this.stopButton}
								slow={this.slow}
								fast={this.fast}
								clear={this.clear}
								seed={this.seed}
								save={this.save}
								history={this.props.history}
							/>
							{this.mapGrid()}
						</div>
					)}
			</div>
		);
	}
}

export default Game;