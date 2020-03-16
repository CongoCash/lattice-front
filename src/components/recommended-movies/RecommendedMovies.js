import React, {Component} from 'react';
import './RecommendedMovies.css';
import axios from 'axios';
import {Link} from "react-router-dom";
import Slider from "react-slick";
import MoviePoster from "../movie-poster/MoviePoster";

class RecommendedMovies extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/get-recommendations', {params: {id: this.props.id}}).then((response) => {
      this.setState({
        movies: response.data.results
      })
    })
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.id !== this.props.id) {
      setTimeout(() => {
        axios.get('http://localhost:8000/get-recommendations', {params: {id: this.props.id}}).then((response) => {
          this.setState({
            movies: response.data.results
          })
        })
      }, 500)
    }
  }

  render() {
    let movies = [];
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 5,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 5,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 760,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    movies = this.state.movies.map((movie) => {
      if (movie.id && movie.poster_path) {
        return (
          <React.Fragment>
            <Link to={`/movie/${movie.id}`}>
              <MoviePoster selectMovie={this.selectMovie} id={movie.id} image={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} />
            </Link>
          </React.Fragment>
        )
      }
    });

    return (
      <React.Fragment>
        <div className="recommend-title">You may also enjoy</div>
        <Slider {...settings}>
          {movies}
        </Slider>
      </React.Fragment>
    )
  }
}

export default RecommendedMovies;
