import React from 'react';

class SubmitButton extends React.Component {

  render() {
    return (
      <div className="submitButton" style={{ marginTop: '40px' }}>
        <button
          className='btn'
          onClick={ () => this.props.onClick() }
          >
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default SubmitButton;