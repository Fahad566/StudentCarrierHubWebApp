import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../../index"; // Adjust path if needed
import "./TeacherEvents.css";
import TeacherLayout from "../layout/TeacherLayout";

const TeacherEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from Firestore on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(firestore, "events");
        const snapshot = await getDocs(eventsRef);
        const eventsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteDoc(doc(firestore, "events", id));
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TeacherLayout>
      <div className="events">
        <h1>Event Listings</h1>

        {/* Table Header */}
        <div className="table-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search events..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Add Event Button */}
          <Link to="/new-events" className="add-button">
            <i className="fas fa-plus"></i> Add Event
          </Link>
        </div>

        {/* Event List */}
        <div className="event-list">
          {loading ? (
            <p>Loading events...</p>
          ) : filteredEvents.length === 0 ? (
            <p>No events found.</p>
          ) : (
            filteredEvents.map((event) => (
              <div key={event.id} className="event-card">
                <h2>{event.name}</h2>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>

                <div className="event-actions">
                  <button className="edit-button">Edit</button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherEvents;
