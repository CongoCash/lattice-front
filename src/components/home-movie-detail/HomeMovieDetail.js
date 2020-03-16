import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import './HomeMovieDetail.css';
import axios from 'axios';
import {Link} from "react-router-dom";

class HomeMovieDetail extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios.get('http://localhost:8000/get-movie', {params: {id: this.props.id}}).then((response) => {
      this.setState({
        movie: response.data
      })
    })
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.id !== this.props.id) {
      axios.get('http://localhost:8000/get-movie', {params: {id: this.props.id}}).then((response) => {
        this.setState({
          movie: response.data
        })
      })
    }
  }

  render() {
    let releaseDate = this.state.movie ? this.state.movie.release_date.split('-')[0] : '';
    let genre = this.state.movie ? this.state.movie.genres.map((type) => {
      return type.name;
    }) : [];
    return (
      <React.Fragment>
        {this.state.movie ?
          <Row>
            <Col xs={12} md={4}>
              <Link to={`/movie/${this.props.id}`}>
                <img className="poster-css" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.state.movie.poster_path}`} />
              </Link>
            </Col>
            <Col xs={11} md={7}>
              <Link to={`/movie/${this.props.id}`}>
                <div className="movie-title movie-margin">{this.state.movie.original_title}</div>
              </Link>
              <div className="movie-margin">
                <span className="movie-rating">{this.state.movie.vote_average * 10}%</span>
                <span className="movie-year"> | {releaseDate}</span>
                <span className="movie-runtime"> | {this.state.movie.runtime} minutes</span>
              </div>
              <div className="movie-genres movie-margin">{genre.join(' / ')}</div>
              <div className="movie-description movie-margin">{this.state.movie.overview}</div>
            </Col>
            <Col xs={1} className="close-preview" onClick={this.props.closePreview}>X</Col>
          </Row> :
          ''
        }
      </React.Fragment>
    )
  }
}

export default HomeMovieDetail;
