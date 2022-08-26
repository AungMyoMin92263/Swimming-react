import React from "react";
import ListItem, { IListItem } from "../atoms/ListItem";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ListBoxUI from "../atoms/ListBox";
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
      </div>
    )
  }
}

export default TestingComponent
