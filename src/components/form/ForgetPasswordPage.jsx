import { useState } from "react";

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    }


    return (  
        <div className="bg-gray-900 min-h-screen flex justify-center items-center relative">
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">Forget Password</h2>
                <div className="mb-1">
                    <label htmlFor="email" className="block mb-2 text-gray-200">
                       Email Address:
                    </label>

                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-800 text-white rounded-md py-2 px-4 hover:bg-blue-900">Submit</button>
            </form>

        </div>
    );
}
 
export default ForgetPasswordPage;