import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../../index"; // Adjust the path if needed
import "./NewEvent.css";
import TeacherLayout from "../layout/TeacherLayout";

const NewEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, location, date } = eventData;

    if (!name || !description || !location || !date) {
      alert("Please fill all fields before submitting.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(firestore, "events"), {
        ...eventData,
        createdAt: new Date(),
      });

      alert("Event posted successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeacherLayout>
      <div className="new-event-container">
        <h1 className="title">Add New Event</h1>
        <form className="event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter event name"
              value={eventData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              placeholder="Enter event description"
              value={eventData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              placeholder="Enter location"
              value={eventData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Posting..." : "Post Event"}
          </button>
        </form>
      </div>
    </TeacherLayout>
  );
};

export default NewEvent;
