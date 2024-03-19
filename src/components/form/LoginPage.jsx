import React, { useState } from "react";
import { FiEye, FiEyeOff } from 'react-icons/fi'; 
import { Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

const LoginPage = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        // implement my authentication logic;
        // after succesful authentication you can redirect the user to the next page
        // check if reCaptcha is verified
        if(!isCaptchaVerified){
            alert("Please verify that you are not a robot.");
            return;
        }

        // check if "Remember me" is checked
        if(rememberMe) {
          // store user credientials or token in localStorage
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        }
        else {
           // clear stored creientials if "Remember me" is unchecked
           localStorage.removeItem('email');
           localStorage.removeItem('password');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    }
   
    const handleCaptchaChange = (value) => {
        setIsCaptchaVerified(true);
    }

    
    return (
        <div className="bg-gray-900 min-h-screen flex justify-center items-center relative">
        <form onSubmit={handleLogin} className="max-w-md w-full bg-gray-600 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <div className="mb-1">
                <label htmlFor="email" className="block mb-2">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
            </div>
             <div className="mb-1"> 
               <label htmlFor="password" className="block mb-2">Password:</label>
                   
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                type="button"
                className="relative bottom-6 left-80 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={togglePasswordVisibility}
                >
                    {showPassword ? <FiEyeOff/> : <FiEye/>}
                </button>  
             </div>

             <ReCAPTCHA 
               sitekey="Your-site-key"
               onChange={handleCaptchaChange}
               className="mb-4"
             />


            <div className="flex items-center mb-4">
                <input 
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="mr-2"
                 />
                <label htmlFor="rememberMe">Remember me</label>
                </div>

                <div className="flex justify-between mb-4">
                <button type="submit" className="w-full bg-green-800 text-white rounded-md py-2 px-4 hover:bg-green-400">Login</button>
                <Link to="/forget-password" className="text-blue-600 relative left-4 hover:underline">Forget Password?</Link>
               </div>
        </form>
        </div>
    );
}

export default LoginPage;