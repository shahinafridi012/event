import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import sweetalert2

const EventLandingPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState({});
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMinutes] = useState(0);
  const [secs, setSeconds] = useState(0);

  const deadline = eventDetails?.deadline || "January 25, 2025"; // Use dynamic deadline from fetched data

  useEffect(() => {
    fetch("http://host:5000/save-event-details")
      .then(res => res.json())
      .then(data => {
        setEventDetails(data);
      });
  }, []);
  console.log(eventDetails)

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    if (time > 0) {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    } else {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
  };

  useEffect(() => {
    getTime(); // Calculate the countdown time when the component mounts
    const interval = setInterval(getTime, 1000);
    return () => clearInterval(interval); // Clear interval when the component unmounts
  }, [deadline]);

  const handleRegisterClick = () => {
    setIsPopupOpen(true);
  };

  const handleOverlayClick = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch values from the form inputs
    const formData = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
    };

    const registrationTime = new Date().toISOString();
    console.log("Registration Time: ", registrationTime);

    try {
      const response = await fetch("https://event-planner-server-w3vy.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, registrationTime }), // Send registration time along with form data
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Thank you for registering!",
          text: "Redirecting to Eventbrite.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href =
           eventDetails.webLink
        });
      } else {
        Swal.fire({
          title: "Error",
          text: data.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "An error occurred",
        text: "Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className=" p-20 mt-10">
      <header className="">
        <h1 className=" text-center text-4xl">
          {eventDetails?.headline || "Join Real Estate Expert Gina Hanson"}
        </h1>
        <p className="mt-2 text-xl text-center">
          {eventDetails?.date || "January 25, 2025"} |{" "}
          {eventDetails?.time || "3:00 PM - 6:00 PM"} |{" "}
          {eventDetails?.location || "Online"}
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <div className="text-center  border p-2">
            <h1 className="text-4xl font-bold">
              {days < 10 ? "0" + days : days}
            </h1>
            <span className="text-sm">Days</span>
          </div>
          <div className="text-center border p-2">
            <h1 className="text-4xl font-bold">
              {hours < 10 ? "0" + hours : hours}
            </h1>
            <span className="text-sm">Hours</span>
          </div>
          <div className="text-center border p-2">
            <h1 className="text-4xl font-bold">
              {mins < 10 ? "0" + mins : mins}
            </h1>
            <span className="text-sm">Minutes</span>
          </div>
          <div className="text-center border p-2">
            <h1 className="text-4xl font-bold">
              {secs < 10 ? "0" + secs : secs}
            </h1>
            <span className="text-sm">Seconds</span>
          </div>
        </div>
      </header>
      <div>
        <img  className="w-[300px] mx-auto mt-5" src={eventDetails.imageLink} alt="" />
      </div>

      <main className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">



        <section>
          <h2 className="text-2xl font-semibold text-blue-800 border-b-2 border-yellow-500 pb-2 mb-4">

          </h2>
          <p
            className="text-md"
            dangerouslySetInnerHTML={{
              __html: eventDetails?.description || "<p>Loading...</p>",
            }}
          />
        </section>

        <button
          onClick={handleRegisterClick}
          className="block w-full text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-lg py-4 rounded-lg mt-8 shadow-md hover:from-orange-500 hover:to-red-500 transition"
        >
          Register Now
        </button>
      </main>

      {isPopupOpen && (
        <>
          <div
            onClick={handleOverlayClick}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                Register for the Event
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-lg"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-lg"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventLandingPage;
