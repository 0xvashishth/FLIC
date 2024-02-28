// @ts-nocheck

import "../ChatButton.css";
import $ from "jquery";
import React, { useEffect, useState } from "react";

export const ChatButton = () => {

  useEffect(() => {
    $("#chat-circle-abc").click(function () {
      $("#chat-circle-abc").toggle("scale");
      $("#chat-box-abc").toggle("scale");
    });
  }, []);

  return (
      <div className="btn-raised" id="chat-circle-abc">
        <i className="material-icons chat-icon-abc">chat</i>
      </div>
  );
};
