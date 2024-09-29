// register code here
import React, { useState } from 'react'
import { useMutation } from 'react-query';
import userRegister from '../services/userRegister';
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Register = ({setShowRegister}) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigator = useNavigate();


  const mutation = useMutation(userRegister, {
    onSuccess : (data) => {
      console.log(data);
    },

    onError : (data)=> {
      console.log(data);
    }
  })

  function handleRegister(e){
    e.preventDefault();
    if (password == confirmPassword){
      mutation.mutate({username, email, password});
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        window.location.reload();
      }, 1500)
    }
  }

    return (
        <div className="flex justify-center items-center h-screen bg-base-200">
        <div className="w-full relative max-w-md p-8 bg-base-100 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-neutral-content">Register</h2>

          {mutation.isSuccess && <div className='h-full bg-base-100 top-0 w-full absolute right-0 grid place-content-center text-center'>
            <div className='flex flex-col items-center justify-center gap-4 pop-animation'>
            <div className='h-24 w-24 rounded-full bg-green-600 grid place-content-center'>
              <FaThumbsUp className='text-4xl text-white' />
            </div>
              <p className='text-5xl text-white' >Success</p>
            </div>

          </div>}

          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-neutral-content" htmlFor="username">
                Username
              </label>
              <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                id="username"
                className="input input-bordered w-full"
                placeholder="Enter your username"
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-neutral-content" htmlFor="email">
                Email
              </label>
              <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-neutral-content" htmlFor="password">
                Password
              </label>
              <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-neutral-content" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="input input-bordered w-full"
                placeholder="Confirm your password"
              />
            </div>
            
            {mutation.isError && (
            <p className="text-red-500">{mutation.error.response.data.error}</p>
          )}
            <button
            type="submit"
              className="btn btn-primary w-full mt-4"
              onClick={handleRegister}
            >
             { mutation.isLoading ? "Registering.." : "Register"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-neutral-content">
          Already have account?{" "}
          <a className="text-primary" onClick={() => setShowRegister(false)}>
            Login
          </a>
        </p>
        </div>
      </div>
    )
}

export default Register