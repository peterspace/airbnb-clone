import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import PlacesPage from './AdminPlacesPage';
import axios from 'axios';

import PlacesPage from './PlacesPage';
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
import { selectRole } from '../redux/features/auth/authSlice';
import { getUser } from '../services/authService';
// AccountPage

export default function ProfilePage() {
  const dispatch = useDispatch();

  useRedirectLoggedOutUser('/login'); // new
  const navigate = useNavigate()

  // const user = useSelector(selectUser);
  // const userId = useSelector(selectUserId);
  const [activeUser, setActiveUser] = useState({})

  const userRole = useSelector(selectRole);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [isUser, seiIsUser] = useState(false);

  useEffect(() => {
    if (userRole === 'Admin') {
      setIsAdmin(true);
    } else if (userRole === 'Agent') {
      setIsAgent(true);
    } else {
      seiIsUser(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, isAgent, isUser]);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout');
    navigate('/')
    dispatch(SET_LOGIN(false));
    dispatch(SET_USER({ user: null}));
  
  }

  // async function logout() {
  //   await logoutUser();
  //   dispatch(SET_LOGIN(false));
  //   // setRedirect('/');
  //   // setUser(null);
  // }

  useEffect(() => {
    console.log('Getting use');
    async function getUserData() {
      const data = await getUser();
      console.log(data);
      setActiveUser(data)
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

  

  return (
    <div>

      {isAdmin ? (
        <>
         <AdminNav />
         {subpage === 'profile' && (
           <div className="text-center max-w-lg mx-auto">
             Logged in as {activeUser?.name} ({activeUser?.email})<br />
             <button onClick={logout} className="primary max-w-sm mt-2">
               Logout
             </button>
           </div>
         )}
         {subpage === 'places' && <PlacesPage />}
        </>
        

      ):(
        <>
         <AccountNav />
         {subpage === 'profile' && (
           <div className="text-center max-w-lg mx-auto">
             Logged in as {activeUser?.name} ({activeUser?.email})<br />
             <button onClick={logout} className="primary max-w-sm mt-2">
               Logout
             </button>
           </div>
         )}
         {subpage === 'places' && <PlacesPage />}</>
  )
}
</div>
  )
}

