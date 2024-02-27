// @ts-nocheck

import "../ChatButton.css";
import React from "react";
export const ChatHeader = ({chatTitle, agentStatus}) => {
  return (
    <div className="chat-box-header">
    {chatTitle}
    {" "}
    {agentStatus? <span className="online-badge">Online</span> : <span className="offline-badge">Offline</span>}
    <span id="chat-box-toggle" className="chat-box-toggle">
      <i className="material-icons close-icon">close</i>
    </span>
  </div>
  );
};
