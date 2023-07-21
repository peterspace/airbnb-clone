import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getLoginStatus } from './services/authService';
import { SET_LOGIN } from './redux/features/auth/authSlice';
//==============={AIR}======================================================
import './App.css';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import ProfilePage from './pages/ProfilePage.jsx';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';
import AdminRegisterPage from './pages/AdminRegisterPage';


//==============={AIR}======================================================

// axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* AIR */}

        <Route path="/" element={<Layout />}>
          {/* Show to all */}
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Show on login */}
          <Route path="/account" element={<ProfilePage />} />
          {/* userOnly Routes */}
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          {/* Admin and  Agents Only can list and update listings */}
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />

          {/* AdminOnly Routes : my Listings */}
          <Route path="/register/admin" element={<AdminRegisterPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
