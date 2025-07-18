import React, { useEffect, useRef, useState } from "react";
import { ref, remove } from "firebase/database";
import { db } from "../firebase";

function Player({ song, onEnd }) {
  const [mode, setMode] = useState("video");
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!song) return;

    if (containerRef.current) containerRef.current.innerHTML = "";

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const createPlayer = () => {
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: mode === "video" ? "315" : "0",
        width: mode === "video" ? "560" : "0",
        videoId: song.id,
        playerVars: { autoplay: 1 },
        events: {
          onReady: (e) => e.target.playVideo(),
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED) {
              handleSongEnd();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) createPlayer();
    else window.onYouTubeIframeAPIReady = createPlayer;

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [song, mode]);

  const handleSongEnd = () => {
    if (!song) return;

    // ✅ Prepare outro message
    let outro = "That was a great song!";
    if (song.from && song.to) {
      outro = `This song was dedicated from ${song.from} to ${song.to}. ${song.message || ""}`;
    } else if (song.from) {
      outro = `This song was from ${song.from}. ${song.message || ""}`;
    }

    // ✅ Speak outro, then move to next song
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(outro);
    utter.onend = async () => {
      await remove(ref(db, `songs/${song.key}`)); // Remove from Firebase
      onEnd(); // Load next song
    };
    speechSynthesis.speak(utter);
  };

  return (
    <div className="player">
      <h2>Now Playing: {song.title}</h2>
      <button onClick={() => setMode(mode === "video" ? "audio" : "video")}>
        Switch to {mode === "video" ? "Audio" : "Video"}
      </button>
      <div ref={containerRef}></div>
    </div>
  );
}

export default Player;
