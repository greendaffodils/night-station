import React, { useEffect, useState } from "react";

function Player({ song, onEnded }) {
  const [videoMode, setVideoMode] = useState(true);

  useEffect(() => {
    if (song) {
      let announcement = `Now playing ${song.title}.`;

      if (song.from && !song.to) {
        announcement = `This one is from ${song.from}. ${song.title}.`;
      } else if (song.from && song.to) {
        announcement = `From ${song.from} to ${song.to}. Here's ${song.title}.`;
      }

      if (song.message) {
        announcement += ` Message says: ${song.message}`;
      }

      const utterance = new SpeechSynthesisUtterance(announcement);
      speechSynthesis.speak(utterance);
    }
  }, [song]);

  if (!song) return <p>No song playing...</p>;

  return (
    <div>
      <h2>Now Playing: {song.title}</h2>
      {song.from && <p><b>From:</b> {song.from}</p>}
      {song.to && <p><b>To:</b> {song.to}</p>}
      {song.message && <p><b>Message:</b> {song.message}</p>}

      <div style={{ display: videoMode ? "block" : "none" }}>
        <iframe
          width="560"
          height="315"
          src={`${song.url}?autoplay=1`}
          title="YouTube player"
          frameBorder="0"
          allow="autoplay"
          allowFullScreen
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
