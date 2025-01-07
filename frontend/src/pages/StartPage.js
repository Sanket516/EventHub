import React from 'react';
import { Link } from 'react-router-dom';

const StartPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex flex-col items-center justify-center">
      <section className="text-center py-20 px-4">
        <h1 className="text-white text-6xl font-extrabold leading-tight mb-4">
          Welcome to EventHub
        </h1>
        <p className="text-lg text-white mb-6 max-w-2xl mx-auto">
          A seamless way to discover, organize, and manage events of all kinds.
          Join us to bring your events to life.
        </p>
        <div className="mt-8">
          <Link to="/login" className="bg-green-600 text-black px-8 py-3 rounded-md text-xl hover:bg-black hover:text-white">Get Started</Link>
        </div>
      </section>
    </div>
  );
};

export default StartPage;
