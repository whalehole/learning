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

  componentDidUpdate() {
    if (this.state.category === "forAllAges") {
      console.log("1");
    }
    else if (this.state.category === "NSFW") {
      console.log("2");
    }
    else if (this.state.category === "veryAdult") {
      console.log("3");
    }
  }

  render() {

    // movies list
    $("#moviesList").empty();
    for (var i = 0; i < 20; i++) {
      let newElement = document.createElement("DIV");
      document.getElementById("moviesList").appendChild(newElement);
      let imageElement = document.createElement("IMG");
      let titleElement = document.createElement("P");
      let descriptionElement = document.createElement("P");
      let releaseDate = document.createElement("P");
      let moreDetails = document.createElement("A");
      newElement.appendChild(imageElement);
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log("ajax-working")
          console.log(this.responseText)
          var movieStuff = JSON.parse(this.responseText)
          $("#moviesList > div > img").attr("src", movieStuff[i].image)
          console.log("loading")
          console.log(movieStuff[i].image)
        }
      }
      xhttp.open("GET", "content.json", true)
      xhttp.send()
      newElement.appendChild(titleElement);
      newElement.appendChild(descriptionElement);
      newElement.appendChild(releaseDate);
      newElement.appendChild(moreDetails);
    }
    // movie categories 
    return (
      <div>
        <button onClick={() => this.toForAllAges()}>For all ages</button>
        <button onClick={() => this.toNSFW()}>NSFW</button>
        <button onClick={() => this.toVeryAdult()}>Very adult</button>
      </div>
    )
    
  }


}
ReactDOM.render(
    <img src="logo.png" alt="logo"></img>, document.getElementById("logo")
);

ReactDOM.render(
    <h1>
        FREE ILLEGAL MOVIES
    </h1>,
    document.getElementById("mainHeading")
);


// render movies section
ReactDOM.render(
  <MovieSection />, document.getElementById("movieCategories")
);

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {color: "blue"}
  }
}

reportWebVitals();

