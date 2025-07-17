import React, { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { db } from "./firebase";
import Player from "./components/Player";
import SongRequest from "./components/SongRequest";
import Queue from "./components/Queue";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const songsRef = ref(db, "songs");
    onValue(songsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const songArray = Object.entries(data).map(([key, value]) => ({
        key,
        ...value,
      }));
      setSongs(songArray);
      setCurrentSong(songArray.length > 0 ? songArray[0] : null);
    });
  }, []);

  const playNext = () => {
    if (songs.length > 0) {
      const firstSongKey = songs[0].key;
      remove(ref(db, `songs/${firstSongKey}`)); // Remove from Firebase
    }
  };

  return (
    <div className="app">
      <h1>🎵 Night Station FM</h1>
      {currentSong ? (
        <Player song={currentSong} onEnded={playNext} />
      ) : (
        <p>No song playing...</p>
      )}
      <SongRequest />
      <Queue songs={songs} />
    </div>
  );
}

export default App;
