import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from 'react-router-dom';

const SignupPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const handleSignUp = (event) => {
        event.preventDefault();
        // perform password complexity check
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/;
        if(!password.match(passwordRegex)){
            setPasswordError(true);
            return;
        } 

        // perform authentication

        // clear form fields after successful sign up
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPasswordError(false);
    };

 

    const togglePasswordVisibility = () => {
        setPassword(!password);
        setConfirmPassword(!confirmPassword);
    }

    return (
        <div className="min-h-screen bg-gray-900 flex justify-center items-center relative">
            <form onSubmit={handleSignUp} className="max-w-md w-full bg-gray-600 p-8 rounded-lg">
                <h2 className="text-4xl font-bold mb-4">
                    Sign Up
                </h2>
                <div className="mb-1">
                    <label htmlFor="firstName" className="block mb-2">First Name:</label>
                    <input 
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-500"
                    required
                    />

                <div className="mb-1">
                    <label htmlFor="lastName" className="block mb-2">Last Name:</label>
                    <input 
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-500"                    
                    required
                    />
                </div>

                <div className="mb-1">
                    <label htmlFor="email" className="block mb-2">Email Address:</label>
                    <input 
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-500"
                    required
                    />
                </div>

                <div className="mb-1">
                    <label htmlFor="password" className="block mb-2">Password:</label>
                    <input 
                    type={password ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-500"
                    required
                    />
                    <button 
                    type="button"
                    className="relative bottom-6 left-80 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                    onClick={togglePasswordVisibility}>
                        {password ? <FiEye/> : <FiEyeOff/>}
                    </button>
                </div>

                <div className="mb-1">
                    <label htmlFor="confirmPassword" className="block mb-2">Confirm Password:</label>
                    <input 
                    type={password ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-500"
                    required
                    />
                    <button
                    type="button"
                    className="relative bottom-6 left-80 transform -translate-y-1/2 text-gray-500 focus:outline-none">
                      {confirmPassword ? <FiEye/> : <FiEyeOff/> }
                    </button>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover-bg-blue-600">Create Account</button>
             </div>
             <Link to='/login' className="block text-center text-blue-500 hover:underline">Already have an account? Login here</Link>
            </form>
        </div>
    );
}

export default SignupPage;