import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "./rtk/MyFav/favoritesSlice";
import "./MovieCards.css";
import "./stylee.css";

function MovieCard({ title, imgSrc, id, genreId }) {
  const myGenre = 16;
  // console.log("hemaaaa", genreId);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = favorites.some((item) => item.id === id);

  const handleToggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites({ id, title, imgSrc }));
    }
  };

  return (
    genreId?.includes(myGenre) && (
      <div className="col-sm-12 col-md-6 col-lg-3 p-2 xyz ">
        <Link className="text-decoration-none " to={`/movies/${id}`}>
          <div className="movies-cards shadow">
            <div>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${imgSrc}`}
                  className="w-100"
                  alt=""
                />
              </div>
              <div className="container">
                <div className=" text-center py-2">{title}</div>
              </div>
            </div>
          </div>
        </Link>
        <button
          onClick={handleToggleFavorites}
          className={`favorite-button w-100 btn btn-primary justify-content-center ${
            isFavorite ? "remove-favorite" : "add-favorite"
          }`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    )
  );
}
export default MovieCard;
