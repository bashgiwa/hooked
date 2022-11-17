import React from "react";

import styles from './Movie.module.css';

const PLACEHOLDER_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


const Movie = ({movie}) => {
    return (
        <div>
            <h4>{movie.Title}</h4>
            <div className={styles.moviePoster}>
                <img width="200" alt={`The movie titled: ${movie.Title}`} src={movie.Poster}></img>
            </div>
           <p>({movie.Year})</p>
        </div>
    );
};

export default Movie;