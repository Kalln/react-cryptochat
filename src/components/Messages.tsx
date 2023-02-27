import './Messages.css';
import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom"
import { decryptor, encryptor } from './Encrypter';

export const Messages = (Key: string, Username: string) => {

    const [Msg, setMsg] = useState("");
    const [AllMsgs, setAllMsgs] = useState<any[]>([]);;
    
    useEffect(() => {
        const fetchMessags = async () => {
            const response = await fetch('/api/messages');
            const msg_json = await response.json();
            
            if (response.ok) setAllMsgs(msg_json);
        }
        setInterval(fetchMessags, 1000);
        
    }, []);

    const send = async (e: any) => {
        e.preventDefault();
        const user_message = {messagestring: encryptor(Msg, Key), username: Username};
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

    }
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
                    {AllMsgs.map((mssg) => {
                        if (mssg.name !== Username){
                            return (
                                <div className="message">
                                    <p style={{fontSize: "0.7em"}}>{mssg.name}</p>
                                    <p>{decryptor(mssg.msg, Key)}</p>
                                </div>
                            );
                        }else{
                            return(
                                <div className="myMessage">
                                    <p style={{fontSize: "0.7em"}}>{mssg.name}</p>
                                    <p>{decryptor(mssg.msg, Key)}</p>
                                </div>
                            );
                        }
                    })}
             </ScrollToBottom>
             <input className='input-body' value={Msg} onChange={(event) => {setMsg(event.target.value)}}></input>
            <button value={Msg} onClick={send}>Send message</button>
            </div>
              
        </div>
    );
};

/* <input value={Msg} onChange={(event) => setMsg(event.target.value)}/>
<button onClick={send}>Send Message</button> */