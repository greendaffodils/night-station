import React, { useState } from "react";
import Player from "./components/Player";
import SongRequest from "./components/SongRequest";
import Queue from "./components/Queue";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addSong = (song) => {
    setSongs((prev) => [...prev, song]);
    if (songs.length === 0) {
      setCurrentIndex(0);
    }
  };

  const playNext = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(null);
    }
  };

  return (
    <div className="app">
      <h1 className="title">🎵 Night Station FM</h1>
      <div className="card">
        {songs.length > 0 && currentIndex !== null ? (
          <Player song={songs[currentIndex]} onEnded={playNext} />
        ) : (
          <p>No song playing...</p>
        )}
      </div>
      <div className="card">
        <SongRequest addSong={addSong} />
      </div>
      <div className="card">
        <Queue songs={songs} />
      </div>
    </div>
  );
}

export default App;
