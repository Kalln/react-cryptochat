import react, { useState } from "react";


export const InputTest = () => {

    const [msg, setMsg] = useState("");
    const msg_change = (e: any) => {
        setMsg(e.target.value);
    }
    const send_post = (e: any) => {
        e.preventDefault();
        console.log("sending post");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ msg_str: msg, name: "test name", id: 1 })
        };
        fetch('http://localhost:8000/postChat', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
        
        setMsg("");
    }
    
    return(
        <>
            <form>
                <input type="text" placeholder="Enter message..." onChange={msg_change}/>
                <button onClick={send_post}> Send </button>
            </form>
            <p>Message: {msg}</p>
        
        </>

    );
};