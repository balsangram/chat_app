import React, { useEffect, useState } from "react";
import Messages from "./components/Messages";

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
        const messageData = {
            room: room,
            author: username,
            message: currentMessage,
            time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
          // console.log(data);
        setMessageList((list) => [...list, data]);
        });
    }, [socket]);
  return (
    <div className="roomPage">
    <div className="chat-header">
      <p>Live Chat</p>
    </div>
    <div className="chat-body">
      
      <Messages messageList={messageList} username={username}/>
      
      {/* <GoToBtn /> */}
    </div>
    <div className="chat-footer">
      <input
        className="sendMessageInput"
        type="text"
        value={currentMessage}
        placeholder="Hey..."
        onChange={(event) => {
          setCurrentMessage(event.target.value);
        }}
        onKeyPress={(event) => {
          event.key === "Enter" && sendMessage();
        }}
      />
      <button className="sendMessageButton" onClick={sendMessage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-send-2"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#00abfb"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
          <path d="M6.5 12h14.5" />
        </svg>
      </button>
    </div>
  </div>
  )
}

export default Chat