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

class StudentEventsPage extends React.Component<IProps, IStates> {
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
      text: "Dolphin Swimming School Swim Meet",
      callback: () => console.log("log click item"),
      icon: <></>,
      secondryText: true,
    };

    let item3 : IListItem = {
      text: " 100m Freestyle",
      callback: () => console.log("log click item"),
      icon: <></>,
      secondryText: true,
    };
    return (
      <>
        <div className="wrapper-mobile">
          <div className="content-mobile col-sm-12">
            <div className="f-32 fw-500 mt-16 mb-32">
              <span> Events </span>
            </div>
            <div className="mb-8">
            <ListBoxUI
              title="Upcoming Competitons"
              callback={() => {}}
              more={false}
            >
              <>
                <ListItem {...item2}>
                  {/* isBig */}
                  <div className="second-text ">
                  <WatchLaterIcon />
                    <label>27 Jul 2022</label>
                  </div>
                </ListItem>
              </>
            </ListBoxUI>
            </div>

            <div className="mb-8">
            <ListBoxUI
              title="My Events"
              callback={() => {}}
              more={false}
            >
              <>
                <ListItem {...item3}>
                  {/* isBig */}
                  <div className="second-text ">
                    <label>Male 9-10 y/o</label>
                  </div>
                </ListItem>
                <ListItem {...item3}>
                  {/* isBig */}
                  <div className="second-text ">
                    <label>Male 9-10 y/o</label>
                  </div>
                </ListItem>
                <ListItem {...item3}>
                  {/* isBig */}
                  <div className="second-text ">
                    <label>Male 9-10 y/o</label>
                  </div>
                </ListItem>
                <ListItem {...item3}>
                  {/* isBig */}
                  <div className="second-text ">
                    <label>Male 9-10 y/o</label>
                  </div>
                </ListItem>
                <ListItem {...item3}>
                  {/* isBig */}
                  <div className="second-text ">
                    <label>Male 9-10 y/o</label>
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

export default connect(mapStateToProps, {})(StudentEventsPage);
