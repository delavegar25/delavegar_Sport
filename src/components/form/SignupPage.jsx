import React, { useState } from "react";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link,  useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";



const SignupPage = () => {
    let navigate = useNavigate();
    const [firstName, setFirstName] = useState('Kingi');
    const [lastName, setLastName] = useState('lords');
    const [email, setEmail] = useState('lordsokings@as.com');
    const [password, setPassword] = useState('6f_£4hgbnbh2132435465ASDFG');
    const [confirmPassword, setConfirmPassword] = useState('6f_£4hgbnbh2132435465ASDFG');
    const [passwordError, setPasswordError] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies([])

    const validatePassRegex = ()=> {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/;
            if(!password.match(passwordRegex)){
                setPasswordError(true);
                return 
            } 
    }
    
    const handleSignUp = async (event) => {
        event.preventDefault();
        // set loading state to true
        setLoading(true);

        // simulate loading for 5 seconds
        console.log('here')
        setTimeout(async () => {
            
            
            // check if passwords match
            if (password !== confirmPassword) {
                setPasswordMatch(false);
                return;
            }

            //perform backend authentication
          
            try {
                
                let data = {'firstName': firstName , 'lastName': lastName, 'email': email, 'password': password}
                await axios.post("http://localhost:5001/api/signup",  data,  {headers : {'Content-Type': 'application/json '}})
                .then((response) => {
                    setSuccessMessage(response.data.message);

                }).then(()=>{
                    setCookie('Email',email, { path: '/', maxAge: 300})
                    setCookie('Password', password, {path: '/', maxAge:300} )
                });

                // clear form fields after successful sign up
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setPasswordError(false);
                setPasswordMatch(true);
                


                // redirect to verification page after successful signup
                navigate('/verify', {replace:true});

                // send verification email
                //await axios.post("/api/send-verification-email", { email });     
            

            } catch (error){
                console.error("Signup failed:", error);
            } finally {
                setLoading(false);
                
            }
        }, 2000); // 5 seconds
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
                    
                    
                    onBlur={()=> validatePassRegex()}
                    onChange={(e)=>  setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-500"
                    required
                    />
                    {passwordError ? "Weak  A$$ bitch": null}
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

                
                <button 
                
                type="submit" 
                className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover-bg-blue-600">
                {loading ? "Creating Account..." : "Create Account" }
                    </button>
                {loading && <p>Loading...</p>}    
             </div>
            
             <Link to='/login' className="overflow-hidden block text-center text-blue-500 hover:underline mt-4">Already have an account? Login here</Link>
            </form>
        </div>
    );
}

export default SignupPage;