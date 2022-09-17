import React from "react";
import ListItem, { IListItem } from "../atoms/ListItem";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ProfileContainer, { IProfile } from "../atoms/ProfileContainer";
import BestScoreBox from "../atoms/BestScoreBox";
import CommentItem, { ICommentItem } from "../atoms/Comment";
import BadgeList from "../molecules/BadgeList";
import { IBadgeItem } from "../atoms/BadgeItem";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ListBoxUI from "../molecules/ListBox";
class TestingComponent extends React.Component {

  render() {
    let item: IListItem = {
      text: "Pro Youth Noon",
      callback: () => console.log("log click item"),
      smallText: 'help text',
      icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
      // secondryText: true,
      // isBigIcon: true

    }
    let profile: IProfile = {
      title: 'Hello World',
      isLogo: true,
      display_item: [
        { title: "Age", value: '28' }
      ]
    }
    let comment: ICommentItem = {
      message: 'Hello Testing Comment',
      profile: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
      callback: () => { },
      timeString: "You at 00:00 PM",
      showReply: true,
      reply: 0
    }
    let badges: IBadgeItem[] = [
      {
        text: "Badge 1",
        icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
        callback: () => console.log("log click item"),
        isActive: true
      },
      {
        text: "Badge 2",
        icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
        callback: () => console.log("log click item"),
        isActive: true
      },
      {
        text: "Badge 3",
        icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
        callback: () => console.log("log click item"),
        isActive: false
      },
      {
        text: "Badge 4",
        icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
        callback: () => console.log("log click item"),
        isActive: false
      },
      {
        text: "Badge 5",
        icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
        callback: () => console.log("log click item"),
        isActive: false
      },
      {
        text: "Badge 6",
        icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
        callback: () => console.log("log click item"),
        isActive: false
      },
    ]
    return (
      <div className="container">
        <h1 style={{ padding: '50px 0px' }}> Testing Component</h1>
        <ListBoxUI title="Today, 6Jun" callback={() => { }} callback2={() => { }} more={true}>
          <>
            <ListItem {...item} >
              {/* isBig */}
              <div className="second-text ">
                <WatchLaterIcon />
                <label>14 July, 12:20 PM</label>
              </div>
            </ListItem>
            <ListItem {...item} >
              {/* isBig */}
              <div className="second-text ">
                <WatchLaterIcon />
                <label>14 July, 12:20 PM</label>
              </div>
            </ListItem>
            <ListItem {...item} >
              {/* isBig */}
              <div className="second-text ">
                <WatchLaterIcon />
                <label>14 July, 12:20 PM</label>
              </div>
            </ListItem>
          </>
        </ListBoxUI>
        <hr />
        <ListBoxUI title="You" callback={() => { }} callback2={() => { }} more={true} moreText="View Profile">
          <BestScoreBox score="63.22" title="Personal Best" scoreDate="6 July 2022" />
        </ListBoxUI>
        <hr />
        <ProfileContainer {...profile}></ProfileContainer>
        <hr />
        <ListBoxUI title="Class Comment" callback={() => { }} callback2={() => { }} more={true}>
          <CommentItem {...comment}></CommentItem>
        </ListBoxUI>
        <hr />
        <ListBoxUI title="Class Attendent" callback={() => { }} callback2={() => { }} more={true}>
          <>
            <ListItem {...item} selectable={true} >
              {/* isBig */}
              <div className="second-text ">
                <WatchLaterIcon />
                <label>14 July, 12:20 PM</label>
              </div>
            </ListItem>
            <ListItem {...item} selectable={true} >
              {/* isBig */}
              <div className="second-text ">
                <WatchLaterIcon />
                <label>14 July, 12:20 PM</label>
              </div>
            </ListItem>
            <ListItem {...item} selectable={true} >
              {/* isBig */}
              <div className="second-text ">
                <WatchLaterIcon />
                <label>14 July, 12:20 PM</label>
              </div>
            </ListItem>
          </>
        </ListBoxUI>
        <hr />
        <ListBoxUI title="Class Attendent" callback={() => { }} callback2={() => { }} more={true}>
          <BadgeList badges={badges}></BadgeList>
        </ListBoxUI>
        <hr />
        <ListBoxUI title="Daily Program" callback={() => { }} callback2={() => { }} noBtn={true}>
          <div className="file-upload">
            <label htmlFor="fileUpload">Tap Top - Upload </label>
            <FileUploadOutlinedIcon />
            <input type="file" id="fileUpload" style={{ display: 'none' }} />
          </div>
        </ListBoxUI>
        <hr />
      </div>
    )
  }
}

export default TestingComponent
