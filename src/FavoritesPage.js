// FavoritesPage.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { removeFromFavorites, clear } from "./rtk/MyFav/favoritesSlice";
// import Cactus from "./assets/cactus";
import "./MovieCards.css";
import "./stylee.css";
import Pagination from "react-bootstrap/Pagination";
import "./Pagination.css";

function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const itemsPerPage = 8; // Number of movies to display per page
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(favorites.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const displayedMovies = favorites.slice(offset, offset + itemsPerPage);

  const handlePageChange = (selected) => {
    setCurrentPage(selected);
  };

  const handleRemoveFromFavorites = (id) => {
    dispatch(removeFromFavorites(id));
  };

  return (
    <>
      <h1 className="fav_word text-center m-3">My Favorite Movies</h1>

      <Container className="mr-4 text-black container_card_fav ">
        {favorites.length === 0 ? (
          <>
            <div className="notfound">
              {/* <Cactus /> */}
              <h1 style={{color:"white"}}>No favorites found :(</h1>
            </div>
          </>
        ) : (
          <div>
            <Button
              className="btn btn-primary remove-favorite"
              onClick={() => dispatch(clear())}
            >
              Clear All
            </Button>
            <br /> <br />
            <Row>
              {displayedMovies.map((movie) => (
                <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    className="mb-3"
                    style={{ backgroundColor: "transparent", color: "white" }}
                  >
                    <Card.Img
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w500${movie.imgSrc}`}
                    />
                    <Card.Body>
                      <Card.Title className="text-center">
                        <h6>{movie.title}</h6>
                      </Card.Title>
                    </Card.Body>
                    <Card.Footer>
                      <Button
                        style={{ width: "100%" }}
                        className="w-100 btn btn-primary remove-favorite"
                        onClick={() => handleRemoveFromFavorites(movie.id)}
                      >
                        Remove from Favorites
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
      {/* pagination */}
      <Pagination className="custom-pagination">
        <Pagination.First onClick={() => handlePageChange(0)} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        />
        {[...Array(pageCount).keys()].map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount - 1}
        />
        <Pagination.Last onClick={() => handlePageChange(pageCount - 1)} />
      </Pagination>
    </>
  );
}

export default FavoritesPage;
