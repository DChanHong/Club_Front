import React from "react";
import io, { Socket } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "@/utils/axiosInstance";

interface Message {
  //   username: string;
  message: string;
}

const Text: React.FC<{ username: string }> = ({ username }) => {
  const SOCKET_SERVER_URL = "http://localhost:4000";

  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // 웹소켓(Socket.io) 연결
    socketRef.current = io(SOCKET_SERVER_URL);

    // 이벤트 리스너 등록
    socketRef.current.on("chatting", (message) => {
      setChatHistory((chatHistory) => [...chatHistory, message]);
    });

    // 웹소켓(Socket.io) 연결 해제
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (message && socketRef.current) {
      const newMessage: Message = {
        // username,
        message,
      };
      //   console.log("emit", newMessage);
      socketRef.current.emit("chatting", newMessage);
      setMessage("");
    }
  };

  const mongoDBtest = async () => {
    try {
      const axiosData = { userName: "test", userChat: "testText" };
      const result = await axiosInstance.post(
        "/chat/insertchatting",
        axiosData
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        {chatHistory.map((chat, idx) => (
          <div key={idx}>
            {/* <span>{chat.username}: </span> */}
            <span>{chat.message}</span>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="border-2"
        />
        <button type="button" onClick={sendMessage}>
          메시지 전송
        </button>
      </div>
      <div>
        <button type="button" onClick={mongoDBtest}>
          몽고 버튼
        </button>
      </div>
    </>
  );
};

export default Text;
