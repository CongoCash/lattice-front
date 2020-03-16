import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import './Navbar.css'
import {Link} from "react-router-dom";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    }
  }

  input = (e) => {
    this.setState({
      search: e.target.value
    })
  };

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      window.location.href = `http://localhost:3000/search/${this.state.search}`;
    }
  };

  render() {
    return (
      <React.Fragment>
        <Row className="navbar-css vertical-center">
          <Col xs={6} md={4}>
            <a className="logo" href="/">Lattice Challenge</a>
          </Col>
          <Col xs={6} md={7} lg={6}>
            <input className="input-search" placeholder="Search Movies" type="text" onChange={this.input} onKeyDown={this.handleEnter} value={this.state.search}/>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default Navbar;
