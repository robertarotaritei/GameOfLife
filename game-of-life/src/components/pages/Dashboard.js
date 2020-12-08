import React from 'react';
import NavigationBar from '../NavigationBar';
import Game from '../GameOfLifeGrid/Game';
import HistoryList from '../History/HistoryList';
import Welcome from './Welcome';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedPage: sessionStorage.getItem('selectedPage'),
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
    this.setState({ selectedPage: 'dashboard' });
    sessionStorage.setItem('selectedPage', 'dashboard');
  }

  renderGameHistory = (e) => {
    e.preventDefault();
    this.setState({ selectedPage: 'history' });
    sessionStorage.setItem('selectedPage', 'history');
  }

  renderWelcome = (e) => {
    e.preventDefault();
    this.setState({ selectedPage: 'welcome' });
    sessionStorage.setItem('selectedPage', 'welcome');
  }

  renderSelectedPage = () => {
    switch (this.state.selectedPage) {
      case 'dashboard':
        return <Game history={false} />;
      case 'history':
        return <HistoryList games={this.state.games} />
      case 'welcome':
        return <div style={{ marginTop: '100px' }}>
          <Welcome loggedIn={true} />
        </div>;
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <NavigationBar
          renderDashboard={this.renderDashboard}
          renderGameHistory={this.renderGameHistory}
          renderWelcome={this.renderWelcome}
          selectedPage={this.state.selectedPage}
        />
        <div className="container">
          <div style={{marginTop: '2.5rem'}}>
            {this.renderSelectedPage()}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;