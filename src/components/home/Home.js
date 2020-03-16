import React, {Component} from 'react';
import axios from 'axios';
import './Home.css';
import MovieScroll from "../movie-scroll/MovieScroll";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      popular: [],
      trending: [],
      top: []
    }
  }

  async componentDidMount() {
    let popular, trending, top;
    await axios.get('http://localhost:8000/home-popular').then((response) => {
      popular = response.data.results
    });

    await axios.get('http://localhost:8000/home-trending').then((response) => {
      trending = response.data.results
    });

    await axios.get('http://localhost:8000/home-top').then((response) => {
      top = response.data.results;
    });

    await this.setState({
      popular: popular,
      trending: trending,
      top: top
    })
  }

  loopMovies = (movies, detail) => {
    movies.forEach((movie) => {
      detail['id'].push(movie.id);
      detail['image'].push(movie.image);
    });
  };

  render() {
    let popular = {id: [], image: []}, trending = {id: [], image: []}, top = {id: [], image: []};

    if (this.state.popular.length > 0) {
      this.loopMovies(this.state.popular, popular);
      this.loopMovies(this.state.trending, trending);
      this.loopMovies(this.state.top, top);
    }

    return (
      <React.Fragment>
        {
          this.state.popular.length > 0 ?
            <React.Fragment>
              <MovieScroll movies={this.state.popular} title="Most Popular" />
              <MovieScroll movies={this.state.trending} title="Trending of the Week" />
              <MovieScroll movies={this.state.top} title="Top Rated" />
            </React.Fragment>
            : ''
        }
      </React.Fragment>
    )
  }
}

export default Home;
