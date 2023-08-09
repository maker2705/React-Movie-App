import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getSimilarMovies } from "../../api/movies";

import MovieCard from "../MovieCard/MovieCard";

import styles from "./Movie.module.css";

const imagePrefixUrl = "http://image.tmdb.org/t/p/w500";
function Movie() {
  const params = useParams();
  const movieId = params.movieId;
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);

  const fetchMovieDetails = () => {
    getMovieDetails(movieId).then((response) => {
      if (!response) return;
      setMovie(response);
    });
  };

  const fetchSimilarMovies = () => {
    getSimilarMovies(movieId).then((response) => {
      if (!response) return;
      setSimilarMovies(response.results);
    });
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchSimilarMovies();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img src={`${imagePrefixUrl}${movie?.backdrop_path}`} alt={movie?.title} />
        <div className={styles.details}>
          <label>Title</label>
          <div className={styles.title}>{movie?.title}</div>
          <div className={styles.sub}>{movie?.tagline}</div>
          <label>Story</label>
          <div className={styles.desc}>{movie?.overview}</div>
          <label>Run time</label>
          <div className={styles.desc}>{movie?.runtime} mins</div>
        </div>
      </div>
      <div className={styles.similar}>
        <div className={styles.title}>Similar movies</div>
        <div className={styles.movies}>
          {similarMovies.map((item) => (
            <MovieCard movie={item} key={item.id} />
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Movie;







// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getMovieDetails, getSimilarMovies } from "../../api/movies";

// import MovieCard from "../MovieCard/MovieCard";

// import styles from "./Movie.module.css";

// const imagePrefixUrl = "http://image.tmdb.org/t/p/w500";
// function Movie() {
//   const params = useParams();
//   const movieId = params.movieId;
//   const [movie, setMovie] = useState({});
//   const [similarMovies, setSimilarMovies] = useState([]);

//   const fetchMovieDetails = () => {
//     getMovieDetails(movieId).then((response) => {
//       if (!response) return;
//       setMovie(response);
//     });
//   };

//   const fetchSimilarMovies = () => {
//     getSimilarMovies(movieId).then((response) => {
//       if (!response) return;
//       setSimilarMovies(response.results);
//     });
//   };

//   useEffect(() => {
//     fetchMovieDetails();
//     fetchSimilarMovies();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <div className={styles.main}>
//         <img src={`${imagePrefixUrl}${movie?.backdrop_path}`} />
//         <div className={styles.details}>
//           <label>Title</label>
//           <div className={styles.title}>{movie?.title}</div>
//           <div className={styles.sub}>{movie?.tagline}</div>
//           <label>Story</label>
//           <div className={styles.desc}>{movie?.overview}</div>
//           <label>Run time</label>
//           <div className={styles.desc}>{movie?.runtime} mins</div>
//         </div>
//       </div>
//       <div className={styles.similar}>
//         <div className={styles.title}>Similar movies</div>
//         <div className={styles.movies}>
//           {similarMovies.map((item) => (
//             <MovieCard movie={item} key={item.id} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Movie;