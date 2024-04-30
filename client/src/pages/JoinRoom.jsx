import React, { useState } from "react";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");

export const JoinRoom = () => {
  const [userName, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if(userName !== "" && room !== ""){
        socket.emit("join_room", room);
    }
  };

  return (
    <>
      <div class="flex flex-col items-center justify-center min-h-screen bg-[#7EA1FF] px-4 sm:px-0">
        <div class="w-full max-w-lg px-4 py-8 sm:max-w-md sm:p-6 bg-gray-100  rounded-lg shadow-md">
          <h3 class="text-3xl sm:text-4xl text-center text-[#7EA1FF] font-bold mb-6">
            Join Room
          </h3>
          <div class="flex flex-col items-center space-y-4">
            <input
              type="text"
              placeholder="Your name here"
              class="px-4 py-2 border rounded border-gray-300 focus:outline-none"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room ID"
              class="px-4 py-2 border rounded border-gray-300 focus:outline-none"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button class="w-max bg-[#7EA1FF] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline" onClick={joinRoom}>
              Join
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
