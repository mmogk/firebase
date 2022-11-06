import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { useState }  from 'react';
import { auth } from '../firebase/firebase.config';


export default function Home() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

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

  const GoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    const authorization = auth;
    const result = await signInWithPopup(authorization, provider);

    console.log(result);
  }

  return (
    <div>
      <h3>Welcome to the app</h3>
      <div>
        <form>
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
      </div>
    </div>
  )
}
