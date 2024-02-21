import {useState} from 'react';
import './App.css';
import io from "socket.io-client";
import Chat from './Chat';

const socket = io.connect("wss://chat-app-servers.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }
  return (
    <div>
         {!showChat ? (
      <div className='joinPage'>
  <h3 className='meanHeading'>JOIN A ROOM</h3>
  <input className='entryRoomNameinput' type="text" placeholder="User Name..." onChange={(event) => {setUsername(event.target.value)}} />
  <input className='entryRoomNameinput' type="text" placeholder="Room Id..." onChange={(event) => {setRoom(event.target.value)}} />
  <button className='entryButton' onClick={joinRoom}>Join</button>
  </div>
    ):(
  <Chat socket={socket} username={username} room={room}/>
    )
    }
    </div>
  )
}

export default App
