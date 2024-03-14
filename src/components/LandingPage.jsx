import React, { useState } from 'react';
import backgroundImage from '../assets/gymmm.jpg'
import { Link } from 'react-router-dom';


const LandingPage = () => {
   return (
    <div className='flex justify-center items-center min-h-screen min-w-screen bg-cover bg-center' style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPositiion: 'center',}}>
        <div className='mx-auto min-w-0'>
        <h1 className='text-center text-6xl relative bottom-40 text-white font-whisper'>WorthSport</h1>
        <div className='flex flex-col border border-pink-100 relative rounded-2xl p-36 py-8 xs:rounded-md md:rounded-lg bg-black xs:bg-opacity md:bg-opacity-75 bg-opacity-75'>
        <Link to="/login" className='m-2 border rounded-full  relative px-6 py-3 xs:border xs:rounded-md xs:relative md:border md:rounded-lg md:relative text-white hover:bg-blue-800 text-xl'>Login                
        </Link>
        <Link to="/signup" className='border rounded-full relative px-6 py-3 xs:border xs:relative xs:rounded-md md:border md:rounded-lg md:relative text-white hover:bg-blue-800 text-xl'>Sign Up
        </Link>
    </div>
    </div>
    </div>
   )

}

export default LandingPage;