import React, { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { db } from "../firebase";

function Player() {
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const queueRef = ref(db, "queue");
    onValue(queueRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const firstKey = Object.keys(data)[0];
        const firstSong = data[firstKey];
        setCurrentSong({ key: firstKey, url: firstSong.url });
      } else {
        setCurrentSong(null);
      }
    });
  }, []);

  const removeSong = () => {
    if (currentSong) {
      remove(ref(db, `queue/${currentSong.key}`));
    }
  };

  if (!currentSong) return <p>No song playing</p>;

  const videoId = currentSong.url.split("v=")[1]?.split("&")[0];

  return (
    <div>
      <h2>Now Playing</h2>
      <iframe
        width="100%"
        height="250"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="autoplay"
        title="YouTube Player"
      ></iframe>
      <button onClick={removeSong}>Next</button>
    </div>
  );
}

export default Player;
