import React, { useState } from 'react';

const LandingPage = () => {
    const [showLogin, setShowLogin ] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowSignup(true);
    };
  
    const handleSignupClick = () => {
        setShowSignup(true);
        setShowLogin(true);
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
    <div className='flex justify-center items-center min-h-screen min-w-screen bg-cover bg-center' style={{backgroundImage: `url('../src/assets/baller.jpg')`}}>
        <div className='mx-auto min-w-0'>
        <h1 className='text-center text-7xl relative bottom-40 text-white font-whisper'>WorthSport</h1>
        <div className='flex flex-col border border-pink-100 rounded-2xl p-36 py-8 bg-black bg-opacity-75'>
        <button onClick={handleLoginClick} className='m-2 border rounded-t-full px-10 text-white hover:bg-blue-800 font-whisper text-3xl'>Login</button>
        <button onClick={handleSignupClick} className='border rounded-t-full px-10 text-white hover:bg-blue-800 font-whisper text-3xl'>Sign Up</button>
    </div>
    </div>

    
    </div>
   )

}

export default LandingPage;