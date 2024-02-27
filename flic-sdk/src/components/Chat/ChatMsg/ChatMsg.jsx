import "../ChatButton.css";
import selfImg from "../self.png";
import adminImg from "../admin.png";

export const ChatMsg = ({
  msgs
}) => {
  return (
    msgs.map((e, index) => {
      var typeImgLink;
      if (e.type == "user") {
        typeImgLink = adminImg;
      } else {
        typeImgLink = selfImg;
      }
      return (
        <div class={`chat-msg ${e.type}`}>
          <span class="msg-avatar">
            <img src={typeImgLink} />
          </span>
          <div class="cm-msg-text">{e.msg}</div>
        </div>
      );
    })
  );
};
