import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import PlacesPage from './AdminPlacesPage';

import PlacesPage from './PlacesPage';
import { useNavigate } from 'react-router-dom';
// import AgentPlacesPage from './AgentPlacesPage';

import AccountNav from '../AccountNav';
import AdminNav from '../AdminNav';
import {
  SET_LOGIN,
  SET_USER,
  SET_NAME,
} from '../redux/features/auth/authSlice';
import { logoutUser } from '../services/authService';
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser'; // new
// import { selectRole } from '../redux/features/auth/authSlice';
import { getUser } from '../services/authService';
// import axios from 'axios';
// AccountPage

export default function ProfilePage() {
  const dispatch = useDispatch();
  useRedirectLoggedOutUser('/login'); // new
  const [activeUser, setActiveUser] = useState({});
  // const userRole = useSelector(selectRole);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userRole, setUserRole] = useState('');

  // useEffect(() => {
  //   if (isLoggedIn === true) {
  //     axios.get('/users/findUser').then(({ data }) => {
  //       setUserRole(data.role);
  //       setActiveUser(data);
  //       // dispatch(SET_USER({ user: data }));
  //       // dispatch(SET_NAME({ name: data.name }));
  //     });
  //   }
  // }, [isLoggedIn]);

  // useEffect(() => {
  //   if (isLoggedIn === true) {

  //     setTimeout(() => {
  //       axios.get('/users/findUser').then(({ data }) => {
  //         setUserRole(data.role);
  //         setActiveUser(data);
  //         // dispatch(SET_USER({ user: data }));
  //         // dispatch(SET_NAME({ name: data.name }));
  //       });
  //     }, 2000);

  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    if (userRole === 'Admin') {
      setIsAdmin(true);
    } else if (userRole === 'Agent') {
      setIsAgent(true);
    } else {
      setIsUser(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, isAgent, isUser]);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  useEffect(() => {
    console.log('Getting use');
    async function getUserData() {
      const data = await getUser();
      console.log(data);
      setActiveUser(data);
      setUserRole(data.role);
      dispatch(SET_USER({ user: data }));
      dispatch(SET_NAME({ name: data.name }));
    }
    getUserData();
  }, [dispatch]);

  // useEffect(() => {
  //   if (!user) {
  //     getUser(userId);
  //     axios.get('/profile').then(({ data }) => {
  //       dispatch(SET_USER({ user: data }));
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  async function logout() {
    // setIsLoggedIn(true);
    await logoutUser();
    dispatch(SET_LOGIN(false));
    setTimeout(() => {
      navigate('/');
    }, 1000);
    // setIsLoggedIn(false);
    // setRedirect('/');
    // setUser(null);
  }

  return (
    <div>
      {isAdmin ? (
        <>
          <AdminNav />
          {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
              Logged in as {activeUser?.name} ({activeUser?.email})<br />
              <button
                onClick={logout}
                className="cursor-pointer primary max-w-sm mt-2"
              >
                Logout
              </button>
            </div>
          )}
          {subpage === 'places' && <PlacesPage />}
        </>
      ) : (
        <>
          <AccountNav />
          {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
              Logged in as {activeUser?.name} ({activeUser?.email})<br />
              <button
                onClick={logout}
                className="cursor-pointer primary max-w-sm mt-2"
              >
                Logout
              </button>
            </div>
          )}
          {subpage === 'places' && <PlacesPage />}
        </>
      )}
    </div>
  );
}
