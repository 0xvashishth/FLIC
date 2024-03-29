// @ts-nocheck

import { ChatButton } from "./ChatButton/ChatButton";
import { ChatHeader } from "./ChatHeader/ChatHeader";
import "./ChatButton.css";
import $ from "jquery";
import { useEffect, useState } from "react";
import { ChatMsg } from "./ChatMsg/ChatMsg";
import React from "react";

export const Chat = ({ chatId }: any) => {
  const [chatTitle, setChatTitle] = useState("FLIC Chat");
  const [agentStatus, setAgentStatus] = useState(false);
  const [msgs, setMsgs] = useState([
    // {
    //   // type: "agent",
    //   // msg: "How can i help you ?",
    //   // timestamp: new Date().getTime(),
    // }
  ]);

  function generate_message(msg, type) {
    const newMsg = {
      type,
      msg,
      timestamp: new Date().getTime(),
    };

    setMsgs((prevMsgs) => [...prevMsgs, newMsg]);
    localStorage.setItem("flicChatExistingData", msgs);
    // $("#cm-msg-" + INDEX)
    //   .hide()
    //   .fadeIn(300);
    if (type == "user") {
      $("#chat-input-abc").val("");
    }
    $("#chat-logs-abc")
      .stop()
      .animate({ scrollTop: $("#chat-logs-abc")[0].scrollHeight }, 1000);
  }

  useEffect(() => {
    const url = `https://flic-7tcx.vercel.app/api/v1/chat/sdk/`;

    $("#chat-submit-abc").click(function (e) {
      e.preventDefault();
      var msg = $("#chat-input-abc").val();
      if (msg.trim() == "") {
        return false;
      }
      generate_message(msg, "user");
      const requestData = {
        chatSessionId: localStorage.getItem("flicChatSessionId"),
        type: 'user',
        msg
      };
      fetch(`${url}postDefaultAns/${chatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        body: JSON.stringify(requestData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Handle the data from the response
          console.log('Data received:', data);
          setAgentStatus(data.agentStatus);
          setMsgs((prevMsgs) => [...prevMsgs, data.newMsg]);
          localStorage.setItem("flicChatExistingData", msgs);
        })
        .catch(error => {
          // Handle errors
          console.error('Fetch error:', error);
        });

      // setTimeout(function () {
      //   generate_message(msg, "agent");
      // }, 1000);
    });

    $("#chat-box-toggle-abc").click(function () {
      $("#chat-circle-abc").toggle("scale");
      $("#chat-box-abc").toggle("scale");
    });

    fetch(`${url}getMetadata/${chatId}`, {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": 86400,
      },
      credentials: "include"
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Handle the data from the response
      console.log('Data received:', data);
      // setting up states
      setChatTitle(data.chat.chatTitle);
      setAgentStatus(data.agentStatus)
      // if agent is offline then make a default question request
      if(!data.agentStatus){
        const newMsg = {
          type: "agent",
          msg: `Agent is offline, ${data.chat.defaultAskQuestion}`,
          timestamp: new Date().getTime(),
        };
        localStorage.setItem("flicChatSessionId", data.chatSessionId)
        setMsgs((prevMsgs) => [...prevMsgs, newMsg]);
        localStorage.setItem("flicChatExistingData", msgs);
      }
    })
    .catch(error => {
      // Handle errors
      console.error('Fetch error:', error);
    });
  }, []);

  return (
    <div id="body">
      <ChatButton />
      <div className="chat-box-abc" id="chat-box-abc">
        <ChatHeader chatTitle={chatTitle} agentStatus={agentStatus} />
        <div className="chat-box-body-abc">
          <div className="chat-box-overlay"></div>
          <div className="chat-logs-abc" id="chat-logs-abc">
            {msgs.length == 0
              ? "No Chat Found"
              : <ChatMsg msgs={msgs} />}
          </div>
        </div>
        <div className="chat-input-abc">
          <form>
            <input
              id="chat-input-abc"
              placeholder="Send a message..."
              type="text"
            />
            <button className="chat-submit-abc" id="chat-submit-abc" type="submit">
              <i className="material-icons send-icon-abc">send</i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
