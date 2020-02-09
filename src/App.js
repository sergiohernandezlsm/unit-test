import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    counter: 0
  };

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">
          Counter is{" "}
          {this.state.counter >= 0 ? this.state.counter : <h1>NOT</h1>}
        </h1>
        <button
          data-test="increment-button"
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        >
          increment counter
        </button>
        <button
          data-test="decrement-button"
          onClick={() =>
            this.state.counter >= 0 &&
            this.setState({ counter: this.state.counter - 1 })
          }
        >
          decrement counter
        </button>
      </div>
    );
  }
}

export default App;
