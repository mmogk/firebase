import React from 'react';
import { useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

export default function Home() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({})

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
  }, []) 

  const register = async () => {
    try {
      setRegisterEmail("");
      setRegisterPassword("");
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log(user);
    } catch(error) {
      console.log(error.message)
    }
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user);
    } catch(error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth);
  }


  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h3 className="text-3xl text-sky-400 font-bold underline absolute top-0 p-4">Welcome To The App</h3>
      <div className="grid grid-cols-3 gap-4">
        <form>
          <h2>Register:</h2>
          <div className="border-2 p-2 m-2">
            <div className="pb-4">
              <label>Email</label>
              <input placeholder="Email..."
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
                className="flow-root m-2 p-2"
              />
              <label>Password</label>
              <input placeholder="Password..."
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
                className="flow-root m-2 p-2"
              />
            </div>
            <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800" onClick={register}>Register User</button>
          </div>
        </form>

        <form>
          <h2>Login</h2>
          <div className="border-2 p-2 m-2">
            <div className="pb-4">
              <label>Email</label>
              <input placeholder="Email..." 
                onChange={(event) => {
                  setLoginEmail(event.target.value);
                }}
                className="flow-root m-2 p-2"
              />
              <input placeholder="Password..."
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
                className="flow-root m-2 p-2"
              /> 
              </div>
            <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800" onClick={login}> Login</button>
          </div>
        </form>

        <div className="relative">
          <h2>User Logged In:</h2>
            <div className="flow-root m-2 p-2">
              {user?.email}
            </div>
          <button  type="button" className="absolute right-0 bottom-0 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800" onClick={logout}> Sign Out </button>
        </div>
      </div>
    </div>
  )
}
