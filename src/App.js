import React, { Component, Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader';
const Warning = lazy(() => import('./Warning'));
class App extends Component {
  state = {
    count: 0,
  };

  render() {
    const { count } = this.state;
    return (
      <div>
        <h1>Hello, World!!!</h1>
        <h2 className={count > 10 ? 'warning' : null}>Count: {count}</h2>
        <button
          onClick={() => this.setState((state) => ({ count: state.count + 1 }))}
        >
          +
        </button>
        <button
          onClick={() => this.setState((state) => ({ count: state.count - 1 }))}
        >
          -
        </button>
        {count > 10 ? (
          <Suspense fallback={null}>
            <Warning />
          </Suspense>
        ) : null}
      </div>
    );
  }
}

export default hot(module)(App);
