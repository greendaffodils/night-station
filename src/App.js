import React from "react";
import "./styles.css";
import Navbar from "./components/Navbar";
import SongRequest from "./components/SongRequest";
import Queue from "./components/Queue";
import Player from "./components/Player";
import DedicationForm from "./components/DedicationForm";
import ConfessionBox from "./components/ConfessionBox";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <div className="left-panel">
          <SongRequest />
          <Queue />
        </div>
        <div className="right-panel">
          <Player />
          <DedicationForm />
          <ConfessionBox />
        </div>
      </div>
    </div>
  );
}

export default App;
