import React from 'react';
import {  signInWithPopup, 
          GoogleAuthProvider, 
          createUserWithEmailAndPassword, 
          onAuthStateChanged, 
          signInWithEmailAndPassword,

        } from "firebase/auth";
import { useState }  from 'react';
import { auth } from '../firebase/firebase.config';


export default function Home() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

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
      console.log(error.message);
    }
  }



  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
  }, [])

  const GoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    const authorization = auth;
    const result = await signInWithPopup(authorization, provider);

    console.log(result);
  }

  const handleSubmit = event => {
    console.log("handle submit rand")
    event.preventDefault();
    event.target.reset();
  }

  return (
    <div>
      <h3>Welcome to the app</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div>
            <div>
              <label>Email</label>
              <input
                placeholder="Email..."
                onChange={(event) => {
                  setRegisterEmail(event.target.value)
                }}
              />
              <label>Password</label>
              <input
                placeholder="Password..."
                onChange={(event) => {
                  setRegisterPassword(event.target.value)
                }}
              />
            </div>
            <button onClick={register}>Register User</button>
            <button onClick={() => GoogleSignIn()}>Log In With Google</button>
          </div>
        </form>

        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div>
            <div>
              <label>Email</label>
              <input
                placeholder="Email..."
                onChange={(event) => {
                  setLoginEmail(event.target.value)
                }}
              />
              <label>Password</label>
              <input
                placeholder="Password..."
                onChange={(event) => {
                  setLoginPassword(event.target.value)
                }}
              />
            </div>
            <button onClick={login}>Login User</button>
          </div>
        </form>

        <div>
          <h2>User Logged in:</h2>
          <div>
            {user?.email}
          </div>
        </div>
      </div>
    </div>
  )
}
