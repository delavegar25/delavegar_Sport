import React, { useState } from 'react';
import axios from 'axios';

const VerificationForm = ({ email, onSuccess }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');

    const handleVerification = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/verify-email', { email, code: verificationCode });
            onSuccess(response.data.message);
        } catch (error) {
            setError('Invalid verification code. Please try again.');
        }
    };

    return (
        <div>
            <h2>Enter Verification Code</h2>
            <form onSubmit={handleVerification}>
               <input 
               type="text"
               value={verificationCode}
               onChange={(e) => setVerificationCode(e.target.value)}
               placeholder='Enter verification code'
               required 
               />
               <button type='submit'>Verify</button>
               {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default VerificationForm;