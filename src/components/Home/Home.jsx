import React, { useEffect } from 'react'

import Paginate from '../Pagination/Paginate';

import { getPopularMovies } from '../../api/movies';

import { useState } from 'react';

import styles from './Home.module.css'

import MovieCard from '../MovieCard/MovieCard';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMoreMoviesLoading, setIsMoreMoviesLoading] = useState(false);

  const fetchPopularMovies = async (page) => {
    try {
      const res = await getPopularMovies(page);
      setIsDataLoaded(true);
      if (!res) {
        return;
      }
      if (page === 1) {
        setTotalPages(res.total_pages);
        setPopularMovies(res.results);
      } else {
        // Filtering out duplicates by comparing the movie IDs
        const newMovies = res.results.filter((newMovie) => !popularMovies.some((movie) => movie.id === newMovie.id));
        setPopularMovies((prev) => [...prev, ...newMovies]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePaginate = () => {
    if (isMoreMoviesLoading || currentPage >= totalPages) {
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchPopularMovies(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.container}>
      {!isDataLoaded ? 'Loading...' : (
     <Paginate onEnd={handlePaginate}>
          <div className={styles.innerContainer}>
              {popularMovies.map((item, index) => (
                <MovieCard
                  movie = { item }
                  key = { item.id + index + "" }
                />
              ))}
          </div>
     </Paginate>
      )}
    </div>
  );
};

export default Home;
