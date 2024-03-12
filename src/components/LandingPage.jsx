import React, { useState } from 'react';
import backgroundImage from '../assets/baller.jpg'

const LandingPage = () => {
    const [showLogin, setShowLogin ] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowSignup(false);
    };
  
    const handleSignupClick = () => {
        setShowSignup(true);
        setShowLogin(false);
    };


    const handleLoginSubmit = (event) =>  {
        event.preventDefault();
        // content here;
    }

    const handleSignupSubmit = (event) => {
        event.preventDefault();
        // sign up logic here
        // send a confirmation email to user
        // display a success message
    }



   return (
    <div className='flex justify-center items-center min-h-screen min-w-screen bg-cover bg-center' style={{backgroundImage: `url(${backgroundImage})`}}>
        <div className='mx-auto min-w-0'>
        <h1 className='text-center text-7xl relative bottom-40 text-white font-whisper'>WorthSport</h1>
        <div className='flex flex-col border border-pink-100 rounded-2xl p-36 py-8 xs:rounded-md md:rounded-lg bg-black xs:bg-opacity md:bg-opacity-75 bg-opacity-75'>
        <button onClick={handleLoginClick} className='m-2 border rounded-full relative px-6 py-3 xs:border xs:rounded-md xs:relative md:border md:rounded-lg md:relative text-white hover:bg-blue-800 text-xl'>Login</button>
        <button onClick={handleSignupClick} className='border rounded-full relative px-6 py-3 xs:border xs:relative xs:rounded-md md:border md:rounded-lg md:relative text-white hover:bg-blue-800 text-xl'>Sign Up</button>
    </div>
    </div>
    </div>
   )

}

export default LandingPage;