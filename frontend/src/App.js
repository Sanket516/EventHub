import { React, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventCreatePage from './pages/EventCreatePage';
import BookingPage from './pages/BookingPage';
import BookPage from './pages/BookPage';
import StartPage from './pages/StartPage';
import NotFound from './pages/NotFound';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { isAuthenticated, userId } = useContext(AuthContext);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/eventcreate" element={isAuthenticated ? <EventCreatePage /> : <StartPage />} />
        <Route path="/book/:id" element={isAuthenticated ? <BookPage /> : <StartPage />} />
        <Route path="/bookings" element={isAuthenticated ? <BookingPage userId={userId} /> : <StartPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
