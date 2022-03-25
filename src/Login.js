import React, { useState } from 'react'
import './Login.css'
import {Link, useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "./firebase";

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, setUser] = useState({});

    
    
    const signIn = async (e) => {
        e.preventDefault();
        try{
          const user = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          navigate("/");
        }catch(error){
          alert("cant't signin")
        }

    }

    const register = async (e) => {
        e.preventDefault();
        try{
        const user = await createUserWithEmailAndPassword(
          auth, 
          email,
          password
        );
        }catch(error){
          alert("can't register");
        }
    };


  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container">
        <h1 className='login__h1'>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

          <h5>Password</h5>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

          <button className='login__signInButton' onClick={signIn}>Sign In</button>

          </form>

          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
          
          <button onClick={register} className='login__registerButton'>Create Your Amazon Account</button>
    
      </div>
    </div>
  );
}

export default Login