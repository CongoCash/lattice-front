import React from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Search from './components/search/Search';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Col, Container, Row} from 'react-bootstrap';
import Footer from "./components/footer/Footer";
import MovieDetail from "./components/movie-detail/MovieDetail";

function App() {
  return (
    <React.Fragment>
      <Container fluid>
        <Navbar />
        <Row>
          <Col xs={{span: 10, offset: 1}}>
            <Router>
              <Switch>
                <Route exact path="/search/:movie" component={Search} />
                <Route exact path="/movie/:id" component={MovieDetail} />
                <Route exact path="/" component={Home} />
              </Switch>
            </Router>
          </Col>
        </Row>
        <Footer />
      </Container>
    </React.Fragment>
  );
}

export default App;
