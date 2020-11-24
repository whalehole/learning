import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ContentSpace from './contentSpace';
import UpcomingEvents from './upcomingEvents';
import HeaderPanelRight from './headerPanelRight';
import reportWebVitals from './reportWebVitals';
import $ from 'jquery';

$(()=>{
    console.log("loading components...")
})

ReactDOM.render(
    <ContentSpace />, document.getElementById("panel_1")
)

ReactDOM.render(
    <UpcomingEvents />, document.getElementById("upcomingEventsContainer")
)

ReactDOM.render(
    <HeaderPanelRight />, document.getElementById("headerPanelRight")
)

reportWebVitals();


