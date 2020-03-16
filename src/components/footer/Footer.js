import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import './Footer.css'

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row className="footer-css">

        </Row>
      </React.Fragment>
    )
  }
}

export default Footer;
