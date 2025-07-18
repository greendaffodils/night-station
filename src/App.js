import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";
import SongRequest from "./components/SongRequest";
import Queue from "./components/Queue";
import Player from "./components/Player";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const songsRef = ref(db, "songs");
    onValue(songsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({ key, ...data[key] }));
        setSongs(list);
        if (!currentSong && list.length > 0) setCurrentSong(list[0]);
      } else {
        setSongs([]);
        setCurrentSong(null);
      }
    });
  }, [currentSong]);

  const playNext = () => {
    if (songs.length > 1) {
      setCurrentSong(songs[1]); // Play next song
    } else {
      setCurrentSong(null);
    }
  };

  return (
    <div className="app">
      <h1>🎵 Night Station</h1>
      <SongRequest />
      {currentSong ? (
        <Player key={currentSong.key} song={currentSong} onEnd={playNext} />
      ) : (
        <h2>No song playing</h2>
      )}
      <Queue songs={songs} />
    </div>
  );
}

export default App;
