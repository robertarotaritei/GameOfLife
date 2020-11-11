import React from 'react';
import HistoryMenu from './HistoryMenu';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

class History extends React.Component {
    constructor() {
        super();

        this.speed = 600;
		this.cols = 80;
		this.rows = 40;

		this.state = {
			gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
			nextGeneration: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
			initialState: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
			playState: 'play',
			reactConnectionId: '',
			runnerConnectionId: ''
        }
        
        
    }

    componentDidMount = () => {
        this.ConnectToHub();
        
        if(this.props.game){
            this.setState({
                initialState: JSON.parse(this.props.game.initialState),
                gridFull: JSON.parse(this.props.game.initialState),
                nextGeneration: JSON.parse(this.props.game.initialState)
            });
        }
	}
	
	ConnectToHub() {
		const hubConnection =  new HubConnectionBuilder()
			.withUrl("http://localhost:3002/Progress")
		  	.configureLogging(LogLevel.Information)
		  	.build();
	  
		this.setState({ hubConnection}, () => {
		  	this.state.hubConnection
				.start()
				.then(() => console.log('Connection started!'))
				.then(() => this.getConnectionId(hubConnection))
				.catch(err => console.log('Error while establishing connection :('));
		
		  	this.state.hubConnection.on('GameProgressed', (gameState) => {
			  	if(this.intervalId) {
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
				this.setState({reactConnectionId: data});
			}
		);
	}

    playButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
		this.setState({initialState: this.state.gridFull});
		this.setState({playState: "resume"});
	}

	resumeButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
	}

	pauseButton = () => {
		clearInterval(this.intervalId);
	}

	stopButton = () => {
		clearInterval(this.intervalId);
		this.setState({
			gridFull: this.state.initialState,
			nextGeneration: this.state.initialState
		});
		this.setState({playState: "play"});
	}

	slow = () => {
		this.speed = 600;
		this.resumeButton();
	}

	fast = () => {
		this.speed = 200;
		this.resumeButton();
    }
    
    play = () => {
		let gameState = {
			reactConnectionId: this.state.reactConnectionId,
			runnerConnectionId: this.state.runnerConnectionId,
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
		})

		if(this.state.gridFull !== this.state.nextGeneration){
			this.setState({gridFull: this.state.nextGeneration});
		}
    }
    
    mapGrid(){
		return (
			<div
				className="grid"
				style={{
				display: "grid",
				gridTemplateColumns: `repeat(${this.cols}, 15px)`,
			}}>
				{this.state.gridFull.map((rows, i) =>
					rows.map((col, k) => (
						<div
							key={`${i}-${k}`}
							style={{
								width: 15,
								height: 15,
								backgroundColor: this.state.gridFull[i][k] ? "white" : undefined,
								border: "solid thin black"
							}}
						/>
					))
				)}
			</div>
        );
    }

    render() {
        return (
            <div>
                {this.props.game ? (
                    <div>
                        <h3>{this.props.game.author}'s Game</h3>
                        <HistoryMenu
                            playState={this.state.playState}
                            playButton={this.playButton}
                            resumeButton={this.resumeButton}
                            pauseButton={this.pauseButton}
                            stop={this.stopButton}
                            slow={this.slow}
                            fast={this.fast}
				        />
                        {this.mapGrid()}
                    </div>
                ) : null}
            </div>
        );
    }
}

export default History;