import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Welcome from './Welcome';
import Messages from './Messages';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Messages} />
            <Route
              path="/login"
              component={() => (
                <h2>This is my login page</h2>
              )}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
