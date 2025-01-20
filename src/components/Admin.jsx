import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const Admin = () => {
  const [users, setUsers] = useState([]); // Single users state

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log("Fetched users:", data); // Logs the data after it's fetched
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    // This will log when the users state is updated
    console.log("Updated users:", users);
  }, [users]); // Logs when the `users` state changes

  // State variables for event details
  const [deadline, setDeadline] = useState("January 25, 2025");
  const [headline, setHeadline] = useState(
    "Join Real Estate Expert Gina Hanson"
  );
  const [eventDetails, setEventDetails] = useState({
    date: "January 25, 2025",
    time: "3:00 PM - 6:00 PM",
    location: "Online",
  });

  // State variables for titles and section content
  const [whatYoullLearn, setWhatYoullLearn] = useState([
    "Why the CMA no longer delivers the insights you need in today’s competitive market",
    "How to reframe your approach to market analysis and client engagement",
    "The powerful tactics behind the 'Ground and Pound' strategy to get more listings",
    "How to build stronger relationships with clients and win more business than ever before",
    "Key actionable steps to take immediately to enhance your market positioning",
  ]);
  const [whoShouldAttend, setWhoShouldAttend] = useState([
    "Real Estate Professionals",
    "Investors",
    "New and Experienced Realtors",
  ]);

  // Editable section titles
  const [whatYoullLearnTitle, setWhatYoullLearnTitle] = useState("What You’ll Learn");
  const [whoShouldAttendTitle, setWhoShouldAttendTitle] = useState("Who Should Attend");

  // Handlers for updating state
  const handleDeadlineChange = (e) => setDeadline(e.target.value);
  const handleHeadlineChange = (e) => setHeadline(e.target.value);
  const handleEventDetailChange = (field, value) => {
    setEventDetails({ ...eventDetails, [field]: value });
  };
  const handleWhatYoullLearnChange = (index, value) => {
    const updatedLearnings = [...whatYoullLearn];
    updatedLearnings[index] = value;
    setWhatYoullLearn(updatedLearnings);
  };
  const handleWhoShouldAttendChange = (index, value) => {
    const updatedAttendances = [...whoShouldAttend];
    updatedAttendances[index] = value;
    setWhoShouldAttend(updatedAttendances);
  };

  const addLearning = () => setWhatYoullLearn([...whatYoullLearn, ""]);
  const removeLearning = (index) => {
    const updatedLearnings = whatYoullLearn.filter((_, i) => i !== index);
    setWhatYoullLearn(updatedLearnings);
  };

  const addAttendee = () => setWhoShouldAttend([...whoShouldAttend, ""]);
  const removeAttendee = (index) => {
    const updatedAttendances = whoShouldAttend.filter((_, i) => i !== index);
    setWhoShouldAttend(updatedAttendances);
  };

  const handleSave = async () => {
    const data = { 
      deadline, 
      headline, 
      eventDetails_date: eventDetails.date,
      eventDetails_time: eventDetails.time,
      eventDetails_location: eventDetails.location,
      whatYoullLearn, 
      whoShouldAttend, 
      whatYoullLearnTitle, 
      whoShouldAttendTitle
    };

    fetch("http://localhost:5000/event-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Updates saved successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to save updates. Please try again.',
        });
      }
    })
    .catch((error) => {
      console.error("Error saving updates:", error);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred',
        text: 'Please try again later.',
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const deadline = e.target.deadline.value;
    const headline = e.target.headline.value;
    const eventDetails_date = e.target.eventDetails_date.value;
    const eventDetails_time = e.target.eventDetails_time.value;
    const eventDetails_location = e.target.eventDetails_location.value;
    const title_1 = e.target.title_1.value;
    const title_2 = e.target.title_2.value;

    const whatYoullLearn = [...e.target.elements].filter(element => element.name === "what").map(element => element.value);
    const whoShouldAttend = [...e.target.elements].filter(element => element.name === "attendee").map(element => element.value);

    const data = {
      deadline,
      headline,
      eventDetails_date,
      eventDetails_time,
      eventDetails_location,
      whatYoullLearn,
      whoShouldAttend,
      title_1,
      title_2,
    };

    console.log("Form data:", data);

    Swal.fire({
      icon: 'info',
      title: 'Submitting your form...',
      showConfirmButton: false,
      timer: 2000,
    });

    // Add API call here if necessary
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Update Event Details */}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Event Deadline</label>
          <input
            type="text"
            defaultValue={deadline}
            name="deadline"
            onChange={handleDeadlineChange}
            className="w-full border border-gray-300 rounded-lg p-3"
          />

          <label className="block text-lg font-medium mt-4 mb-2">Event Headline</label>
          <input
            type="text"
            value={headline}
            name="headline"
            defaultValue={headline}
            onChange={handleHeadlineChange}
            className="w-full border border-gray-300 rounded-lg p-3"
          />

          <label className="block text-lg font-medium mt-4 mb-2">Event Date</label>
          <input
            type="text"
            name="eventDetails_date"
            defaultValue={eventDetails.date}
            value={eventDetails.date}
            onChange={(e) => handleEventDetailChange("date", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
          />

          <label className="block text-lg font-medium mt-4 mb-2">Event Time</label>
          <input
            type="text"
            name="eventDetails_time"
            defaultValue={eventDetails.time}
            value={eventDetails.time}
            onChange={(e) => handleEventDetailChange("time", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
          />

          <label className="block text-lg font-medium mt-4 mb-2">Event Location</label>
          <input
            type="text"
            name="eventDetails_location"
            defaultValue={eventDetails.location}
            value={eventDetails.location}
            onChange={(e) => handleEventDetailChange("location", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* Editable Title for "What You'll Learn" */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-4">Edit Section Title: What You’ll Learn</label>
          <input
            type="text"
            name="title_1"
            value={whatYoullLearnTitle}
            onChange={(e) => setWhatYoullLearnTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* "What You'll Learn" Section */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-4">{whatYoullLearnTitle}</label>
          {whatYoullLearn.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                name="what"
                defaultValue={item}
                value={item}
                onChange={(e) => handleWhatYoullLearnChange(index, e.target.value)}
                className="flex-grow border border-gray-300 rounded-lg p-3 mr-2"
              />
              <button
                type="button"
                onClick={() => removeLearning(index)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addLearning}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
          >
            Add Learning
          </button>
        </div>

        {/* Editable Title for "Who Should Attend" */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-4">Edit Section Title: Who Should Attend</label>
          <input
            type="text"
            name="title_2"
            defaultValue={whoShouldAttendTitle}
            value={whoShouldAttendTitle}
            onChange={(e) => setWhoShouldAttendTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* "Who Should Attend" Section */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-4">{whoShouldAttendTitle}</label>
          {whoShouldAttend.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                name="attendee"
                defaultValue={item}
                value={item}
                onChange={(e) => handleWhoShouldAttendChange(index, e.target.value)}
                className="flex-grow border border-gray-300 rounded-lg p-3 mr-2"
              />
              <button
                type="button"
                onClick={() => removeAttendee(index)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            name="title_2"
            onClick={addAttendee}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
          >
            Add Attendee
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold mb-6"
        >
          Save Updates
        </button>
      </form>

      {/* Registered Users */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
        <p className="text-lg mb-4">
          Total Users: <span className="font-bold">{users.length}</span>
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-50 border-collapse">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Registration Time</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    {new Date(user.registrationTime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
