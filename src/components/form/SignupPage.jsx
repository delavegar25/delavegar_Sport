import React, { useState } from 'react';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSignupSubmit = (event) => {
        event.preventDefault();
        // code here
        console.log('Email:', email);
        console.log('Password', password);
    };

    return(
        <div>
            <form onSubmit={handleSignupSubmit}>
              <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type='submit'>Sign Up</button>
            </form>
            <Link to='/signup'></Link>
        </div>
    )
}

export default SignupPage;