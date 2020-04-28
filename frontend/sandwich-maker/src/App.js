import React, { Component } from 'react';
import Sandwich from './components/Sandwich';
import Navigation from './components/Navigation';
import StatusBar from './components/StatusBar';
import Container from 'react-bootstrap/Container';


class App extends Component {

  render() {
      return (
        <Container>
          <Navigation />
          <Sandwich />
          <StatusBar />
        </Container>
      );
    }
}

export default App;