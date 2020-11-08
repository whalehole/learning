import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import CounterWithHooks from './hooks';
import $ from 'jquery';

class MovieSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {category: "forAllAges"}
  }
  
  toForAllAges() {
    this.setState({category: "forAllAges"})
  }

  toNSFW() {
    this.setState({category: "NSFW"})
  }

  toVeryAdult() {
    this.setState({category: "veryAdult"})
  }

  componentWillUnmount() {
    console.log("component is unmounting")
  }

  render() {
    // no time to use bind. bind to use this. in nested function another time
    var state = this.state
    // movies list
    let numberOfMovies
    $("#moviesList").empty();
    function getNumberOfMovies() {
      let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let allMovies = JSON.parse(this.responseText)
          numberOfMovies = allMovies[state.category].length
        }
      }
      xhttp.open("GET", "content.json", false) //got to use syncrhonos for it to work, need better solution though!! next time
      xhttp.send()
    }
    getNumberOfMovies()
    console.log("Number of movies = " + numberOfMovies)
    for (var i = 0; i < numberOfMovies; i++) {
      let counter = i
      let newElement = document.createElement("DIV");
      document.getElementById("moviesList").appendChild(newElement);
      let imageElement = document.createElement("IMG");
      let titleElement = document.createElement("P");
      let descriptionElement = document.createElement("P");
      let releaseDate = document.createElement("P");
      let moreDetails = document.createElement("A");
      // get image of movie
      newElement.appendChild(imageElement);
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let movieStuff = JSON.parse(this.responseText)
          console.log("loading image index " + (counter))
          $("#moviesList > div:nth-of-type("+ (counter + 1) +") > img").attr("src", movieStuff[state.category][counter]["image"])
        }
      }
      xhttp.open("GET", "content.json", true)
      xhttp.send()
      // 
      // get title of movie
      newElement.appendChild(titleElement);
      let xhttp2 = new XMLHttpRequest();
      xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let movieStuff = JSON.parse(this.responseText)
          console.log("loading title index " + (counter))
          $("#moviesList > div:nth-of-type("+ (counter + 1) +") > p:nth-of-type(1)").html(movieStuff[state.category][counter]["title"])
        }
      }
      xhttp2.open("GET", "content.json", true)
      xhttp2.send()
      // 
      // get description of movie
      newElement.appendChild(descriptionElement);
      let xhttp3 = new XMLHttpRequest();
      xhttp3.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let movieStuff = JSON.parse(this.responseText)
          console.log("loading description index " + (counter))
          $("#moviesList > div:nth-of-type("+ (counter + 1) +") > p:nth-of-type(2)").html(movieStuff[state.category][counter]["description"])
        }
      }
      xhttp3.open("GET", "content.json", true)
      xhttp3.send()
      // 
      // get release date of movie
      newElement.appendChild(releaseDate);
      let xhttp4 = new XMLHttpRequest();
      xhttp4.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let movieStuff = JSON.parse(this.responseText)
          console.log("loading release date index " + (counter))
          $("#moviesList > div:nth-of-type("+ (counter + 1) +") > p:nth-of-type(3)").html(movieStuff[state.category][counter]["releaseDate"])
        }
      }
      xhttp4.open("GET", "content.json", true)
      xhttp4.send()
      // 
      // get more details of movie
      newElement.appendChild(moreDetails);
      // 
    }
    // movie categories 
    return (
      <div id="categories">
        <button onClick={() => this.toForAllAges()}>For all ages</button>
        <button onClick={() => this.toNSFW()}>NSFW</button>
        <button onClick={() => this.toVeryAdult()}>Very adult</button>
      </div>
    )
    
  }

}

export default MovieSection