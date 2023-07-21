import { useEffect, useState } from 'react';
// import { differenceInCalendarDays } from 'date-fns';
import { differenceInCalendarDays, format } from 'date-fns';
// import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';

import axios from 'axios';
import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUser, selectUserId } from './redux/features/auth/authSlice';
import { createBooking } from './services/authService';

import { findUser } from './services/authService';

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');

  const [currentUser, setCurrentUser] = useState({});
  // const { user } = useContext(UserContext);
  // const user = useSelector(selectUser);

  //=============={Approach}========================

  // const start = new Date(startDate);
  // const end = new Date(endDate);

  // const date = new Date(start.getTime());

  //=============={Approach}========================

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
    }
  }, [currentUser]);

  useEffect(() => {
    GetCurrentUser();
  }, []);

  async function GetCurrentUser() {
    const data = await findUser();
    console.log(data);
    console.log('userInfo:', data);
    setCurrentUser(data);
  }

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
    //  console.log("checkIn", checkIn)
  }






  //==========={Approach 2}===========================

  async function bookThisPlace() {
    const userData = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
      // userId: currentUser._id,
    };
    // console.log(' checkIn:', userData.checkIn);
    // console.log(' checkOut:', userData.checkOut);
    // console.log(' numberOfGuests:', userData.numberOfGuests);
    // console.log(' name:', userData.name);
    // console.log(' phone:', userData.phone);
    // console.log(' place:', userData.place);
    // console.log(' price:', userData.price);

    // console.log('userBookingdata', userData);
    const data = await createBooking(userData);
    if (data) {
      // console.log('bookingInfo', data);
      const bookingId = data._id;
      console.log('bookingId:', bookingId);

      setTimeout(() => {
        setRedirect(`/account/bookings/${bookingId}`);
      }, 2000);
    }
  }



  //==========={Original}=========================

  // async function bookThisPlace() {
  //   const response = await axios.post('/bookings', {
  //     checkIn,
  //     checkOut,
  //     numberOfGuests,
  //     name,
  //     phone,
  //     place: place._id,
  //     price: numberOfNights * place.price,
  //   });
  //   const userData = response.data;
  //   console.log('userBookingdata', userData);
  //   const bookingId = response.data._id;
  //   // setRedirect(`/account/bookings/${bookingId}`);
  // }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}
