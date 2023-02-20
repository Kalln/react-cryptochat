import './App.css';
import React, { useState } from 'react';
import { Popup } from "./components/Settings"
import { encryptor, decryptor, keysmith } from "./components/Encrypter.js"

import Stars from "./Backgrounds/StarStruck.png"

const testtext: string = "RÄTT KOD! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
"Lorem ipsum dolor sit amet, consec do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const testtext_encrypted: Array<number> = encryptor(testtext, "apa")

function App() {

  const [Popup_flag, setPopup_flag] = useState(true);

  const [Username, setUsername] = useState("");

  const [Bg, setBg] = useState(Stars)

  const [Key, setKey] = useState("apa")
  
  return (
    <div style={{ backgroundImage: `url(${Bg})` }}>

      <button onClick={() => setPopup_flag(true)}>Settings</button>

        {Popup_flag ? <Popup Key={Key} setKey={setKey} Bg={Bg} setBg={setBg} setUsername={setUsername} text="Settings" 
        closePopup={() => setPopup_flag(false)}/> : null} 
      
      <h1>Hej {Username}</h1> 
      
      <main>
      {decryptor(testtext_encrypted, Key)}
      </main>
    </div>
  );
}

export default App
