import React, { useState } from "react";
import Player from "./components/Player";
import SongRequest from "./components/SongRequest";
import Queue from "./components/Queue";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const addSong = (song) => {
    setSongs((prev) => [...prev, song]);
    if (!currentSong) setCurrentSong(song);
  };

  const playNext = () => {
    const next = songs[1];
    setSongs((prev) => prev.slice(1));
    setCurrentSong(next || null);
  };

  return (
    <div className="app dark-mode">
      <h1 className="title">🎵 Night Station FM</h1>
      <Player song={currentSong} onEnded={playNext} />
      <SongRequest addSong={addSong} />
      <Queue songs={songs} />
    </div>
  );
}

export default App;
