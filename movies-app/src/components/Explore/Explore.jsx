import styles from './Explore.module.css'

import {useState, useEffect} from 'react';

import { getGenre } from '../../api/movies';

import { useRef } from 'react';

import React from 'react'

import Paginate from '../Pagination/Paginate';

import MovieCard from '../MovieCard/MovieCard';

import { getMoviesWithGenreId } from '../../api/movies';




function Explore() {
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isMoreMoviesLoading, setIsMoreMoviesLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllGenres = () => {
    getGenre().then((res) => {
      if (!res) return;
      setAllGenres(res.genres);
      setSelectedGenres([res.genres[0]]);
    });
  };

  const fetchMovies = (page) => {
    if (selectedGenres.length === 0) return;
    const ids = selectedGenres.map((item) => item.id).join(',');

    setIsMoreMoviesLoading(true);
    getMoviesWithGenreId(ids, page).then((res) => {
      setIsMoreMoviesLoading(false);
      if (!res) return;
      if (page === 1) {
        setTotalPages(res.total_pages);
        setMovies(res.results);
      } else {
        setMovies((prev) => [...prev, ...res?.results]);
      }
      setCurrentPage(res?.page);
    });
  };

  const handleGenreClick = (genre) => {
    const tempGenres = [...selectedGenres];
    const currIndex = tempGenres.findIndex((item) => item.id === genre.id);

    if (currIndex < 0) {
      tempGenres.push(genre);
    } else {
      if (selectedGenres.length > 1) tempGenres.splice(currIndex, 1);
    }

    setSelectedGenres(tempGenres);
  };

  const handlePaginate = () => {
    if (isMoreMoviesLoading || currentPage >= totalPages) return;
    fetchMovies(currentPage + 1);
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchMovies(1);
  }, [selectedGenres]);

  useEffect(() => {
    fetchAllGenres();
  }, []);

  // Create a ref to the last element in the movie list
  const endOfListRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // 0.5 means 50% of the last element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handlePaginate();
      }
    }, options);

    // Attach the observer to the last element in the movie list
    if (endOfListRef.current) {
      observer.observe(endOfListRef.current);
    }

    // Cleanup the observer when component unmounts
    return () => {
      if (endOfListRef.current) {
        observer.unobserve(endOfListRef.current);
      }
    };
  }, [movies, totalPages, isMoreMoviesLoading]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {allGenres.map((item) => (
          <div
            key={item.id + item.name}
            className={`${styles.chip} ${
              selectedGenres.find((element) => element.id === item.id)
                ? styles.activeChip
                : ''
            }`}
            onClick={() => handleGenreClick(item)}
          >
            {item.name}
          </div>
        ))}
      </div>

      <p className={styles.title}>Explore Movies</p>
      <Paginate>
        <div className={styles.body}>
          {movies.map((item, index) => (
            <MovieCard movie={item} key={item.id + index + ''} />
          ))}
          {isMoreMoviesLoading && <b>Loading...</b>}
          {/* Attach the ref to the last element in the movie list */}
          <div ref={endOfListRef} />
        </div>
      </Paginate>
    </div>
  );
}

export default Explore;



























    // function Explore() {
    //   const [allGenres, setAllGenres] = useState([]);
    //   const [selectedGenres, setSelectedGenres] = useState([]);
    //   const [movies, setMovies] = useState([]);
    //   const [isMoreMoviesLoading, setIsMoreMoviesLoading] = useState(false);
    //   const [currentPage, setCurrentPage] = useState(1);
    //   const [totalPages, setTotalPages] = useState(1);
    //   const [isNearEnd, setIsNearEnd] = useState(false);
    
    //   const fetchAllGenres = () => {
    //     getGenre().then((res) => {
    //       if (!res) return;
    //       setAllGenres(res.genres);
    //       setSelectedGenres([res.genres[0]]);
    //     });
    //   };
    
    //   const fetchMovies = (page) => {
    //     if (selectedGenres.length === 0) return;
    //     const ids = selectedGenres.map((item) => item.id).join(",");
    
    //     setIsMoreMoviesLoading(true);
    //     getMoviesWithGenreId(ids, page).then((res) => {
    //       setIsMoreMoviesLoading(false);
    //       if (!res) return;
    //       if (page === 1) {
    //         setTotalPages(res.total_pages);
    //         setMovies(res.results);
    //       } else {
    //         setMovies((prev) => [...prev, ...res?.results]);
    //       }
    //       setCurrentPage(res?.page);
    //     });
    //   };
    
    //   const handleGenreClick = (genre) => {
    //     const tempGenres = [...selectedGenres];
    //     const currIndex = tempGenres.findIndex((item) => item.id === genre.id);
    
    //     if (currIndex < 0) {
    //       tempGenres.push(genre);
    //     } else {
    //       if (selectedGenres.length > 1) tempGenres.splice(currIndex, 1);
    //     }
    
    //     setSelectedGenres(tempGenres);
    //   };
    
    //   const handlePaginate = () => {
    //     if (isMoreMoviesLoading || currentPage >= totalPages) return;
    //     fetchMovies(currentPage + 1);
    //   };
    
    //   useEffect(() => {
    //     if (isNearEnd) handlePaginate();
    //   }, [isNearEnd]);
    
    //   useEffect(() => {
    //     setCurrentPage(1);
    //     fetchMovies(1);
    //   }, [selectedGenres]);
    
    //   useEffect(() => {
    //     fetchAllGenres();
    //   }, []);
    
    //   return (
    //     <div className={styles.container}>
    //       <div className={styles.header}>
    //         {allGenres.map((item) => (
    //           <div
    //             key={item.id + item.name}
    //             className={`${styles.chip} ${
    //               selectedGenres.find((element) => element.id === item.id)
    //                 ? styles.activeChip
    //                 : ""
    //             }`}
    //             onClick={() => handleGenreClick(item)}
    //           >
    //             {item.name}
    //           </div>
    //         ))}
    //       </div>
    
    //       <p className={styles.title}>Explore Movies</p>
    //       <Paginate onIntersection={(isNearEnd) => setIsNearEnd(isNearEnd)}>
    //         <div className={styles.body}>
    //           {movies.map((item, index) => (
    //             <MovieCard movie={item} key={item.id + index + ""} />
    //           ))}
    //           {isMoreMoviesLoading && <b>Loading...</b>}
    //         </div>
    //       </Paginate>
    //     </div>
    //   );
    // }
    
    // export default Explore;







