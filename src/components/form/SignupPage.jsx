import React, { useState } from "react";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from 'react-router-dom';


const SignupPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);


    const handleSignUp = async (event) => {
        event.preventDefault();
        // perform password complexity check
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/;
        if(!password.match(passwordRegex)){
            setPasswordError(true);
            return;
        } 

        // check if passwords match
        if (password !== confirmPassword) {
            setPasswordMatch(false);
            return;
        }

        setSuccessMessage(response.data.message);


        //perform backend authentication
        try {
          const response = await axios.post("/api/signup", {
             firstName,
             lastName,
             email,
             password
          });
          setSuccessMessage(response.data.message);


        // clear form fields after successful sign up
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPasswordError(false);
        setPasswordMatch(true);


        // redirect to verification page after successful signup
        history.push('/verify-email', { email });

        } catch (error){
            console.error("Signup failed:", error);
        }
    };

 
    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
           setPasswordVisible(!passwordVisible);
        }
        else if (field === 'confirmPassword'){
            setConfirmPasswordVisible(!confirmPasswordVisible);
        }
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
                    <div className="relative">
                    <input 
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-500"
                    required
                    />
                    <button 
                    type="button"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                    onClick={() => togglePasswordVisibility('password')}>
                        {passwordVisible ? <FiEyeOff/> : <FiEye/>}
                    </button>
                </div>
                 </div>

                <div className="mb-1">
                    <label htmlFor="confirmPassword" className="block mb-2">Confirm Password:</label>
                    <div className="relative">
                    <input 
                    type={confirmPasswordVisible ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                     setConfirmPassword(e.target.value);
                     setPasswordMatch(e.target.value === password);
                     }}
                    className={"w-full border ${passwordMatch ? 'border-gray-300' : 'border-red-500' } rounded-md px-3 py-3 focus:outline-none focus:border-blue-500"}
                    required
                    />
                    {!passwordMatch && <p className="text-red-500">Passwords do not match</p>}
                    <button
                    type="button"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                       onClick={() => togglePasswordVisibility('confirmPassword')}>
                      {confirmPasswordVisible ? <FiEyeOff/> : <FiEye/> }
                    </button>
                </div>
                </div>


                <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover-bg-blue-600">Create Account</button>
             </div>
            
             <Link to='/login' className="overflow-hidden block text-center text-blue-500 hover:underline mt-4">Already have an account? Login here</Link>
            </form>
        </div>
    );
}

export default SignupPage;