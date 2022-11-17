import React, {useReducer, useState, useEffect} from "react";
import './views.css';
import Header from "../components/Header";
import Movie from "../components/Movie";
import Search from "../components/Search";

const MOVIE_API_URL = "http://www.omdbapi.com/?s=man&apikey=b1a1ac9b";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducerStates = {
  "SUCCESS": "SEARCH_MOVIES_SUCCESS",
  "REQUEST": "SEARCH_MOVIES_REQUEST",
  "FAILURE": "SEARCH_MOVIES_FAILURE"
}

const reducer = (state, action) => {
  switch(action.type){
    case reducerStates.REQUEST: 
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case reducerStates.SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case reducerStates.FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
  }
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)


  //fetch movieData, update state
  useEffect(() => {
    fetch(MOVIE_API_URL)
    .then(response => response.json())
    .then(jsonResponse => {
      dispatch({
        type: reducerStates.SUCCESS,
        payload: jsonResponse.Search
      })
    })
  }, []);

  const search = (searchValue)=> {
    fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=b1a1ac9b`)
    .then(response => response.json())
    .then(jsonResponse => {
      if(jsonResponse.Response === 'True') {
        dispatch({
          type: reducerStates.SUCCESS,
          payload: jsonResponse.Search
        })
      }else {
        dispatch({
          type: reducerStates.FAILURE,
          error: jsonResponse.Error
        })
      } 
    })
  }

  const { movies, errorMessage, loading } = state;
  return (
    <div className="App">
      <Header text="HOOKED ON MOVIES" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) =>(
            <Movie key={`${index}-${movie.Title}`} movie={movie}/>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
