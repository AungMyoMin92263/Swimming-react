import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../molecules/ListBox.css";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import placeholder from "../assets/images/place-holder.png";

import { Player } from "video-react";

export interface ICommentItem {
  message: string;
  profile?: JSX.Element;
  callback: Function;
  timeString?: string;
  showReply?: boolean;
  reply?: number;
  showRightArr?: boolean;
  isFileIncluded?: boolean;
  file?: string;
}

const downloadFile = () => {
  fetch("http://localhost:3000/comment/download").then((response) => {
    response.blob().then((blob) => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "comment-file-download" + new Date();
      a.click();
    });
    //window.location.href = response.url;
  });
};

const displayFile = (file: any) => {
  if (file.includes(".mp4")) {
    return (
      <Player
        playsInline
        src={
          file ? process.env.REACT_APP_API_ENDPOINT + "/" + file : placeholder
        }
        fluid={false}
        width={48}
        height={48}
      />
    );
  } else if(file.includes(".jpg") || file.includes(".jpeg") || file.includes(".png") || file.includes(".gif")){
    return (
      <img
        src={
          file ? process.env.REACT_APP_API_ENDPOINT + "/" + file : placeholder
        }
        alt="download"
        id="download"
        className="mr-16"
        style={{ width: "48px", height: "48px" }}
      />
    );
  }
  else {
    let name = file.split("/");
    return <span className="f-10 crop_text_comment">{name[2]}</span>
  }
};

const CommentItem = (props: ICommentItem) => {
  return (
    <div className="comment-item">
      <div className="message-area">
        <div className="title-text">{props.message}</div>
        {props.isFileIncluded ? (
          <div className="photo-box align-center mt-8 mb-8">
            {displayFile(props.file)}

            <div onClick={downloadFile} className="flex ml-8">
              <label
                htmlFor="fileUpload"
                className="cursor-pointer f-10 primary mr-8"
              >
                Download
              </label>
              <FileDownloadOutlinedIcon
                sx={{ color: "#0070F8", fontSize: 16, mr: 0.5 }}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="cmd-second-text">
          {props.profile}
          <label>{props.timeString}</label>
        </div>
        <div className="cmd-second-text" id="replay-box">
          <ReplyOutlinedIcon />
          <label>{props.reply || 0} replies</label>
        </div>
      </div>
      {props.showRightArr ? (
        <div className="item-icon" onClick={() => props.callback()}>
          <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default CommentItem;
