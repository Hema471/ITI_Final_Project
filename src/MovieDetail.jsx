import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import "./MovieDetail.css";

const MovieDetail = () => {
  let { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&append_to_response=videos`
      )
      .then(({ data }) => {
        setMovieDetails(data);

        if (data.videos && data.videos.results) {
          const officialTrailer = data.videos.results.find(
            (vid) => vid.name === "Official Trailer"
          );

          setTrailer(officialTrailer || data.videos.results[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);

  const videoId = trailer ? trailer.key : "";

  const videoOptions = {
    height: 390,
    width: 740,
  };

  return (
    <section>
      <div className="container text-black mb-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path}
              alt={movieDetails.title}
              className="w-100"
            />
          </div>
          <div className="col-md-8">
            <h2>{movieDetails.title}</h2>
            <p>{movieDetails.overview}</p>
            <p>
              <span className="fw-bold">Release Date: </span>
              {movieDetails.release_date}
            </p>
            <p>
              <span className="fw-bold">Popularity: </span>
              {movieDetails.popularity}
            </p>
            <div className="youtube-container">
              <YouTube
                videoId={videoId}
                opts={videoOptions}
                className="youtube-iframe"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetail;
