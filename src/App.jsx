import React, { useState } from 'react';

const EventLandingPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsPopupOpen(true);
  };

  const handleOverlayClick = () => {
    setIsPopupOpen(false);
  };
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMinutes] = useState(0);
  const [secs, setSeconds] = useState(0);

  const deadline = "January 25, 2025";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for registering! Redirecting to Eventbrite.');
    window.location.href = 'https://www.eventbrite.com/e/the-apex-agent-tickets-1198650107739?aff=oddtdtcreator';
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-purple-100 min-h-screen font-sans text-gray-800">
      <header className="bg-blue-800 text-white text-center py-10 shadow-lg">
        <h1 className="text-4xl font-bold drop-shadow-md">Join Real Estate Expert Gina Hanson</h1>
        <p className="mt-2 text-xl">January 25, 2025 | 3:00 PM - 6:00 PM | Online</p>
      </header>

      <main className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 border-b-2 border-yellow-500 pb-2 mb-4">What You’ll Learn</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Why the CMA no longer delivers the insights you need in today’s competitive market</li>
            <li>How to reframe your approach to market analysis and client engagement</li>
            <li>The powerful tactics behind the "Ground and Pound" strategy to get more listings</li>
            <li>How to build stronger relationships with clients and win more business than ever before</li>
            <li>Key actionable steps to take immediately to enhance your market positioning</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-blue-800 border-b-2 border-yellow-500 pb-2 mb-4">Who Should Attend</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Real estate professionals looking to gain a competitive edge</li>
            <li>Agents who want to understand the evolving landscape of real estate marketing and client acquisition</li>
            <li>Brokers and team leaders aiming to stay ahead of industry trends</li>
          </ul>
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
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Register for the Event</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-lg"
                />
                <input
                  type="email"
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