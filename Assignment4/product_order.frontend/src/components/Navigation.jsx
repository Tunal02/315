import React from "react";import React, {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import EventCard from "../../component/EventCard";
import axios from "axios";
import "./../../styles/eventListStyle.css"


const EventDashboard = () => {
    const [events, setEvents] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {

            try {
                // send api request to get all events
                const eventResponse = await axios.post("/events/get-all-events");
                const eventsData = eventResponse.data;
                setEvents(eventsData);

                setLoading(false);

            } catch (error) {
                if (error.response) {
                    setError(error.response.data.message);
                } else {
                    setError("An unexpected error occurred. Please try again.");
                }

                setLoading(false);

            }
        };
        fetchData();

    },[]);


    return (
        <div className="event-grid">

            <div className="event_list">
                <div id="event-list">
                    <div className="events-section" style = {{height: '500px', overflowY: 'scroll'}}>
                        <ul>
                            {events.map((event, index) => (
                                <li key={index}>
                                    <div className="event-list">
                                        <EventCard event={event} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDashboard;