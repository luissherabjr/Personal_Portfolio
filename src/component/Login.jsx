import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login({setUser}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/admin/dashboard'); // redirect after login
    } catch (error) {
      alert("login failed:" + error.message);
    }
  };
  const handleResetPassword = async () => {
    if (!email) {
      return alert("Enter your email first to reset link.");
    }
    try {
      await sendPasswordResetEmail(auth,email);
      alert ("Password reset email sent!");
    } catch (error) {
      alert("failed to send reset email: " + error.message);
    }
  };

  return (
    <>
      <form onSubmit={login} className="bg-gray-800 text-white p-4 rounded shadow w-80 mx-auto mt-10">
        <h2 className="text-lg mb-4 text-center font-bold">LogIn</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-3 p-2 text-black border border-gray-300 rounded"
          autoComplete="username" required
        />
        <div className='w-full mb-3 flex border border-gray-300 rounded overflow-hidden bg-white'>
            <input
            type={showPassword? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="flex-grow p-2 text-black border border-gray-300 rounded"
            autoComplete="current-password" required/>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 text-xs text-gray-600 hover:text-black border-l border-gray-300 rounded"
              >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
       
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded w-full">
          Login
        </button>

        <button
          type="button"
          onClick={handleResetPassword}
          className="text-xs text-blue-300 hover:underline block text-center w-full mt-2"
        >
          Forgot password?
        </button>
      </form>
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow p-6 w-80 text-center'>
          <h3 className='text-lg font-semibold mb-3 text-black'> Password Reset Email Sent.</h3>
          <p>Please check your inbox and follow the instruction to reset your password</p>
          <button onClick={() => setShowModal(false)} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
