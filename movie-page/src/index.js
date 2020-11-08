import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import CounterWithHooks from './hooks';
import $ from 'jquery';
import MovieSection from './MovieSection';
import Header from './Header.js';
import Footer from './Footer.js';
// render header
ReactDOM.render(
  <Header />, document.getElementById("header")
);
// render movies section
ReactDOM.render(
  <MovieSection />, document.getElementById("movieCategories")
);

// render footer
ReactDOM.render(
  <Footer />, document.getElementById("footer")
);

reportWebVitals();

