// @ts-nocheck

import "../ChatButton.css";
import React from "react";
export const ChatHeader = ({chatTitle, agentStatus}) => {
  return (
    <div className="chat-box-header-abc">
    {chatTitle}
    {" "}
    {agentStatus? <span className="online-badge">Online</span> : <span className="offline-badge">Offline</span>}
    <span id="chat-box-toggle-abc" className="chat-box-toggle-abc">
      <i className="material-icons">close</i>
    </span>
  </div>
  );
};
