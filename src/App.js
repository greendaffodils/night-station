import React, { useEffect, useState } from "react";
import SongRequest from "./components/SongRequest";
import Player from "./components/Player";
import Queue from "./components/Queue";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const songsRef = ref(db, "songs");
    onValue(songsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const songList = Object.values(data);
      setSongs(songList);

      if (!currentSong && songList.length > 0) {
        setCurrentSong(songList[0]);
      }
    });
  }, [currentSong]);

  const playNext = () => {
    const remaining = songs.slice(1);
    if (remaining.length > 0) {
      setCurrentSong(remaining[0]);
    } else {
      setCurrentSong(null);
    }
  };

  return (
    <div className="app">
      <h1>🌙 Night Station FM</h1>
      <SongRequest />
      <Queue songs={songs} />
      {currentSong && (
        <Player song={currentSong} onEnd={playNext} />
      )}
    </div>
  );
}

export default App;
