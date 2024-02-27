import "../ChatButton.css";
import $ from "jquery";
import { useEffect, useState } from "react";

export const ChatButton = () => {

  useEffect(() => {
    $("#chat-circle").click(function () {
      $("#chat-circle").toggle("scale");
      $(".chat-box").toggle("scale");
    });
  }, []);

  return (
      <div class="btn btn-raised" id="chat-circle">
        <div id="chat-overlay"></div>
        <i class="material-icons chat-icon">chat</i>
      </div>
  );
};
