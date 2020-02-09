import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };
  }

  handleClick = value => {
    const { counter } = this.state;
    if (counter + value >= 0)
      return this.setState(prevState => ({
        counter: prevState.counter + value,
        showError: false
      }));

    return this.setState({ showError: true });
  };
  render() {
    const { counter, showError } = this.state;
    return (
      <div data-test="component-app" className="App">
        <h1 data-test="counter-display">The current counter is: {counter}</h1>
        {showError && (
          <h2 data-test="error-message" className="error-message">
            Counter can't be a negative value
          </h2>
        )}
        <button
          data-test="increment-button"
          onClick={() => this.handleClick(1)}
        >
          Increment
        </button>
        <button
          data-test="decrement-button"
          onClick={() => this.handleClick(-1)}
        >
          Decrement
        </button>
      </div>
    );
  }
}

export default App;
