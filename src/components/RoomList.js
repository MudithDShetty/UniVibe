import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { FaPlus, FaHashtag } from "react-icons/fa";

export const RoomList = ({ setRoom, setIsInChat }) => {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [showAddRoom, setShowAddRoom] = useState(false);

  useEffect(() => {
    const fetchUserRooms = async () => {
      if (auth.currentUser) {
        const userRoomRef = doc(db, "user_rooms", auth.currentUser.uid);
        const docSnap = await getDoc(userRoomRef);
        
        if (docSnap.exists()) {
          setRooms(docSnap.data().roomNames || []);
        }
      }
    };

    fetchUserRooms();
  }, []);

  const handleJoinRoom = (roomName) => {
    setRoom(roomName);
    setIsInChat(true);
  };

  const handleAddRoom = () => {
    if (newRoomName.trim()) {
      handleJoinRoom(newRoomName.trim());
      setNewRoomName("");
      setShowAddRoom(false);
    }
  };

  return (
    <div className="room-list-container">
      <div className="room-list-header">
        <h3>Your Rooms</h3>
        <button 
          className="add-room-button" 
          onClick={() => setShowAddRoom(!showAddRoom)}
        >
          <FaPlus />
        </button>
      </div>

      {showAddRoom && (
        <div className="add-room-input">
          <input
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="New room name..."
            onKeyPress={(e) => e.key === 'Enter' && handleAddRoom()}
            autoFocus
          />
          <button onClick={handleAddRoom}>Add</button>
        </div>
      )}

      <div className="rooms">
        {rooms.map((roomName, index) => (
          <div 
            key={index} 
            className="room-item"
            onClick={() => handleJoinRoom(roomName)}
          >
            <FaHashtag className="room-icon" />
            <span>{roomName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};