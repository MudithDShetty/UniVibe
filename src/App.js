import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth";
import { AppWrapper } from "./components/AppWrapper";
import Landing from "./components/Landing"; // Make sure this path is correct
import Cookies from "universal-cookie";
import "./App.css";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");
  const [roomHistory, setRoomHistory] = useState([]);

  // Load room history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatRoomHistory');
    if (savedHistory) {
      setRoomHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save room history to localStorage when it changes
  useEffect(() => {
    if (roomHistory.length > 0) {
      localStorage.setItem('chatRoomHistory', JSON.stringify(roomHistory));
    }
  }, [roomHistory]);

  const addRoomToHistory = (roomName) => {
    if (!roomHistory.includes(roomName)) {
      setRoomHistory(prev => [...prev, roomName]);
    }
  };

  const handleEnterRoom = (roomName) => {
    setRoom(roomName);
    setIsInChat(true);
    addRoomToHistory(roomName);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route 
          path="/auth" 
          element={
            !isAuth ? (
              <AppWrapper
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                setIsInChat={setIsInChat}
              >
                <Auth setIsAuth={setIsAuth} />
              </AppWrapper>
            ) : (
              <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
                {!isInChat ? (
                  <div className="room">
                    <label>Enter Secret Room</label>
                    <input 
                      onChange={(e) => setRoom(e.target.value)} 
                      placeholder="Type your room name..."
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        if (room.trim()) {
                          handleEnterRoom(room.trim());
                        }
                      }}
                      disabled={!room.trim()}
                    >
                      Enter Private Chat
                    </button>
                  </div>
                ) : (
                  <div className="chat-layout">
                    <div className="room-sidebar">
                      <button 
                        className="add-room-button"
                        onClick={() => setIsInChat(false)}
                      >
                        + Add Room
                      </button>
                      <div className="room-history">
                        <h3>Recent Rooms</h3>
                        <ul>
                          {roomHistory.map((roomName, index) => (
                            <li 
                              key={index} 
                              onClick={() => handleEnterRoom(roomName)}
                              className={roomName === room ? "active" : ""}
                            >
                              {roomName}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="chat-container">
                      <Chat room={room} />
                    </div>
                  </div>
                )}
              </AppWrapper>
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;