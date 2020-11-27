import React from 'react';
import NavigationBar from '../NavigationBar';
import Game from '../GameOfLifeGrid/Game';
import HistoryList from '../History/HistoryList';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      dashboard: true,
      games: []
    }
  }

  componentDidMount() {
    fetch(`/history/gamehistory`)
      .then(res => res.json())
      .then((data) => {
        this.setState({ games: data })
      })
  }

  renderDashboard = (e) => {
    e.preventDefault();
    this.setState({ dashboard: true });
  }

  renderGameHistory = (e) => {
    e.preventDefault();
    this.setState({ dashboard: false });
  }

  render() {
    return (
      <div className="game">
        <NavigationBar renderDashboard={this.renderDashboard} renderGameHistory={this.renderGameHistory} />
        <div className="container">
          {this.state.dashboard ? (
            <Game history={false} />
          ) : (
              <HistoryList games={this.state.games} />
            )}
        </div>
      </div>
    );
  }
}

export default Dashboard;