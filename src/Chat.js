import React, { useState } from 'react';
import "./Chat.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar ,IconButton } from '@material-ui/core';
import { AttachFile, MoreVert } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from "./axios";

function Chat({messages }) {
  const [input, setInput] = useState("");
  const sendMessage = async(e)=>{
    e.preventDefault();  

    await  axios.post("/messages/new", {
      message: input,
      name: "Big BOSS is here",
      timestamp: "Demo time stamp",
      received : false,
    });
    setInput(""); 
  };

  return (
    <div className="chat">
    <div className="chat__header">
      <Avatar/>
      
      <div className="chat__headerInfo">
        <h3>Room Name</h3>
        <p>SOC Basement!</p>
      </div>

      <div className="chat__headerRight">
        <IconButton>
          <DonutLargeIcon/>
        </IconButton>
        <IconButton>
          <AttachFile/>
        </IconButton>
        <IconButton>
          <MoreVert/>
        </IconButton> 
      </div>
    </div>

    <div className="chat__body">
     { messages.map((message)=> (
        <p className={`chat__message ${message.received && "chat__receiver"}`}>
        <span className="chat__name">{message.name}</span>
          {message.message}
          <span className="chat__timestamp">
          {message.timestamp}
        </span>
      </p>
      ))}
      
    </div>

    <div className="chat__footer">
    <InsertEmoticonIcon />
        <form>
          <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type message" type="text"/>
          <button onClick={sendMessage}  type="submit">Send message</button>
        </form>
        <MicIcon/>
    </div>

  </div> 
  )
}

export default Chat
