import React from "react";
import ListItem, { IListItem } from "../atoms/ListItem";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ListBoxUI from "../atoms/ListBox";
import ProfileContainer, { IProfile } from "../atoms/ProfileContainer";
import BestScoreBox from "../atoms/BestScoreBox";
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
    return (
      <div className="container">
        <ListBoxUI title="Today, 6Jun" callback={() => { }} more={true}>
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
        <ListBoxUI title="You" callback={() => { }} more={true} moreText="View Profile">
          <BestScoreBox score="63.22" title="Personal Best" scoreDate="6 July 2022" />
        </ListBoxUI>
        <ProfileContainer {...profile}></ProfileContainer>
      </div>
    )
  }
}

export default TestingComponent
