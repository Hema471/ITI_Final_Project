import React, { useState, useEffect } from "react";
import MovieCards from "../MovieCards";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-bootstrap/Pagination";
import "../Pagination.css";
import "./Search.css";
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
      // recognition.lang = "ar-SA";
      // recognition.lang = "ar-EG";
      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        fetchMovies(transcript);
      };

      recognition.onerror = (event) => {
        setError(`Voice recognition error: ${event.error}`);
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.start();
    };

    const stopRecognition = () => {
      if (recognition) {
        recognition.stop();
      }
    };

    if (listening) {
      startRecognition();
    }

    return () => {
      stopRecognition();
    };
  }, [listening]);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery) {
      fetchMovies(newQuery);
    } else {
      setMoviesDetails([]);
    }
  };

  const fetchMovies = (newQuery) => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${newQuery}&page=${currentPage}&with_genres=${genreId}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        if (data.results) {
          setMoviesDetails(data.results);
          setError(null);
          setTotalPages(data.total_pages);
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
      fetchMovies(query);
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

  const toggleRecognition = () => {
    setListening(!listening);
  };

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
      {error && <p>{error}</p>}
      <div className="container_card">
        <div className="row">
          {moviesDetails.map((movieDetail, index) => (
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

// Always Listining

// import React, { useState, useEffect } from "react";
// import MovieCards from "../MovieCards";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Pagination from "react-bootstrap/Pagination";
// import "../Pagination.css";
// import "./Search.css";
// const apiKey = "7a1c19ea3c361a4d3cc53eb70ef8298c";

// const MovieSearch = () => {
//   const [query, setQuery] = useState("");
//   const [moviesDetails, setMoviesDetails] = useState([]);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.continuous = false;
//     recognition.lang = "en-US";
//     // recognition.lang = "ar-EG";
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setQuery(transcript);
//       fetchMovies(transcript);
//     };

//     recognition.onend = () => {
//       recognition.start();
//     };

//     recognition.start();

//     return () => {
//       recognition.stop();
//     };
//   }, []);

//   const handleInputChange = (event) => {
//     const newQuery = event.target.value;
//     setQuery(newQuery);

//     if (newQuery) {
//       fetchMovies(newQuery);
//     } else {
//       setMoviesDetails([]);
//     }
//   };

//   const fetchMovies = (newQuery) => {
//     const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${newQuery}&page=${currentPage}`;

//     axios
//       .get(apiUrl)
//       .then((response) => {
//         const data = response.data;
//         if (data.results) {
//           setMoviesDetails(data.results);
//           setError(null);
//           setTotalPages(data.total_pages);
//         } else {
//           setMoviesDetails([]);
//           setError("No movies found.");
//         }
//       })
//       .catch(() => {
//         setMoviesDetails([]);
//         setError("An error occurred while fetching data.");
//       });
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//       fetchMovies(query);
//     }
//   };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     const totalPagesToShow = Math.min(totalPages, 5);
//     const startPage = Math.max(currentPage - Math.floor(totalPagesToShow / 2), 1);

//     for (let i = startPage; i <= startPage + totalPagesToShow - 1; i++) {
//       if (i > 0 && i <= totalPages) {
//         pageNumbers.push(
//           <Pagination.Item
//             key={i}
//             active={i === currentPage}
//             onClick={() => handlePageChange(i)}
//           >
//             {i}
//           </Pagination.Item>
//         );
//       }
//     }

//     return pageNumbers;
//   };

//   return (
//     <div className="search-container">
//       <h1>Movie Search</h1>
//       <form onSubmit={(event) => event.preventDefault()}>
//         <input
//           type="text"
//           placeholder="Search for a movie..."
//           value={query}
//           onChange={handleInputChange}
//           className="search-input"
//         />
//       </form>
//       {error && <p>{error}</p>}
//       <div className="container_card">
//         <div className="row">
//           {moviesDetails.map((movieDetail, index) => (
//             <MovieCards
//               title={movieDetail.title.substring(0, 20) + "..."}
//               imgSrc={movieDetail.poster_path}
//               id={movieDetail.id}
//               key={index}
//             />
//           ))}
//         </div>
//       </div>
//       <Pagination className="custom-pagination" style={{ padding: "7px" }}>
//         <Pagination.Prev
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         />
//         {renderPageNumbers()}
//         <Pagination.Next
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         />
//       </Pagination>
//     </div>
//   );
// };

// export default MovieSearch;
