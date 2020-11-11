import React from 'react';
import NavigationBar from '../NavigationBar';
import HistoryList from '../History/HistoryList';

class GameHistory extends React.Component {
    constructor() {
        super();

        this.state = {
            games: []
        }
    }

    componentDidMount(){
        fetch(`/history/gamehistory`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ games: data })
        })
    }

    render() {
        return (
            <div className="gameHistory">
                <NavigationBar />
                <div className="container">
                    <HistoryList games={this.state.games}/>
                </div>
            </div>
        );
    }
}

export default GameHistory;