import React, { useState, useEffect } from "react";
import Axios from "axios";
import MovieCards from "./MovieCards";
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Pagination.css";

const Cards = () => {
  const apikey = "7a1c19ea3c361a4d3cc53eb70ef8298c";
  const genreId = 16; // ID for animation
  const [moviesDetails, setMoviesDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getMoviesByPage(currentPage);
  }, [currentPage]);

  const getMoviesByPage = async (page) => {
    try {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&page=${page}&with_genres=${genreId}`
      );
      const { results, total_pages } = response.data;

      setMoviesDetails(results);
      setTotalPages(total_pages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = Math.min(totalPages, 5);
    const startPage = Math.max(
      currentPage - Math.floor(totalPagesToShow / 2),
      1
    );

    for (let i = startPage; i <= startPage + totalPagesToShow - 1; i++) {
      if (i > 0 && i <= totalPages) {
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
    }

    return pageNumbers;
  };

  return (
    <section className="main_card">
      <div className="container_card">
        <div className="row">
          {moviesDetails.map((moviesDetail, index) => (
            <MovieCards
              title={
                moviesDetail.title.length > 20
                  ? moviesDetail.title.substring(0, 20) + "..."
                  : moviesDetail.title
              }
              imgSrc={moviesDetail.poster_path}
              id={moviesDetail.id}
              key={index}
            />
          ))}
        </div>
      </div>
      {/* Bootstrap Pagination */}
      <Pagination className="custom-pagination">
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
    </section>
  );
};

export default Cards;
