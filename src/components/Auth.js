import { auth, provider } from "../firebase-config.js";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { FaGoogle, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-elements">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`bg-circle circle-${i}`} />
        ))}
      </div>

      <div className="auth-content">
        <div className="auth-box">
          <div className="auth-header">
            <h1>Welcome to UniVibe</h1>
            <p>Connect with your university community</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <div className="auth-tabs">
            <button 
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={isLogin ? handleEmailLogin : handleSignUp}>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="University Email"
                required
              />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner"></span>
              ) : isLogin ? (
                "Login"
              ) : (
                <>
                  <FaUserPlus /> Sign Up
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button
            onClick={signInWithGoogle}
            className="google-auth-button"
            disabled={isLoading}
          >
            <FaGoogle className="google-icon" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};