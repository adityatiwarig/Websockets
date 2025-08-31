import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 px-4">
  <div className="backdrop-blur-xl bg-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-md border border-white/30">
    <h1 className="text-3xl font-extrabold text-center text-white mb-8 tracking-wide drop-shadow-lg">
      🔑 Join a Room
    </h1>
    <form onSubmit={handleSubmitForm} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white mb-2"
        >
          Email ID
        </label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-gray-200 border border-white/40 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
        />
      </div>

      <div>
        <label
          htmlFor="room"
          className="block text-sm font-medium text-white mb-2"
        >
          Room Number
        </label>
        <input
          type="text"
          id="room"
          value={room}
          placeholder="Enter room ID"
          onChange={(e) => setRoom(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-gray-200 border border-white/40 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
      >
        🚀 Join Room
      </button>
    </form>
  </div>
</div>

);


};

export default LobbyScreen;
