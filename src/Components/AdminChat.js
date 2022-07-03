import React, { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import "../Styles/AdminChat.css";

function AdminChat({ server }) {
  // const chatSound = new Audio("assets/chatone.mp3");
  // server = "http://localhost:5000";
  // const socket = io("http://localhost:5001");
  const socket = io("https://fiverr-1-mzaynch-chat.herokuapp.com");
  const [rooms, setRooms] = useState([]);
  const [chat, setChat] = useState([]);
  const [roomsFetched, setRoomsFetched] = useState(false);
  const chatContacts = useRef(null);
  const chatContent = useRef(null);
  const bottomElement = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState("");
  const userID = Number(localStorage.getItem("userID"));
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      socket.emit("message", { message, from: String(userID) });
      setMessage("");
    }
  };

  const collapseContacts = () => {
    console.log(chatContacts.current.style.transform);
    if (window.matchMedia("(max-width: 1000px)").matches) {
      if (chatContacts.current.style.transform === "translateX(0%)") {
        chatContacts.current.style.transform = "translateX(-150%)";
      } else {
        chatContacts.current.style.transform = "translateX(0%)";
      }
    }
  };

  const getRooms = useCallback(async () => {
    const response = await fetch(`${server}/api/chat/getrooms`, {
      headers: { Accept: "*/*" },
    })
      .then((res) => res.json())
      .then((data) => data.reverse())
      .catch((err) => console.log(err));
    setRooms(response);
  }, [server]);

  useEffect(() => {
    console.log(rooms.length);
    if (rooms.length === 0 && roomsFetched === false) {
      getRooms();
      setRoomsFetched(true);
    }
  }, [getRooms, rooms.length, roomsFetched]);

  // setTimeout(() => {
  //   getRooms();
  // }, 15000);

  socket.on("receive", (message) => {
    if (Number(message.from) === userID) {
      message.mine = true;
    } else {
      message.mine = false;
      // chatSound.play()
    }

    message.Date = "Just now";
    setChat([...chat, message]);
  });

  useEffect(() => {
    const getRoomChats = async () => {
      const response = await fetch(`${server}/api/chat/getroomchats`, {
        method: "POST",
        headers: { Accept: "*/*", "Content-Type": "application/json" },
        body: JSON.stringify({ room: name, userID: String(userID) }),
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
      // for (let msg in response) {
      //   if (response[msg].from === String(userID)) {
      //     response[msg].mine = true;
      //   } else {
      //     response[msg].mine = false;
      //   }
      //   console.log(msg.mine);
      // }
      console.log(response.Messages);
      setClicked(false);
      setChat(response);
    };
    if (clicked === true) {
      getRoomChats();
    }
    socket.emit("create", userID, name);
  }, [server, userID, clicked, name, socket]);

  useEffect(() => {
    bottomElement.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  return (
    <div className="admin-chat-outer">
      <div className="chat-contacts " ref={chatContacts}>
        {rooms.map((room) => {
          if (room.name !== String(userID)) {
            return (
              <button
                className="chat-room"
                key={room._id}
                onClick={() => {
                  if (clicked === true) {
                    setName(room.name);
                  } else {
                    setClicked(true);
                    setName(room.name);
                  }
                  collapseContacts();
                }}
              >
                <h5 className="chat-room-name">{room.name}</h5>
              </button>
            );
          } else {
            return "";
          }
        })}
      </div>
      <div className="chat-content" ref={chatContent}>
        <button className="admin-chat-menu" onClick={() => collapseContacts()}>
          <span className="material-icons">menu</span>
        </button>
        <div className="admin-messages">
          {chat.map((msg, i) => {
            return msg.mine === true ? (
              <div
                className="admin-message-container admin-sent-container"
                key={i}
              >
                <span className="admin-message admin-sent">{msg.message}</span>
                <span className="admin-message-time">{msg.Date}</span>
              </div>
            ) : (
              <div
                className="admin-message-container admin-received-container"
                key={i}
              >
                <span className="admin-message admin-received">
                  {msg.message}
                </span>
                <span className="admin-message-time">{msg.Date}</span>
              </div>
            );
          })}
          <div ref={bottomElement}></div>
        </div>
        {name !== "" ? (
          <div className="admin-input-container">
            <input
              type="text"
              className="admin-message-input"
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="admin-send-message"
              onClick={() => {
                sendMessage();
                let temp = { message, mine: true };
                setChat([...chat, temp]);
              }}
            >
              <span className="material-icons">send</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AdminChat;
