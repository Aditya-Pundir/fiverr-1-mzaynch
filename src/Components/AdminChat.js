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
  const messageInput = useRef(null);
  const bottomElement = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState("");
  const userID = 11001010101;
  localStorage.setItem("userID", userID);
  // const userID = Number(localStorage.getItem("userID"));
  const [message, setMessage] = useState("");

  // const moveArray = (arr, from, to) => {
  //   arr.splice(to, 0, arr.splice(from, 1)[0]);
  //   return arr;
  // };

  const sendMessage = useCallback(async () => {
    if (message !== "") {
      socket.emit("message", { message, from: String(userID) });
      setMessage("");
    }
  }, [message, socket, userID]);

  const deleteRoom = async (room, i) => {
    const response = await fetch(`${server}/api/chat/deleteroom`, {
      method: "DELETE",
      headers: { Accept: "*/*", "Content-Type": "application/json" },
      body: JSON.stringify({ name: room }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));

    if (response.Success) {
      getRooms();
    }
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        sendMessage();
        let temp = { message, mine: true };
        setChat([...chat, temp]);
        messageInput?.focus();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [sendMessage, chat, message]);

  const collapseContacts = () => {
    if (window.matchMedia("(max-width: 1000px)").matches) {
      if (chatContacts.current.style.transform === "translateX(0%)") {
        chatContacts.current.style.transform = "translateX(-150%)";
      } else {
        chatContacts.current.style.transform = "translateX(0%)";
      }
    }
  };

  const getRooms = useCallback(async () => {
    let response = await fetch(`${server}/api/chat/getrooms`, {
      headers: { Accept: "*/*" },
    })
      .then((res) => res.json())
      .then((data) => data.reverse())
      .catch((err) => console.log(err));
    // setChat([]);
    // console.log(response);
    // for (let room in response) {
    //   if (response[room].unread >= 1) {
    //     response = moveArray(response, room, 0);
    //   }
    // }
    setRooms(response);
  }, [server]);

  useEffect(() => {
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

  const resetUnread = useCallback(async () => {
    await fetch(`${server}/api/chat/unread`, {
      method: "PUT",
      headers: { Accept: "*/*", "Content-Type": "application/json" },
      body: JSON.stringify({ name: String(name), unread: 0 }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));

    getRooms();
  }, [server, getRooms, name]);

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
      console.log(response);
      setClicked(false);
      setChat(response);
      resetUnread();
    };
    if (clicked === true) {
      getRoomChats();
    }
    socket.emit("create", userID, name);
  }, [server, userID, clicked, name, socket, resetUnread]);

  // setTimeout(getRooms(), 20000);

  useEffect(() => {
    if (chat.length > 0) {
      setName(chat[0]?.room);
    }
    bottomElement.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  return (
    <div className="admin-chat-outer">
      <div className="chat-contacts " ref={chatContacts}>
        {rooms.map((room, i) => {
          if (room.name !== String(userID)) {
            return (
              <button
                className="chat-room"
                key={i}
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
                <h5 className="chat-room-name">{room.name.split("^~")[0]}</h5>
                {room.unreadNum >= 1 ? (
                  <div className="unread">{room.unreadNum}</div>
                ) : (
                  ""
                )}
                <span
                  className="material-icons chat-room-delete-icon"
                  onClick={() => {
                    let finalDecision = window.confirm(
                      "Are you sure you want to delete this room?"
                    );

                    if (finalDecision === true) {
                      deleteRoom(room.name, i);
                    }
                  }}
                >
                  delete
                </span>
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
        {name !== "" ? (
          <div className="admin-chat-username-container">
            {name.split("^~")[0]}
          </div>
        ) : null}
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
              ref={messageInput}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="admin-send-message"
              onClick={() => {
                sendMessage();
                let temp = { message, mine: true };
                setChat([...chat, temp]);
                messageInput?.focus();
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
