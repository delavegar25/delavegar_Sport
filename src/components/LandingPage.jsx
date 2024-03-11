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
    <div className='flex justify-center items-center bg-slate-900 min-h-screen min-w-screen'>
        <div className='mx-auto min-w-0'>
        <h1 className='text-center text-4xl relative bottom-40 font-dancing'>WorthSport</h1>
        <div className='flex flex-col border border-pink-100 rounded-2xl p-36 py-8'>
        <button onClick={handleLoginClick} className='m-2'>Login</button>
        <button onClick={handleSignupClick} className=''>Sign Up</button>
    </div>
    </div>
    </div>
   )

}

export default LandingPage;