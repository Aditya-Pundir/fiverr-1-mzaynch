import React, { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import "../Styles/Chat.css";

function Chat({ server }) {
  // const socket = io("http://localhost:5001");
  // server = "http://localhost:5000";
  const socket = io("https://fiverr-1-mzaynch-chat.herokuapp.com");
  // const chatSound = new Audio("assets/chatone.mp3");
  const bottomElement = useRef(null);
  const chatContainer = useRef(null);
  const messageInput = useRef(null);
  const [chattable, setChattable] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [loggedIn, setLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const userID = localStorage.getItem("userID");
  // const userID =
  //   localStorage.getItem("userID") ||
  //   username + new Date().valueOf() + Math.random();

  const sendMessage = useCallback(async () => {
    if (message !== "") {
      socket.emit("message", {
        message,
        room: String(userID),
        from: String(userID),
        // unread: response.unreadNum + 1,
      });
      let temp = { message, mine: true };
      setMessages([...messages, temp]);
      setMessage("");
    }
    const room = await fetch(`${server}/api/chat/getroom`, {
      method: "POST",
      headers: { Accept: "*/*", "Content-Type": "application/json" },
      body: JSON.stringify({ name: String(userID) }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));

    await fetch(`${server}/api/chat/unread`, {
      method: "PUT",
      headers: { Accept: "*/*", "Content-Type": "application/json" },
      body: JSON.stringify({ name: userID, unread: room.unreadNum + 1 }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));

    // console.log(room.unreadNum + 1);
  }, [server, message, socket, userID, messages]);

  const getMessages = useCallback(async () => {
    const response = await fetch(`${server}/api/chat/userchat`, {
      method: "POST",
      headers: { Accept: "*/*", "Content-Type": "application/json" },
      body: JSON.stringify({ room: String(userID) }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));

    if (response.Messages) {
      response.Messages.forEach((msg) => {
        if (msg.from === userID) {
          msg.mine = true;
        } else {
          msg.mine = false;
          if (chatContainer.current.display === "flex") {
            // chatSound.play();
          }
        }
      });
    }
    setMessages(response.Messages);
  }, [server, userID]);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        sendMessage();
        let temp = { message, mine: true };
        setMessages([...messages, temp]);
        getMessages();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [getMessages, sendMessage, message, messages]);

  useEffect(() => {
    if (username !== null && userID !== null) {
      setChattable(true);
    }
  }, [username, userID]);

  socket.emit("create", userID, userID);

  socket.on("receive", (message) => {
    if (message.from === userID) {
      message.mine = true;
    } else {
      message.mine = false;
      // chatSound.play();
    }
    message.Date = "Just now";
    setMessages([...messages, message]);
  });

  useEffect(() => {
    if (loggedIn === true) {
      localStorage.setItem("username", username);
      localStorage.setItem(
        "userID",
        `${username}^~${new Date().valueOf() + Math.random()}`
      );
      setChattable(true);
      setLoggedIn(false);
    }
  }, [username, loggedIn]);

  useEffect(() => {
    if (userID !== null) {
      getMessages();
    }
  }, [getMessages, server, userID]);

  useEffect(() => {
    bottomElement.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // if (localStorage.getItem("userID") !== userID) {
  //   localStorage.setItem("userID", userID);
  // }

  useEffect(() => {
    chatContainer.current.style.display = "none";
  }, [chatContainer]);

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
          {chattable === true ? (
            <div className="message-container received-container">
              <span className="message received">
                Hi {username}, please enter your query so our team can respond
                to you as soon as possible.
              </span>
              {/* <span className="msg-time">{msg.Date}</span> */}
            </div>
          ) : (
            ""
          )}
          {chattable === true ? (
            messages.map((msg, i) => {
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
            })
          ) : (
            <div className="username-container">
              <input
                type="text"
                className="username-field"
                placeholder="Enter your name"
                value={username === null ? "" : username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <button
                className="set-username"
                onClick={() =>
                  username !== null && username.trim() !== ""
                    ? setLoggedIn(true)
                    : null
                }
              >
                <span className="material-icons set-username-icon">east</span>
              </button>
            </div>
          )}
          <div ref={bottomElement}></div>
        </div>
        {chattable === true ? (
          <div className="input-container">
            <input
              type="text"
              className="message-input"
              placeholder="Message..."
              value={message}
              ref={messageInput}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="send-message"
              onClick={() => {
                let temp = { message, mine: true };
                setMessages([...messages, temp]);
                sendMessage();
                messageInput?.focus();
              }}
            >
              <span className="material-icons">send</span>
            </button>
          </div>
        ) : (
          ""
        )}
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
