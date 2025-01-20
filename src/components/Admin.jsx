import React, { useState, useEffect } from "react";
import { Editor } from "primereact/editor";
import Swal from "sweetalert2";

const Admin = () => {
  const [users, setUsers] = useState([]); // State for users
  const [headline, setHeadline] = useState("Join Real Estate Expert Gina Hanson");
  const [deadline, setDeadline] = useState("January 25, 2025");
  const [eventDetails, setEventDetails] = useState({
    date: "January 25, 2025",
    time: "3:00 PM - 6:00 PM",
    location: "Online",
  });
  const [editorContent, setEditorContent] = useState(""); // State for rich text content
  const [imageLink, setImageLink] = useState("https://i.ibb.co.com/rkrgd7C/veranstaltungen-immobilienbranche.jpg"); // State for image link
  const [webLink, setWebLink] = useState("https://www.eventbrite.com/e/the-apex-agent-tickets-1198650107739?aff=oddtdtcreator"); // State for web link

  // Fetch registered users
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleLink = () => {
    // Construct the link object with image and web link values
    const link = {
      image: imageLink,
      link: webLink,
    };
    console.log(link);
    return link;
  };

  const handleSave = () => {
    const linkData = handleLink();
    const data = {
      headline,
      deadline,
      location: eventDetails.location,
      date: eventDetails.date,
      time: eventDetails.time,
      editorContent,
      imageLink: linkData.image,
      webLink: linkData.link,
    };

    fetch("http://localhost:5000/save-event-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Details saved successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to save details. Please try again.",
          });
        }
      })
      .catch((error) => {
        console.error("Error saving details:", error);
        Swal.fire({
          icon: "error",
          title: "An error occurred",
          text: "Please try again later.",
        });
      });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Event Details */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Event Deadline</label>
        <input
          type="text"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        <label className="block text-lg font-medium mt-4 mb-2">Event Headline</label>
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        <label className="block text-lg font-medium mt-4 mb-2">Event Date</label>
        <input
          type="text"
          value={eventDetails.date}
          onChange={(e) =>
            setEventDetails({ ...eventDetails, date: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        <label className="block text-lg font-medium mt-4 mb-2">Event Time</label>
        <input
          type="text"
          value={eventDetails.time}
          onChange={(e) =>
            setEventDetails({ ...eventDetails, time: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        <label className="block text-lg font-medium mt-4 mb-2">Event Location</label>
        <input
          type="text"
          value={eventDetails.location}
          onChange={(e) =>
            setEventDetails({ ...eventDetails, location: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg p-3"
        />
      </div>

      {/* Rich Text Editor */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Event Description</label>
        <Editor
          value={editorContent}
          onTextChange={(e) => setEditorContent(e.htmlValue)}
          style={{ height: "320px" }}
        />
      </div>

      {/* Image and Web Link Inputs */}
      <div className="mb-6">
        <input
          type="text"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
          placeholder="Image Link"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />
        <input
          type="text"
          value={webLink}
          onChange={(e) => setWebLink(e.target.value)}
          placeholder="Web Link"
          className="w-full border border-gray-300 rounded-lg p-3"
        />
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
