const apiKey = 'cb6a4e7b07617b6d5ff586e8d6af9692';

const apiDomain = 'https://api.themoviedb.org/3'



/*-------------------------------*\
 * All API Calling functions
\*------------------------------ */



//* API call with the endopoint of Popular movies  
// api/movies.js

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(`${apiDomain}/movie/popular?api_key=${apiKey}&page=${page}`);
    const apiData = await response.json();
    return apiData;
  } catch (err) {
    console.error(err);
    return false;
  }
};
  
// *    API Call to fetch movies' genre

export const getGenre = async () => {
    try {
        const response = await fetch(`${apiDomain}/genre/movie/list?api_key=${apiKey}&language=en-US`);
        const apiData = await response.json();

        return apiData;
    } catch (err) {
        console.error(err);
        return false;
    }
}


// *    API call to get the Thumbnail of the movie
export const getMovieThumbnail = async(id) => {
    try{
        const response = await fetch(`${apiDomain}/movie/${id}/images?api_key=${apiKey}`);
        const apiData = await response.json();

        return apiData;
    }
    catch(err){
        console.error(err);
        return false;
    }
} 

// *    API Call to fetch the Movie Details
export const getMovieDetails = async(id) => {
    try{
        const response = await fetch(`${apiDomain}/movie/${id}?api_key=${apiKey}`);
        const apiData = await response.json();

        return apiData;
    }
    catch(err){
        console.error(err);
        return false;
    }
} 

// *     API Call to fetch the similar movies with the id of the particularly searched movie 
export const getSimilarMovies = async(id) => {
    try{
        const response = await fetch(`${apiDomain}/movie/${id}/similar?api_key=${apiKey}`);
        const apiData = await response.json();

        return apiData;
    }
    catch(err){
        console.error(err);
        return false;
    }
} 

// *    API Call to fetch the movie using the GenreID
export const getMoviesWithGenreId = async(genreId, page = 1) => {
    try{
        const response = await fetch(
            `${apiDomain}/discover/movie?api_key=${apiKey}&with_genres=${genreId}
            &sort_by=popularity.desc&page=${page}`);
        const apiData = await response.json();

        return apiData;
    }
    catch(err){
        console.error(err);
        return false;
    }
} 

// *    API Call to search the movie
export const searchAMovie = async(query) => {
    try{
        const response = await fetch(`${apiDomain}/search/movie?api_key=${apiKey}`);
        const apiData = await response.json();

        return apiData;
    }
    catch(err){
        console.error(err);
        return false;
    }
}
