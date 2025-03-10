
import React, { useState, useContext } from 'react';
import classes from "./signUp.module.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../Utility/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ClipLoader } from 'react-spinners';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { type } from '../../Utility/action.type';


function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const [{ user }, dispatch] = useContext(DataContext); 

  const navigate = useNavigate();
  const navStateData = useLocation()



  const authHandler = async (e) => {
    e.preventDefault(); 
   

    if (e.target.name === 'signin') {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: type.SET_USER, user: userInfo.user });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect ||"/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: type.SET_USER, user: userInfo.user });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect ||"/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to={'/'}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/1200px-Amazon_2024.svg.png" alt="Amazon logo" />
      </Link>

      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small style={{
            padding:'5px',
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}>
            {navStateData?.state?.msg}

          </small>
        )}
        
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id='email' />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id='password' />
          </div>

          <button type='submit' onClick={authHandler} name='signin' className={classes.login__signInBtn}>
            {loading.signIn ? (<ClipLoader color="#ffa006" size={15} />) : ("Sign in")}
          </button>
        </form>
        
        <p>
          By signing in, you agree to our Terms of Use and Privacy Policy while acknowledging that this is a Fake AMAZON CLONE website for educational purposes only. This site does not process real transactions or store sensitive user data.
        </p>

        <button type='submit' onClick={authHandler} name='signup' className={classes.login__registerBtn}>
          {loading.signUp ? (<ClipLoader color="#ffa006" size={15} />) : ("Create your Amazon Account")}
        </button>
        
        {error && <small style={{ paddingTop: '5px', color: 'red' }}>{error}!</small>}
      </div>
    </section>
  );
}

export default Auth;
