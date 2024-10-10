import React, { useState, useEffect, useCallback } from "react";
import SearchCard from "../SearchCard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-bootstrap/Pagination";
import "../Pagination.css";
import "./Search.css";
import { debounce } from "lodash";

const apiKey = "7a1c19ea3c361a4d3cc53eb70ef8298c";
const genreId = 16; // ID for animation

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [moviesDetails, setMoviesDetails] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    let recognition = null;

    const startRecognition = () => {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-US";
      recognition.onstart = () => setListening(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        fetchMovies(transcript, 1); // Reset to page 1 on voice input
      };

      recognition.onerror = (event) => {
        setError(`Voice recognition error: ${event.error}`);
        setListening(false);
      };

      recognition.onend = () => setListening(false);

      recognition.start();
    };

    if (listening) {
      startRecognition();
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, [listening]);

  // Debounced function to avoid excessive API calls
  const debouncedFetchMovies = useCallback(
    debounce((newQuery, newPage) => fetchMovies(newQuery, newPage), 500),
    []
  );

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setCurrentPage(1); // Reset to first page on new query
    debouncedFetchMovies(newQuery, 1); // Fetch for page 1
  };

  const fetchMovies = (newQuery, page) => {
    if (!newQuery.trim()) {
      setMoviesDetails([]);
      return;
    }

    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${newQuery}&page=${page}&with_genres=${genreId}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        if (data.results.length > 0) {
          setMoviesDetails(data.results);
          setTotalPages(data.total_pages);
          setError(null);
        } else {
          setMoviesDetails([]);
          setError("No movies found.");
        }
      })
      .catch(() => {
        setMoviesDetails([]);
        setError("An error occurred while fetching data.");
      });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchMovies(query, newPage); // Pass current query and new page number
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = Math.min(totalPages, 5); // Show up to 5 pages at a time
    const startPage = Math.max(currentPage - Math.floor(totalPagesToShow / 2), 1);

    for (let i = startPage; i <= startPage + totalPagesToShow - 1 && i <= totalPages; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return pageNumbers;
  };

  const toggleRecognition = () => setListening((prevState) => !prevState);

  return (
    <div className="search-container">
      <h1>Movie Search</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        <button className="voice-button" onClick={toggleRecognition}>
          {listening ? "Stop Listening" : "Start Listening"}
        </button>
      </form>
      {listening && <p>Listening...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="container_card">
        <div className="row">
          {moviesDetails.map((movieDetail, index) => (
            <SearchCard
              title={movieDetail.title.length > 20 ? movieDetail.title.substring(0, 20) + "..." : movieDetail.title}
              imgSrc={movieDetail.poster_path}
              id={movieDetail.id}
              key={index}
              genreId={movieDetail.genre_ids}
            />
          ))}
        </div>
      </div>
      <Pagination className="custom-pagination" style={{ padding: "7px" }}>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {renderPageNumbers()}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default MovieSearch;
