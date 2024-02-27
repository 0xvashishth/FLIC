import { ChatButton } from "./ChatButton/ChatButton.jsx";
import { ChatHeader } from "./ChatHeader/ChatHeader.jsx";
import "./ChatButton.css";
import $ from "jquery";
import { useEffect, useState } from "react";
import { ChatMsg } from "./ChatMsg/ChatMsg.jsx";

export const Chat = ({ chatId }) => {
  const [msgs, setMsgs] = useState([
    {
      type: "agent",
      msg: "How can i help you ?",
      timestamp: new Date().getTime(),
    }
  ]);

  function generate_message(msg, type) {
    const newMsg = {
      type,
      msg,
      timestamp: new Date().getTime(),
    };

    setMsgs((prevMsgs) => [...prevMsgs, newMsg]);
    // $("#cm-msg-" + INDEX)
    //   .hide()
    //   .fadeIn(300);
    if (type == "self") {
      $("#chat-input").val("");
    }
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
  }

  useEffect(() => {
    $("#chat-submit").click(function (e) {
      e.preventDefault();
      var msg = $("#chat-input").val();
      if (msg.trim() == "") {
        return false;
      }
      generate_message(msg, "self");
      setTimeout(function () {
        generate_message(msg, "agent");
      }, 1000);
    });

    $(".chat-box-toggle").click(function () {
      $("#chat-circle").toggle("scale");
      $(".chat-box").toggle("scale");
    });
  }, []);

  return (
    <div id="body">
      <ChatButton />
      <div class="chat-box">
        <ChatHeader />
        <div class="chat-box-body">
          <div class="chat-box-overlay"></div>
          <div class="chat-logs">
            {msgs.length == 0
              ? "No Chat Found"
              : <ChatMsg msgs={msgs} />}
          </div>
        </div>
        <div class="chat-input">
          <form>
            <input
              id="chat-input"
              placeholder="Send a message..."
              type="text"
            />
            <button class="chat-submit" id="chat-submit" type="submit">
              <i class="material-icons send-icon">send</i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
