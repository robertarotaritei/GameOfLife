import React from 'react';
import Game from '../GameOfLifeGrid/Game'

class HistoryList extends React.Component {

    constructor(){
        super();

        this.state={
            authors: []
        }
    }
    
    componentDidMount() {
        let names = [];
        this.props.games.map(currentGame => {
            if(!names.includes(currentGame.author)){
                names.push(currentGame.author);
            }

            return true;
        })
        this.setState({authors: names});
    }
    render() {  
        return (
            <div>
                {this.props.games.map(currentGame => (
                    <Game key={currentGame.id} game={currentGame} history={true} />
                ))}
                <div style={{ paddingBottom: 20 }} />
            </div>
        );
    }
}

export default HistoryList;