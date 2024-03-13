import React, { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        // implement my authentication logic;
        // display the email and password to console.

        console.log('Email:', email);
        console.log('Password:', password);
        // after succesful authentication you can redirect the user to the next page
    };

    return (
        <div className="bg-gray-900 min-h-screen relative">
        <div className="flex justify-center items-center">
        <h1 className="text-3xl text-center font-bold">Login</h1>
        <form onSubmit={handleLogin}>
            <div className="relative top-40">
                <label htmlFor="email" className="relative right-32">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  className="relative right-28"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
            </div>
             <div className="relative top-48">
                <label htmlFor="password" className="relative right-32">Password:</label>
                <input 
                  type="password"
                  id="password"
                  value={password}
                  className="relative right-28"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
             </div>
                <button type="submit" className="relative top-60 right-32 border border-gray-500 rounded-lg px-4">Login</button>
        </form>
        </div>
        </div>
    );
}

export default LoginPage;