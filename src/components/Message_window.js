import "./Message_window.css"
import React, { useState } from "react";
import { render } from "@testing-library/react";
import { encryptor, decryptor } from "./Encrypter.js"

export const Messager = (key) => {

    const [Msg, setMsg] = useState("")
    
   
    return (
        <div>
            <h1>Messages</h1>
            <message_button>
                <input
                    value={Msg}
                    onChange={(event) => setMsg(event.target.value)}
                />
                <button onClick={() => {
                    render(decryptor(encryptor(Msg, key), "apa"));
                    setMsg("");}}
                >Send Message</button>
            </message_button>
        </div>
    );
}