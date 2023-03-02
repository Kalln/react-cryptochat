import './Messages.css';
import React, { useState, useEffect, SyntheticEvent } from "react";
import ScrollToBottom from "react-scroll-to-bottom"
import { decryptor, encryptor } from '../lib/Encrypter';

type Message = {
    msg: Array<number>,
    name: string,
    user_id: number,
    msg_id: number, 
    createdAt: string,
};

export const Messages = (Key: string, Username: string, user_idn: number) => {

    const [Msg, setMsg] = useState("");
    const [AllMsgs, setAllMsgs] = useState<Array<Message> | undefined>(undefined);
    
    useEffect(() => {
        const fetchMessags = async () => {
            const response = await fetch('/api/messages');
            const msg_json: Array<Message> = await response.json();
            
            if (response.ok) setAllMsgs(msg_json);
        }
        setInterval(fetchMessags, 1000); 
    }, []);

    const send = async (e: SyntheticEvent) => {
        e.preventDefault();
       
        // prevents sending empty messages to server
        if (Msg === "") {
            return;
        }

        // creates new message object and sends message to server 
        const user_message = {messagearray: encryptor(Msg, Key), username: Username, user_id: user_idn};
        console.log(AllMsgs);
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user_message),
        });
        if(response.ok) {
            console.log("all ok");
        }
        setMsg("");
    };
    

    return (
        <div style={{
                background: 'transparent', 
                justifyContent:'bottom-center',
                alignItems:'center',
                width: '700px',
                height: '300px',
                transform: 'translate(300px, 0%)'
            }}>

            <h1 style={{transform: 'translate(270px, 0%)'}}>Messages</h1>
            
            <div className="chat-body">
              <ScrollToBottom className="message-container">
                    {AllMsgs !== undefined && AllMsgs.map((mssg) => {
                        if (mssg.user_id !== user_idn) {
                            return (
                                <div className="message">
                                    <p style={{fontSize: "0.7em"}}>{mssg.name} - {mssg.createdAt}</p>
                                    <p>{decryptor(mssg.msg, Key)}</p>
                                </div> 
                            );  
                        } else {
                            return (
                                <div className="message">
                                    <p style={{color: "green", fontSize: "0.7em"}}>{mssg.name} - {mssg.createdAt}</p>
                                    <p>{decryptor(mssg.msg, Key)}</p>
                                </div>
                            );
                        }
                    })}
             </ScrollToBottom>
             <div tabIndex={-1}>
                <input className='input-body' 
                        value={Msg}
                        onChange={event => {setMsg(event.target.value)}}
                        onKeyDown={event => {if (event.key === 'Enter') send(event)}}
                />
                <button value={Msg} onClick={send}>Send message</button>
             </div>
 
            </div>
              
        </div>
    );
};
