import React, { Component } from "react";
import MovieCards from "../MovieCards";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-bootstrap/Pagination";
import "../Pagination.css";
import "./Search.css";
const apiKey = "7a1c19ea3c361a4d3cc53eb70ef8298c";

class MovieSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      moviesDetails: [],
      error: null,
      currentPage: 1,
      totalPages: 1,
    };
  }

  handleInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query }, () => {
      if (query) {
        this.fetchMovies(query);
      } else {
        this.setState({ moviesDetails: [] });
      }
    });
  };

  fetchMovies = (query) => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${this.state.currentPage}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        if (data.results) {
          this.setState({
            moviesDetails: data.results,
            error: null,
            totalPages: data.total_pages,
          });
        } else {
          this.setState({
            moviesDetails: [],
            error: "No movies found.",
          });
        }
      })
      .catch((error) => {
        this.setState({
          moviesDetails: [],
          error: "An error occurred while fetching data.",
        });
      });
  };

  handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= this.state.totalPages) {
      this.setState({ currentPage: newPage }, () => {
        this.fetchMovies(this.state.query);
      });
    }
  };

  renderPageNumbers = () => {
    const pageNumbers = [];

    const totalPagesToShow = Math.min(this.state.totalPages, 5);
    const startPage = Math.max(
      this.state.currentPage - Math.floor(totalPagesToShow / 2),
      1
    );

    for (let i = startPage; i <= startPage + totalPagesToShow - 1; i++) {
      if (i > 0 && i <= this.state.totalPages) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={i === this.state.currentPage}
            onClick={() => this.handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }

    return pageNumbers;
  };

  render() {
    return (
      <div  className="search-container">
        <h1 >Movie Search</h1>
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={this.state.query}
            onChange={this.handleInputChange}
            className="search-input"
          />
        </form>
        {this.state.error && <p>{this.state.error}</p>}
        <div className="container_card">
          <div className="row">
            {this.state.moviesDetails.map((movieDetail, index) => (
              <MovieCards
                title={movieDetail.title.substring(0, 20) + "..."}
                imgSrc={movieDetail.poster_path}
                id={movieDetail.id}
                key={index}
              />
            ))}
          </div>
        </div>
        <Pagination className="custom-pagination" style={{ padding: "7px" }}>
          <Pagination.Prev
            onClick={() => this.handlePageChange(this.state.currentPage - 1)}
            disabled={this.state.currentPage === 1}
          />
          {this.renderPageNumbers()}
          <Pagination.Next
            onClick={() => this.handlePageChange(this.state.currentPage + 1)}
            disabled={this.state.currentPage === this.state.totalPages}
          />
        </Pagination>
      </div>
    );
  }
}

export default MovieSearch;
