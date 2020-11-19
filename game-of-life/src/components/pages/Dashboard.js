import React from 'react';
import NavigationBar from '../NavigationBar';
import Game from '../GameOfLifeGrid/Game';

class Dashboard extends React.Component {
  
  render() {
    return (
      <div className="game">
        <NavigationBar />
        <div className="container">
        	<Game history={false}/>
        </div>
      </div>
      );
    }
}

export default Dashboard;