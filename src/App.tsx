import './App.css';
import React, { useState } from 'react';
import { Popup } from "./components/Settings";
import { Messages } from "./components/Messages";
import Stars from "./Backgrounds/StarStruck.png";

function App() {
  
  const [Popup_flag, setPopup_flag] = useState(true);
  const [Username, setUsername] = useState("");
  const [Bg, setBg] = useState(Stars);
  const [Key, setKey] = useState("apa");
  const [id] = useState(Math.floor(100000 + Math.random() * 900000))

  return (
    
    <div style={{ backgroundImage: `url(${Bg})`, height: '800px' }}>
      <button onClick={() => setPopup_flag(true)}>Settings</button>

        {Popup_flag ? <Popup Username={Username} Key={Key} setKey={setKey} Bg={Bg} setBg={setBg} setUsername={setUsername} text="Settings" 
        closePopup={() => setPopup_flag(false)}/> : null} 

      <h1 style={{textAlign: 'center'}}> Hi {Username}!</h1> 
      <main>
      Welcome to CryptoChat. Press the settings-button in the top-left corner if you wish to change your name, encryption key or the theme.
      CryptoChat encrypts the contets of your messages, but your name will still be visible to all. Happy chatting!
      </main>

      {Messages(Key, Username, id)}

    </div>

  );
}

export default App;

