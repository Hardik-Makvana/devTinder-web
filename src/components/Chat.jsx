import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socketRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchChatMessage = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      console.log("Fetched chat:", chat.data);
    } catch (err) {
      console.error("Error fetching chat messages:", err);
    }

    console.log(chat.data.message);

    const chatMessages = chat?.data?.message.map((msg) => {
      return {
        // userId: msg?.senderId?._id,
        userId: msg?.senderId?._id || msg?.senderId,
        firstName: msg?.senderId?.firstName,
        text: msg.text,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    if (targetUserId) {
      fetchChatMessage();
    }
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.on("messageReceived", (message) => {
      console.log("Message received on UI:", message);

      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("messageError", (error) => {
      console.error("Message error:", error.message);
    });

    socket.emit("joinChat", { userId, targetUserId });

    return () => {
      socket.off("messageReceived");
      socket.disconnect();
      // socket.off("messageReceived");
      socket.off("messageError");
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  const handleMessage = (event) => {
    event.preventDefault();

    if (!newMessage.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage.trim(),
    });

    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>

      <div className="flex-1 overflow-y-auto p-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${userId === msg.userId ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-header">{msg.firstName}</div>

            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleMessage}
        className="p-5 border-t border-gray-600 flex items-center gap-2"
      >
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-500 text-white rounded p-2"
        />

        <button type="submit" className="btn btn-secondary">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
