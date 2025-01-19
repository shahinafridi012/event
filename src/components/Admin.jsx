import React, { useEffect, useState } from "react";

const Admin = () => {
  // State variables for event details
  const [deadline, setDeadline] = useState("January 25, 2025");
  console.log(deadline)
  const [headline, setHeadline] = useState(
    "Join Real Estate Expert Gina Hanson"
  );
  console.log(headline)
  const [eventDetails, setEventDetails] = useState({
    date: "January 25, 2025",
    time: "3:00 PM - 6:00 PM",
    location: "Online",
  });
  const [whatYoullLearn, setWhatYoullLearn] = useState([
    "Why the CMA no longer delivers the insights you need in today’s competitive market",
    "How to reframe your approach to market analysis and client engagement",
    "The powerful tactics behind the \"Ground and Pound\" strategy to get more listings",
    "How to build stronger relationships with clients and win more business than ever before",
    "Key actionable steps to take immediately to enhance your market positioning",
  ]);

  // State variables for users
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch users from localStorage or a data source
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    setUsers(storedUsers);
    setTotalUsers(storedUsers.length);
  }, []);

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
  const addLearning = () => setWhatYoullLearn([...whatYoullLearn, ""]);
  const removeLearning = (index) => {
    const updatedLearnings = whatYoullLearn.filter((_, i) => i !== index);
    setWhatYoullLearn(updatedLearnings);
  };

  const handleSave = () => {
    alert("Updates saved successfully! Ensure to implement backend persistence.");
    // Backend API call to save event details would go here.
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Update Event Details */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Event Deadline</label>
        <input
          type="text"
          value={deadline}
          onChange={handleDeadlineChange}
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        <label className="block text-lg font-medium mt-4 mb-2">Event Headline</label>
        <input
          type="text"
          value={headline}
          onChange={handleHeadlineChange}
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        <label className="block text-lg font-medium mt-4 mb-2">Event Date</label>
        <input
          type="text"
          value={eventDetails.date}
          onChange={(e) => handleEventDetailChange("date", e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        <label className="block text-lg font-medium mt-4 mb-2">Event Time</label>
        <input
          type="text"
          value={eventDetails.time}
          onChange={(e) => handleEventDetailChange("time", e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        <label className="block text-lg font-medium mt-4 mb-2">Event Location</label>
        <input
          type="text"
          value={eventDetails.location}
          onChange={(e) => handleEventDetailChange("location", e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3"
        />
      </div>

      {/* Update "What You'll Learn" Section */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-4">What You’ll Learn</label>
        {whatYoullLearn.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) => handleWhatYoullLearnChange(index, e.target.value)}
              className="flex-grow border border-gray-300 rounded-lg p-3 mr-2"
            />
            <button
              onClick={() => removeLearning(index)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addLearning}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
        >
          Add Learning
        </button>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold mb-6"
      >
        Save Updates
      </button>

      {/* Registered Users */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
        <p className="text-lg mb-4">
          Total Users: <span className="font-bold">{totalUsers}</span>
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
