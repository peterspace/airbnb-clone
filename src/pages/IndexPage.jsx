import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Image from '../Image.jsx';
import { useNavigate } from 'react-router-dom';
import { getPlaces } from '../services/authService.js';
import PlacePage from './PlacePage.jsx';
// /place/:id

export default function IndexPage() {
  // const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [newPlace, setNewPlace] = useState({});
  const [showBooking, setShowBooking] = useState(false);
  const[showPlaceReady, setShowPlaceReady] =useState(false);
  const[showPlace, setShowPlace] =useState(false);
  // const [placeId, setPlaceId] = useState('');

  // useEffect(() => {
  //   axios.get('/places').then((response) => {
  //     setPlaces(response.data);
  //   });
  // }, []);

  useEffect(() => {
    getAllPlaces();
    // if(!newPlace){
    //   getAllPlaces();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  // useEffect(() => {
  //   // getAllPlaces();
  //   if(!newPlace){
  //     getAllPlaces();
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const getAllPlaces = async () => {
    // const data = await getPlaces();
    // setPlaces(data);

    getPlaces().then((response) => {
      setPlaces(response);
    });
  };

  // const handleSubmit = () => {
  //   console.log('generatedPlace', newPlace);
  //   // console.log('newPlaceId', newPlace._id);
  //   // e.preventDefault();
  //   // let id = newPlace._id;
  //   // console.log('newPlaceId', id);
  //   // navigate(`/place/${id}`);

  //   // setTimeout(() => {
  //   //   navigate(`/place/${id}`);
  //   // }, 1000);
  // };

  const handleSubmit = () => {
    console.log('generatedPlace', newPlace);
    setShowBooking(true);
    // if (newPlace === null || undefined || []) {
    //   return;
    // } else {
    //   setShowBooking(true);
    // }
  };

  useEffect(() => {
    if(showPlaceReady ===true){
      setShowPlace(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  // const handleSelect = () => {
  //   if(newPlace === null || undefined || []){
  //   // if(newPlace){
  //     let id = newPlace._id;
  //     console.log('newPlaceId', id);
  //     setShowBooking(true)
  //     setTimeout(() => {

  //     navigate(`/place/${id}`);
  //   }, 1000);
  //   }

  // };

  // const handleSelect = () => {
  //   if (newPlace === null || undefined || []) {
  //     return;
  //   } else {
  //     let id = newPlace._id;
  //     console.log('newPlaceId', id);
  //     setShowBooking(true);
  //     //   setTimeout(() => {

  //     //   navigate(`/place/${id}`);
  //     // }, 1000);
  //   }
  // };

  const handleSelect = () => {
    if (showBooking === true) {
      let id = newPlace._id;
      console.log('newPlaceId', id);
      // navigate(`/place/${id}`);
      setShowBooking(false);
      setShowPlaceReady(true)
      // setTimeout(() => {
      //   console.log('newPlaceId', id);
      //   navigate(`/place/${id}`);
      //   setShowBooking(false);
      // }, 1000);
    }
  };

  return (
    <>
    {showPlace ? (
      <PlacePage place={newPlace}/>

    ):(
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {places &&
        places?.map((place, index) => (
          <div
            className="cursor-pointer"
            key={index}
            onClick={() => {
              setNewPlace(place);
              handleSubmit();
            }}
          >
            {/* <Link to={'/place/' + place._id} key={index}> */}
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <Image
                  className="rounded-2xl object-cover aspect-square"
                  src={place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
            {/* {showBooking === true ? ( */}
            {showBooking && (
              <div className="mt-4">
                <button
                  className="cursor-pointer"
                  onClick={() => handleSelect()}
                >
                  <span className="px-2 py-2 text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-700">
                    Book
                  </span>
                </button>
              </div>
            )}
            {/* ) : null} */}
          </div>
        ))}
    </div>

    )}
    
    
    </>
    
  );
}
