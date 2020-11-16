import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

// list of upcoming events 
class UpcomingEvents extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        $.ajax({
            method: "GET",
            url: "data/events.json",
            dataType: "json",
            success: data => {
                let numberOfUpcomingEvents = 0
                data.reverse().map(event => {
                    // container for each event
                    let eventCard = document.createElement("DIV")
                    document.getElementById("upcomingEvents").appendChild(eventCard)
                    //  evaluate validity of event
                    let eventTime = new Date(event.startTimeObject)
                    let currentTime = new Date()
                    let timeTracker
                    let buttonSwitch
                    if (eventTime > currentTime) {
                        timeTracker = (
                            <div>
                                <span class="badge badge-primary">In {Math.floor((eventTime - currentTime)/(1000*60*60*24))} days</span>
                            </div>
                        )
                        buttonSwitch = "btn btn-primary btn-sm active"
                        numberOfUpcomingEvents++
                    }
                    else {
                        timeTracker = (
                            <div>
                                <span class="badge badge-secondary">Over</span>
                            </div>
                        )
                        buttonSwitch = "btn btn-secondary btn-sm disabled"
                    }
                    //  event details
                    let eventDetails = (
                        <div class="card">
                            <img src={event.logo} class="card-img-top" alt={event.game}/>
                            <div class="card-body">
                                {timeTracker}
                                <h5 class="card-title">{event.titleOfEvent}</h5>
                                <p class="card-text">{event.descriptionOfEvent}</p>
                                <a href="/apply" class={buttonSwitch}>Apply</a>
                            </div>
                        </div>
                    )
                    ReactDOM.render(eventDetails, eventCard)
                })
                let upcomingEventsHeading = (
                    <div class="rounded">
                        <p>Upcoming events <span class="badge badge-pill badge-danger">{numberOfUpcomingEvents}</span></p>
                    </div>
                )
                ReactDOM.render(upcomingEventsHeading, document.getElementById("upcomingEventsHeading"))
            }
        })
    }
    render() {
        return (
            <div>
                <div id="upcomingEventsHeading" class="rounded">

                </div>
                <div id="upcomingEvents">

                </div>
            </div>

        )
    }
}   

export default UpcomingEvents