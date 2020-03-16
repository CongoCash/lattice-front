import React, {Component} from 'react';
import Slider from "react-slick";
import MoviePoster from "../movie-poster/MoviePoster";
import HomeMovieDetail from "../home-movie-detail/HomeMovieDetail";

class MovieScroll extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: ''
    }
  }

  selectMovie = (e) => {
    this.setState({
      selectedMovie: e.target.id
    })
  };

  closePreview = () => {
    this.setState({
      selectedMovie: ''
    })
  };

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
    movies = this.props.movies.map((movie) => {
      if (movie.id && movie.poster_path) {
        return (
          <React.Fragment>
            <MoviePoster selectMovie={this.selectMovie} id={movie.id} image={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} />
          </React.Fragment>
        )
      }
    });
    return (
      <React.Fragment>
        <div className="row-title">{this.props.title}</div>
        <Slider {...settings}>
          {movies}
        </Slider>
        {this.state.selectedMovie ? <HomeMovieDetail id={this.state.selectedMovie} closePreview={this.closePreview}/> : ''}
      </React.Fragment>
    )
  }
}

export default MovieScroll;
