import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import './MovieDetail.css';
import axios from 'axios';
import RecommendedMovies from "../recommended-movies/RecommendedMovies";

class MovieDetail extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios.get('http://localhost:8000/get-movie', {params: {id: this.props.match.params.id}}).then((response) => {
      this.setState({
        movie: response.data
      })
    })
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.match.params.id !== this.props.match.params.id) {
      axios.get(`http://localhost:8000/get-movie/${this.props.match.params.id}`).then((response) => {
        setTimeout(() => {
          this.setState({
            movie: response.data
          })
        }, 500);
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
          <React.Fragment>
          <Row>
            <Col xs={12} md={4}>
              <img className="poster-css" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.state.movie.poster_path}`} />
            </Col>
            <Col xs={12} md={8}>
              <div className="movie-title movie-margin">{this.state.movie.original_title}</div>
              <div className="movie-margin">
                <span className="movie-rating">{this.state.movie.vote_average * 10}%</span>
                <span className="movie-year"> | {releaseDate}</span>
                <span className="movie-runtime"> | {this.state.movie.runtime} minutes</span>
              </div>
              <div className="movie-genres movie-margin">{genre.join(' / ')}</div>
              <div className="movie-description movie-margin">{this.state.movie.overview}</div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RecommendedMovies id={this.props.match.params.id}/>
            </Col>
          </Row>
          </React.Fragment>
            :
          ''
        }
      </React.Fragment>
    )
  }
}

export default MovieDetail;
