import React, { useEffect, useRef, useState } from "react";

function Player({ song, onEnd }) {
  const [mode, setMode] = useState("video");
  const playerRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    }

    function createPlayer() {
      if (playerRef.current) {
        new window.YT.Player(playerRef.current, {
          height: mode === "video" ? "315" : "0",
          width: mode === "video" ? "560" : "0",
          videoId: song.id,
          events: {
            onReady: (e) => e.target.playVideo(),
            onStateChange: (e) => {
              if (e.data === window.YT.PlayerState.ENDED) {
                onEnd();
              }
            },
          },
        });
      }
    }

    // TTS intro
    if (song) {
      let intro = "";
      if (song.from && song.to) {
        intro = `From ${song.from} to ${song.to}. ${song.message || ""}`;
      } else if (song.from) {
        intro = `A request from ${song.from}. ${song.message || ""}`;
      } else {
        intro = "Now playing a great song!";
      }

      const utter = new SpeechSynthesisUtterance(intro);
      speechSynthesis.speak(utter);
    }
  }, [song, mode, onEnd]);

  return (
    <div className="player">
      <h2>Now Playing: {song.title}</h2>
      <button onClick={() => setMode(mode === "video" ? "audio" : "video")}>
        Switch to {mode === "video" ? "Audio" : "Video"}
      </button>
      <div id="player" ref={playerRef}></div>
    </div>
  );
}

export default Player;
