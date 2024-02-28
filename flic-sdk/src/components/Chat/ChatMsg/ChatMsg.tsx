// @ts-nocheck

import "../ChatButton.css";
import selfImg from "../self.png";
import adminImg from "../admin.png";
import React from "react";

export const ChatMsg = ({
  msgs
}) => {
  return (
    msgs.map((e, index) => {
      var typeImgLink;
      if (e.type == "agent") {
        typeImgLink = adminImg;
      } else {
        typeImgLink = selfImg;
      }
      return (
        <div className={`chat-msg ${e.type}`}>
          <span className="msg-avatar">
            <img src={typeImgLink} />
          </span>
          <div className="cm-msg-text-abc">{e.msg}</div>
        </div>
      );
    })
  );
};
