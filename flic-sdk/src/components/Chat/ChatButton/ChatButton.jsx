import "../ChatButton.css";
import $ from "jquery";
import React, { useEffect, useState } from "react";

export const ChatButton = () => {

  useEffect(() => {
    $("#chat-circle").click(function () {
      $("#chat-circle").toggle("scale");
      $(".chat-box").toggle("scale");
    });
  }, []);

  return (
      <div className="btn btn-raised" id="chat-circle">
        <div id="chat-overlay"></div>
        <i className="material-icons chat-icon">chat</i>
      </div>
  );
};
