import React, { useState } from "react";

const API_KEY = "YOUR_YOUTUBE_API_KEY"; // ✅ Replace with your YouTube API Key

function SongRequest({ addSong }) {
  const [query, setQuery] = useState("");

  const handleRequest = async () => {
    if (!query) return;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=video&key=${API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        const firstVideo = data.items[0];
        const song = {
          id: firstVideo.id.videoId,
          title: firstVideo.snippet.title,
          url: `https://www.youtube.com/embed/${firstVideo.id.videoId}`
        };
        addSong(song);
        setQuery("");
      } else {
        alert("No valid song found. Try again!");
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter song name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleRequest}>Request Song</button>
    </div>
  );
}

export default SongRequest;
