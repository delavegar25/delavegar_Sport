import React, { useState } from 'react';
import axios from "axios";


const VerificationPage = () => {
   const [verificationCode, setVerificationCode] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   const handleVerification = async (event) => {
      event.preventDefault();
      setLoading(true);

      try {
         const response = await axios.post("/api/verify", { verificationCode });
         // if verification is successful, redirect the user to login page
         
         window.location.href = "/login";
      } catch (error) {
         setError("Invalid verification code. Please try again.");
      } finally {
         setLoading(false);
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
            placeholder='Enter 6 digit code'
            required   
            />
            <button type='submit' disabled={loading}>
               {loading ? "Verifying...": "Verify"}
            </button>
            {error && <p>{error}</p>}
         </form>
      </div>
   )
}
 

export default VerificationPage;