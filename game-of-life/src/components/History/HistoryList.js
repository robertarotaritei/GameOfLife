import React from 'react';
import History from './History'

class HistoryList extends React.Component {

    render() {
        return (
            <div>
                {this.props.games.map(currentGame => (
                    <History key={currentGame.id} game={currentGame} />
                ))}
                <div
                    style={{
                        paddingBottom: 20
                    }}
                />
            </div>
        );
    }
}

export default HistoryList;