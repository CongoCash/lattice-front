import React, {Component} from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import './MoviePoster.css';
import {Link} from "react-router-dom";

class MoviePoster extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <Card className="highlight-poster">
          <Card.Img className="poster-css" onClick={this.props.selectMovie} id={this.props.id} variant="top" src={this.props.image} />
        </Card>
      </React.Fragment>
    )
  }
}

export default MoviePoster;
