import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "../Styles/Chat.css";

function Chat({ server }) {
  const socket = io("https://fiverr-1-mzaynch-chat.herokuapp.com");
  // const chatSound = new Audio("assets/chatone.mp3");
  const bottomElement = useRef(null);
  const chatContainer = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userID =
    Number(localStorage.getItem("userID")) ||
    new Date().valueOf() + Math.random();

  socket.emit("create", userID, userID);

  socket.on("receive", (message) => {
    if (Number(message.from) === userID) {
      message.mine = true;
    } else {
      message.mine = false;
      // chatSound.play();
    }
    message.Date = "Just now";
    setMessages([...messages, message]);
  });

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch(`${server}/api/chat/userchat`, {
        method: "POST",
        headers: { Accept: "*/*", "Content-Type": "application/json" },
        body: JSON.stringify({ room: String(userID) }),
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));

      response.Messages.forEach((msg) => {
        if (Number(msg.from) === userID) {
          msg.mine = true;
        } else {
          msg.mine = false;
          if (chatContainer.current.display === "flex") {
            // chatSound.play();
          }
        }
      });
      setMessages(response.Messages);
    };
    getMessages();
  }, [server, userID]);

  useEffect(() => {
    bottomElement.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (localStorage.getItem("userID") !== userID) {
    localStorage.setItem("userID", userID);
  }

  useEffect(() => {
    chatContainer.current.style.display = "none";
  }, [chatContainer]);

  function sendMessage() {
    if (message !== "") {
      socket.emit("message", { message, from: String(userID) });
      setMessage("");
    }
  }

  return (
    <div className="chat-outer">
      <div className="chat-inner" ref={chatContainer}>
        <div className="chat-inner-nav">
          <button
            className="chat-close-button"
            onClick={() => (chatContainer.current.style.display = "none")}
          >
            <span className="material-icons chat-close-icon">close</span>
          </button>
        </div>
        <div className="messages">
          {messages.map((msg, i) => {
            return msg.mine === true ? (
              <div className="message-container sent-container" key={i}>
                <span className="message sent">{msg.message}</span>
                <span className="msg-time">{msg.Date}</span>
              </div>
            ) : (
              <div className="message-container received-container" key={i}>
                <span className="message received">{msg.message}</span>
                <span className="msg-time">{msg.Date}</span>
              </div>
            );
            // <span className="message received">Hi, how can I help you?</span>
          })}
          <div ref={bottomElement}></div>
        </div>
        <div className="input-container">
          <input
            type="text"
            className="message-input"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="send-message"
            onClick={() => {
              sendMessage();
              temp = message;
              temp.mine = true;
              setMessages([...messages, temp]);
            }}
          >
            <span className="material-icons">send</span>
          </button>
        </div>
      </div>
      <button
        className="chat-button"
        onClick={() => {
          chatContainer.current.style.display === "none"
            ? (chatContainer.current.style.display = "flex")
            : (chatContainer.current.style.display = "none");
        }}
      >
        <span className="material-icons chat-icon">chat</span>
      </button>
    </div>
  );
}

export default Chat;
