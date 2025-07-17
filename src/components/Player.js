import React, { useEffect, useRef } from "react";

function Player({ song, onEnded }) {
  const playerRef = useRef(null);

  useEffect(() => {
    const loadPlayer = () => {
      new window.YT.Player(playerRef.current, {
        videoId: song.id,
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              onEnded();
            }
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = loadPlayer;
      document.body.appendChild(tag);
    } else {
      loadPlayer();
    }
  }, [song]);

  return (
    <div>
      <h2>Now Playing: {song.title}</h2>
      <div id="player" ref={playerRef}></div>
    </div>
  );
}

export default Player;
