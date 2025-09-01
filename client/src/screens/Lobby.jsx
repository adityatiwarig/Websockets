import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { Mail, KeyRound } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 px-4">
      <div className="backdrop-blur-2xl bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-3xl p-10 w-full max-w-md border border-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6 tracking-wide drop-shadow-xl">
          🔑 Join a Room
        </h1>
        <p className="text-center text-white/80 mb-8 text-sm">
          Enter your email & room ID to get started
        </p>

        <form onSubmit={handleSubmitForm} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2"
            >
              Email ID
            </label>
            <div className="flex items-center bg-white/20 rounded-xl px-4 py-3 border border-white/30 focus-within:ring-2 focus-within:ring-pink-400">
              <Mail className="text-white/70 mr-3" size={20} />
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Room Input */}
          <div>
            <label
              htmlFor="room"
              className="block text-sm font-medium text-white mb-2"
            >
              Room Number
            </label>
            <div className="flex items-center bg-white/20 rounded-xl px-4 py-3 border border-white/30 focus-within:ring-2 focus-within:ring-pink-400">
              <KeyRound className="text-white/70 mr-3" size={20} />
              <input
                type="text"
                id="room"
                value={room}
                placeholder="Enter room ID"
                onChange={(e) => setRoom(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.05] active:scale-95 transform transition duration-300"
          >
            🚀 Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default LobbyScreen;
