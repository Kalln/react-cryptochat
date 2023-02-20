import React, { useState } from "react";
import "./Settings.css";

import Stars from "../Backgrounds/StarStruck.png"
import Rat from ".././Backgrounds/CryptoRat.png"
import Salad from ".././Backgrounds/AnarchySalad.jpg"

export const Popup = ({ text, closePopup, setUsername, setBg }) => {

  let Bg = Stars;

  const [Name, setName] = useState("")
  
  return (
      <div className="popup-container">
      <div className="popup-body">
        <h1>{text}</h1>

        <label>
          Name 
          <input 
          value={Name}
          onChange={(event) => {
            setName(event.target.value);
            setUsername(event.target.value);
            }}
          />
        </label>
        <br></br>
        <label>
          Change setting 
            <select value={Bg} onChange={(event) => {setBg(event.target.value)}}>

              <option value={Stars}>StarStruck</option>
              <option value={Rat}>CryptoRat</option>
              <option value={Salad}>AnarchySalad</option>

            </select>
        </label>
        <br></br><br></br><br></br><br></br>
        <button 
        onClick={closePopup}
        >Done
        </button>

      </div>
      </div>
  );
};
