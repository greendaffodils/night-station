import React, { useState } from "react";

function Player({ song, onEnded }) {
  const [videoMode, setVideoMode] = useState(true);

  if (!song) return <p>No song playing...</p>;

  return (
    <div>
      <h2>Now Playing: {song.title}</h2>
      <div style={{ display: videoMode ? "block" : "none" }}>
        <iframe
          width="560"
          height="315"
          src={`${song.url}?autoplay=1`}
          title="YouTube player"
          frameBorder="0"
          allow="autoplay"
          allowFullScreen
          onLoad={() => {
            console.log("Video Loaded");
          }}
        ></iframe>
      </div>
      {!videoMode && <p>Audio Only Mode (video hidden)</p>}
      <button className="toggle-btn" onClick={() => setVideoMode(!videoMode)}>
        {videoMode ? "Switch to Audio Only" : "Show Video"}
      </button>
    </div>
  );
}

export default Player;
