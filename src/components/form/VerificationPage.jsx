import React, { useState } from 'react';
import VerificationForm from './VerificationForm';

const VerificationPage = ([ email ]) => {
   const [successMessage, setSuccessMessage] = useState('');

   const handleVerificationSuccess = (message) => {
       setSuccessMessage(message);
   };

   return (
      <div>
         {successMessage ? (
            <div>
               <h2>{successMessage}</h2>
               <Link to="/login">Login</Link> 
            </div>
         ) : (
            <VerificationForm emaol={email} onSuccess={handleVerificationSuccess} />
         )}
      </div>
   )
}

export default VerificationPage;