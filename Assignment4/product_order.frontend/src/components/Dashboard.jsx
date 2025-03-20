import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../style/Homepage.css";

const HomePage = () => {
    const [events, setEvents] = useState([]); 
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("/events/get-all-events"); 
                setEvents(response.data); 
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []); 

    const handleClick = (event) => {
        console.log("Event clicked:", event);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEvents = events.filter(
        (event) =>
            event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.eventLocation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="homepage">
            <section className="event1-section">
                <div className="event1-grid">
                    <h2>Available Events</h2>
                    <input
                        type="text"
                        placeholder="Search by event name or location..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-box"
                    />
                    {filteredEvents.map((event, index) => (
                        <div
                            key={index}
                            className="event-box"
                            onClick={() => handleClick(event)}
                            style={{ cursor: "pointer" }}
                        >
                            <h3>{event.eventName}</h3>
                            <p><strong>Business:</strong> {event.businessName}</p>
                            <p><strong>Location:</strong> {event.eventLocation}</p>
                            <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
                            <p><strong>Volunteers Needed:</strong> {event.totalNumVolunteers - event.currentNumVolunteers}</p>
                            <p><strong>Info:</strong> {event.eventInfo}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;