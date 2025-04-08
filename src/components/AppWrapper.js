import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Import generic user icon

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const [showProfile, setShowProfile] = useState(false);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1>UniVibe</h1>
        {isAuth && (
          <div className="profile-section">
            <div className="profile-icon" onClick={toggleProfile}>
              {auth.currentUser?.photoURL ? (
                <img 
                  src={auth.currentUser.photoURL} 
                  alt="Profile" 
                  className="profile-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <FaUserCircle className="generic-user-icon" />
              )}
            </div>
            {showProfile && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  {auth.currentUser?.photoURL ? (
                    <img 
                      src={auth.currentUser.photoURL} 
                      alt="Profile" 
                      className="dropdown-profile-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.querySelector('.generic-user-icon-large').style.display = 'block';
                      }}
                    />
                  ) : (
                    <FaUserCircle className="generic-user-icon-large" />
                  )}
                  <div className="profile-details">
                    <h3>{auth.currentUser?.displayName || 'User'}</h3>
                    <p>{auth.currentUser?.email || ''}</p>
                  </div>
                </div>
                <button onClick={signUserOut} className="dropdown-signout-button">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="app-container">{children}</div>
    </div>
  );
};