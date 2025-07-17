import React from "react";

function Queue({ songs }) {
  return (
    <div className="queue">
      <h3>🎶 Song Queue</h3>
      {songs.length > 0 ? (
        <ul>
          {songs.map((s, i) => (
            <li key={i}>{s.title}</li>
          ))}
        </ul>
      ) : (
        <p>No songs in queue</p>
      )}
    </div>
  );
}

export default Queue;
