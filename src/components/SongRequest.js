// import React, { useState } from "react";

// const API_KEY =  "AIzaSyClersXY0AhGM9aJklcz3dgWooYOPXYR98";

// function SongRequest({ addSong }) {
//   const [query, setQuery] = useState("");
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [message, setMessage] = useState("");

//   const handleRequest = async () => {
//     if (!query) return;

//     const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
//       query
//     )}&type=video&key=${API_KEY}`;

//     try {
//       const res = await fetch(url);
//       const data = await res.json();

//       if (data.items && data.items.length > 0) {
//         const firstVideo = data.items[0];
//         const song = {
//           id: firstVideo.id.videoId,
//           title: firstVideo.snippet.title,
//           url: `https://www.youtube.com/embed/${firstVideo.id.videoId}`,
//           from,
//           to,
//           message
//         };
//         addSong(song);
//         setQuery("");
//         setFrom("");
//         setTo("");
//         setMessage("");
//       } else {
//         alert("No valid song found. Try again!");
//       }
//     } catch (error) {
//       console.error("Error fetching song:", error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter song name..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="From (Your name)"
//         value={from}
//         onChange={(e) => setFrom(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="To (Optional)"
//         value={to}
//         onChange={(e) => setTo(e.target.value)}
//       />
//       <textarea
//         placeholder="Message (Optional)"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={handleRequest}>Request Song</button>
//     </div>
//   );
// }

// export default SongRequest;
import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";

const API_KEY = process.env.REACT_APP_YT_API_KEY;

function SongRequest() {
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");

  const handleRequest = async (e) => {
    e.preventDefault(); // Prevent refresh
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
          from,
          to,
          message,
        };

        const songsRef = ref(db, "songs");
        await push(songsRef, song);

        setQuery("");
        setFrom("");
        setTo("");
        setMessage("");
      } else {
        alert("No valid song found. Try again!");
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  return (
    <div className="song-request">
      <input placeholder="Song name" value={query} onChange={(e) => setQuery(e.target.value)} />
      <input placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
      <input placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
      <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="button" onClick={handleRequest}>Request</button>
    </div>
  );
}

export default SongRequest;
