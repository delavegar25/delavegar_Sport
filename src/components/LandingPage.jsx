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




   return (
    <div className='flex justify-center items-center min-h-screen min-w-screen bg-cover bg-center' style={{backgroundImage: `url('../src/assets/baller.jpg')`}}>
        <div className='mx-auto min-w-0'>
        <h1 className='text-center text-4xl relative bottom-40'>WorthSport</h1>
        <div className='flex flex-col border border-pink-100 rounded-2xl p-36 py-8 bg-black'>
        <button onClick={handleLoginClick} className='m-2 border rounded-t-full px-10 text-white hover:bg-blue-800'>Login</button>
        <button onClick={handleSignupClick} className='border rounded-t-full px-10 text-white hover:bg-blue-800'>Sign Up</button>
    </div>
    </div>
    </div>
   )

}

export default LandingPage;