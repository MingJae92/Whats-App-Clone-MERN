import React from 'react';
import "./Sidebar.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar ,IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import ChatIcon from '@material-ui/icons/Chat';
import {SearchOutlined} from '@material-ui/icons';
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
   
      <div className="sidebar__header">
      <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon/>
          </IconButton>
          <IconButton>
            <ChatIcon/>
          </IconButton>
          <IconButton>
            <MoreVert/>
          </IconButton> 
        </div>
      </div>
        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchOutlined/>
            <input placeholder="Search or start new chat" type="text"/>
          </div>
        </div>
          <div className="sidebar__chats">
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
          </div>
    </div>
  );
}

export default Sidebar

