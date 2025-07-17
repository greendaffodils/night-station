import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";

function SongRequest() {
  const [songUrl, setSongUrl] = useState("");

  const addSong = () => {
    if (!songUrl.includes("youtube.com") && !songUrl.includes("youtu.be")) {
      alert("Please enter a valid YouTube link!");
      return;
    }
    const songRef = ref(db, "queue");
    push(songRef, { url: songUrl, requestedBy: "Anonymous" });
    setSongUrl("");
  };

  return (
    <div>
      <h2>Request a Song</h2>
      <input
        type="text"
        placeholder="Enter YouTube link"
        value={songUrl}
        onChange={(e) => setSongUrl(e.target.value)}
      />
      <button onClick={addSong}>Add</button>
    </div>
  );
}

export default SongRequest;
