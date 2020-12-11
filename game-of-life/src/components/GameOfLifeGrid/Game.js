import React from 'react';
import GameMenu from './GameMenu';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import UserStore from '../../stores/UserStore';

class Game extends React.Component {
	constructor() {
		super();
		this.speed = 750;
		this.cols = 80;
		this.rows = 40;
		this.state = {
			gridFull: sessionStorage.getItem('initialState') !== null ? JSON.parse(sessionStorage.getItem('initialState')) : Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
			nextGeneration: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
			click: false,
			playState: 'play',
			reactConnectionId: '',
			runnerConnectionId: '',
			saveText: ''
		}
	}

	componentDidMount = () => {
		let mounted = true;

		if (mounted) {
			this.ConnectToHub();

			if (this.props.game) {
				this.setState({
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
		this.setState({saveText: '' });
	}

	playButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
		this.setState({ playState: "pause" });
		if (!this.props.game) {
			sessionStorage.setItem('initialState', JSON.stringify(this.state.gridFull));
		}
		this.setState({saveText: '' });
	}

	resumeButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
		this.setState({ playState: "pause" });
		this.setState({saveText: '' });
	}

	pauseButton = () => {
		clearInterval(this.intervalId);
		this.setState({ playState: "resume" });
		this.setState({saveText: '' });
	}

	stopButton = () => {
		clearInterval(this.intervalId);
		if (this.props.game) {
			this.setState({
				gridFull: JSON.parse(this.props.game.initialState),
				nextGeneration: JSON.parse(this.props.game.initialState)
			});
		}
		else {
			this.setState({
				gridFull: sessionStorage.getItem('initialState') !== null ? JSON.parse(sessionStorage.getItem('initialState')) : Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
				nextGeneration: sessionStorage.getItem('initialState') !== null ? JSON.parse(sessionStorage.getItem('initialState')) : Array(this.rows).fill().map(() => Array(this.cols).fill(false))
			});
		}
		this.setState({ playState: "play" });
		this.setState({saveText: '' });
	}

	slow = () => { this.speed = 750; this.resumeButton(); }

	fast = () => { this.speed = 400; this.resumeButton(); }

	clear = () => {
		var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
		this.setState({
			nextGeneration: grid,
			gridFull: grid,
			generation: 0
		});
		clearInterval(this.intervalId);
		this.setState({ playState: "play" });
		this.setState({saveText: '' });
	}

	save = () => {
		if (this.props.loggedIn) {
			let game = {
				author: UserStore.username,
				initialState: sessionStorage.getItem('initialState'),
				token: sessionStorage.getItem('key')
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

			this.setState({saveText: 'Your game has been saved' });
		}
		else{
			this.setState({saveText: 'Log in to save games' });
		}
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

	colorBasedOnNeighbors(i, k) {
		let neighbors = 0;
		if (i > 0) {
			neighbors += this.state.gridFull[i - 1][k];
			neighbors += k > 0 ? this.state.gridFull[i - 1][k - 1] : 0;
			neighbors += k < this.cols - 1 ? this.state.gridFull[i - 1][k + 1] : 0;
		}

		if (i < this.rows - 1) {
			neighbors += this.state.gridFull[i + 1][k];
			neighbors += k > 0 ? this.state.gridFull[i + 1][k - 1] : 0;
			neighbors += k < this.cols - 1 ? this.state.gridFull[i + 1][k + 1] : 0;
		}

		neighbors += k > 0 ? this.state.gridFull[i][k - 1] : 0;
		neighbors += k < this.cols - 1 ? this.state.gridFull[i][k + 1] : 0;

		if (neighbors < 2) {
			return '#009ECE';
		}
		if (neighbors < 4) {
			return '#17C5FA';
		}
		return '#9BE8FF';
	}

	mapGrid() {
		return (
			<div style={{ display: "grid", gridTemplateColumns: `repeat(${this.cols}, 16px)` }}>
				{this.state.gridFull.map((rows, i) =>
					rows.map((col, k) => (
						<div
							className='cell'
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
								backgroundColor: this.state.gridFull[i][k] ? this.colorBasedOnNeighbors(i, k) : undefined
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
								<p>{this.props.game.author}'s Game</p>
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
						<div>
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
									loggedIn={this.props.loggedIn}
									saveText={this.state.saveText}
								/>
								{this.mapGrid()}
							</div>
						</div>
					)}
			</div>
		);
	}
}

export default Game;