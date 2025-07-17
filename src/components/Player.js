import React, { useEffect, useRef } from "react";

function Player({ song, onEnded }) {
  const playerRef = useRef(null);

  useEffect(() => {
    const onPlayerReady = (event) => {
      event.target.playVideo();
    };

    const onPlayerStateChange = (event) => {
      if (event.data === window.YT.PlayerState.ENDED) {
        onEnded();
      }
    };

    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = loadPlayer;
      document.body.appendChild(tag);
    } else {
      loadPlayer();
    }

    function loadPlayer() {
      if (playerRef.current) {
        new window.YT.Player(playerRef.current, {
          height: "315",
          width: "560",
          videoId: song.id,
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      }
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
