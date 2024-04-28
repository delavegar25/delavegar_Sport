import React, { useState } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const VerificationPage = () => {
   let navigate = useNavigate();
   const [verificationCode, setVerificationCode] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [cookies] = useCookies([])

   const handleVerification = async (event) => {
      event.preventDefault();
      setLoading(true);
      setError('');
      
      
      try {
         const response = await axios.post("http://localhost:5001/api/verify", { 'email': cookies.Email, 'code' :verificationCode }, {headers : {'Content-Type': 'application/json '}});
         
         // if verification is successful, redirect the user to login page
         navigate("/login", {replace:true});

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