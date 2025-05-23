import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiService } from "../../services/ApiService";

function AddSchedule() {
  const [schedule, setSchedule] = useState({
    routeName: "",
    departureTime: "",
    arrivalTime: "",
    frequency: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiService.addSchedule(schedule)
      .then(() => {
        toast.success("Schedule added successfully!");
        navigate("/admin/schedules"); // Redirect to the schedule list page
      })
      .catch((error) => {
        toast.error("Failed to add schedule. Please try again.");
        console.error("Error adding schedule:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Route Name</label>
          <input
            type="text"
            className="form-control"
            name="routeName"
            value={schedule.routeName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Departure Time</label>
          <input
            type="time"
            className="form-control"
            name="departureTime"
            value={schedule.departureTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Arrival Time</label>
          <input
            type="time"
            className="form-control"
            name="arrivalTime"
            value={schedule.arrivalTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Frequency</label>
          <select
            className="form-control"
            name="frequency"
            value={schedule.frequency}
            onChange={handleChange}
            required
          >
            <option value="">Select Frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Schedule
        </button>
      </form>
    </div>
  );
}

export default AddSchedule;