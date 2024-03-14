import React, { useState } from "react";
import { FiEye, FiEyeOff } from 'react-icons/fi'; 


const LoginPage = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        // implement my authentication logic;
       
        // after succesful authentication you can redirect the user to the next page
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                    {showPassword ? <FiEye /> : <FiEyeOff/>}
                </button>
             </div>
                <button type="submit" className="w-full bg-green-800 text-white rounded-md py-2 px-4 hover:bg-green-400">Login</button>
        </form>
        </div>
    );
}

export default LoginPage;