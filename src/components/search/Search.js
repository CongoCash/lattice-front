import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import axios from 'axios';
import {Link} from "react-router-dom";
import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/search', {params: {search: this.props.match.params.movie}}).then((response) => {
      this.setState({
        movies: response.data.results,
        found: true
      })
    })
  }

  render() {
    let movies, count = 0;
    if (this.state.movies.length > 0) {
      movies = this.state.movies.map((movie) => {
        if (movie.id && movie.poster_path) {
          count++;
          return (
            <Col xs={6} md={2} className="no-padding">
              <Link to={`/movie/${movie.id}`}>
                <img className="highlight-movie" src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} />
              </Link>
            </Col>
          )
        }
      })
    }
    return (
      <React.Fragment>
        {this.state.found ?
          <React.Fragment>
            <Row>
              <Col className="no-padding">
                <div className="results-found">Results found: {count}</div>
              </Col>
            </Row>
            <Row>
              {movies}
            </Row>
          </React.Fragment>
          : ''
        }
      </React.Fragment>
    )
  }
}

export default Search;
