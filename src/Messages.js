import './Messages.css';
import { own_message } from './components/Own_message.js';
import React, { useState } from "react";
import { render } from '@testing-library/react';

export const Messages = (Key) => {

    const [Msg, setMsg] = useState("");

    return (
        <div style={{
                backgroundColor: 'white',
                justifyContent:'bottom-center',
                alignItems:'center',
                width: '700px',
                height: '300px',
                transform: 'translate(300px, 0%)'
            }}>

            <h1 style={{transform: 'translate(270px, 0%)'}}>Messages</h1>

            <input
                value={Msg}
                onChange={(event) => setMsg(event.target.value)}
            />
            <button onClick={() => {
            setMsg("");
             render(own_message(Msg))}
            }
            >Send Message</button>
        </div>
    );
};

