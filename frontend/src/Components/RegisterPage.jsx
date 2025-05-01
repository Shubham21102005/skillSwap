import React, { useState } from "react";
import axios from 'axios';
function RegisterPage() {

    const [email,setEmail]= useState('');
    const [name,setName]=useState('')
    const [password,setPassword]= useState('')
    const [error, setError] = useState('');
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
          const res = await axios.post('http://localhost:3000/auth/register', {
            name,
            email,
            password,
          });
          console.log('Successfully registered in');
        } catch (err) {
          console.error('Sign up failed:', err.response?.data?.message || err.message);
          setError(err.response?.data?.message || 'Sign up failed. Please try again.');
        }
      };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your details to sign up.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="#"
            className="font-semibold text-black hover:underline cursor-pointer"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
