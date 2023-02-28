import React, { useState } from "react";
import { Rand_name } from "../lib/Random_name";
import './Settings.css'

import Stars from "../Backgrounds/StarStruck.png"
import Rat from ".././Backgrounds/CryptoRat.png"
import Salad from ".././Backgrounds/AnarchySalad.jpg"

export const Popup = ({ text, closePopup, setUsername, setBg, Bg, setKey, Key }: any) => {

  const [Name, setName] = useState("")
  const [Keyname, setKeyname] = useState("")
  
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
        <button onClick={() => 
        {let temp = Rand_name();
         setName(temp);
         setUsername(temp);
        }
      
         }>Generate name</button>
        <br></br>

        <label>
          Key
          <input 
          value={Key}
          onChange={(event) => {
            setKeyname(event.target.value);
            setKey(event.target.value);
            }}
          />
        </label>

        <br></br>
        <label>
          Change theme 
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
