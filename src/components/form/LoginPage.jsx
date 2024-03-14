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
        <div className="bg-gray-900 min-h-screen relative">
        <div className="max-w-lg flex justify-center items-center">
        <h1 className="text-4xl text-center font-bold text-gray-500 relative left-32">Login</h1>
        <form onSubmit={handleLogin}>
            <div className="relative top-40">
                <label htmlFor="email" className="relative right-12 text-gray-500">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  className="relative right-12 text-black w-64 border rounded-xl"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
            </div>
             <div className="relative top-44">
                <label htmlFor="password" className="relative right-12 text-gray-500">Password:</label>
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  className="relative right-12 w-64 text-black border rounded-xl"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                type="button"
                className="relative right-20 top-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={togglePasswordVisibility}
                >
                    {showPassword ? <FiEyeOff /> : <FiEye/>}
                </button>
             </div>
                <button type="submit" className="relative top-60 text-gray-500 left-24 border border-gray-200 rounded-lg px-4">Login</button>
        </form>
        </div>
        </div>
    );
}

export default LoginPage;