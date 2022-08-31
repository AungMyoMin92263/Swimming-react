import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

import ListBoxUI from "../../atoms/ListBox";
import ListItem, { IListItem } from "../../atoms/ListItem";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

interface IStates {
  step: number;
}

interface IProps {
  authUser: AuthInterface;
}

class StudentClassesPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      step: 0,
    };
  }
  componentDidMount() {
    console.log("authUser", this.props.authUser);
    //loading
  }

  render() {
    let item: IListItem = {
      text: "Pro Youth Evening Class",
      callback: () => console.log("log click item"),
      smallText: "",
      icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
      secondryText: true,
      isBigIcon: false,
    };

    let item2: IListItem = {
      text: "Junior Splash",
      callback: () => console.log("log click item"),
      icon: <></>,
      secondryText: true,
      isBigIcon: false,
    };
    return (
      <>
        <div className="wrapper-mobile">
          <div className="content-mobile col-sm-12">
            <div className="f-32 fw-500 mt-16 mb-32">
              <span> Classes </span>
            </div>
            <div className="mb-8">
              <ListBoxUI title="Today, 6 July" callback={() => {}} more={false}>
                <>
                  <ListItem {...item}>
                    {/* isBig */}
                    <div className="second-text ">
                      <WatchLaterIcon />
                      <label>5:30 PM</label>
                    </div>
                  </ListItem>
                </>
              </ListBoxUI>
            </div>

            <div className="mb-8">
              <ListBoxUI title="Tomorrow, 7 july" callback={() => {}} more={false}>
                <>
                  <ListItem {...item}>
                    {/* isBig */}
                    <div className="second-text ">
                      <WatchLaterIcon />
                      <label>5:30 PM</label>
                    </div>
                  </ListItem>
                  <ListItem {...item}>
                    {/* isBig */}
                    <div className="second-text ">
                      <WatchLaterIcon />
                      <label>5:30 PM</label>
                    </div>
                  </ListItem>
                </>
              </ListBoxUI>
            </div>
            <div className="mb-8">
              <ListBoxUI title="8 July" callback={() => {}} more={false}>
                <>
                  <ListItem {...item}>
                    {/* isBig */}
                    <div className="second-text ">
                      <WatchLaterIcon />
                      <label>5:30 PM</label>
                    </div>
                  </ListItem>
                </>
              </ListBoxUI>
            </div>
            <div className="mb-8">
              <ListBoxUI title="9 July" callback={() => {}} more={false}>
                <>
                  <ListItem {...item}>
                    {/* isBig */}
                    <div className="second-text ">
                      <WatchLaterIcon />
                      <label>5:30 PM</label>
                    </div>
                  </ListItem>
                </>
              </ListBoxUI>
            </div>
            <div className="mb-8">
              <ListBoxUI title="10 July" callback={() => {}} more={false}>
                <>
                  <ListItem {...item}>
                    {/* isBig */}
                    <div className="second-text ">
                      <WatchLaterIcon />
                      <label>5:30 PM</label>
                    </div>
                  </ListItem>
                </>
              </ListBoxUI>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({
  authUser,
}: StoreState): {
  authUser: AuthInterface;
} => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps, {})(StudentClassesPage);
