import React, { useEffect, useRef } from 'react';

function Messages({messageList, username}) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if ('scrollBehavior' in document.documentElement.style) {
      // If the browser supports smooth scrolling
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      // If the browser does not support smooth scrolling
      messagesEndRef.current?.scrollIntoView();
    }
  }

  useEffect(scrollToBottom, [messageList]);

  return (
    <div>
      {messageList.map((messageContent, index) => (
        <div className="chat-inner" key={index}>
          <div id={username === messageContent.author ? "you" : "other"}>
            <div className="messagesInChart">
              <div className="messaage-content">
                <p>{messageContent.message}</p>
              </div>
              <div className="message-meta">
                <p>{messageContent.time}</p>
                <p>{` ${messageContent.author}`}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;