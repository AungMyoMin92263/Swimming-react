import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import ListBoxUI from "../../atoms/ListBox";
import ListItem, { IListItem } from "../../atoms/ListItem";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Link, Navigate } from "react-router-dom";

import BadgeList from "../../atoms/BadgeList";
import { IBadgeItem } from "../../atoms/BadgeItem";

interface IStates {
  step: number;
  goBadges : boolean;
}

interface IProps {
  authUser: AuthInterface;
}

class CoachProfileDetailsPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      step: 0,
      goBadges : false,
    };
  }
  componentDidMount() {
    console.log("authUser", this.props.authUser);
    //loading
  }

  render() {
    let profile: IProfile = {
      title: "Azlan Razali",
      isLogo: true,
      display_item: [
        { title: "AGE", value: "16" },
        { title: "GENDER", value: "Male" },
        { title: "FAVOURITE STROKE", value: "FreeStyle" },
        { title: "PERSONAL BEST", value: "64.42s" },
      ],
    };

    let item: IListItem = {
      text: "Pro Youth Morning",
      callback: () => console.log("log click item"),
      smallText: "",
      icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
      secondryText: true,
      isBigIcon: false,
      selectable: true,
    };

    let item2: IListItem = {
      text: "100m Freestyle",
      callback: () => console.log("log click item"),
      smallText: "Male, 9-10 y/o, 64.42s",
      icon: <></>,
      secondryText: false,
      isBigIcon: false,
    };

    let badges: IBadgeItem[] = [
      {
        text: "Badge 1",
        icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
        callback: () => console.log("log click item"),
        isActive: true,
      },
      {
        text: "Badge 2",
        icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
        callback: () => console.log("log click item"),
        isActive: true,
      },
      {
        text: "Badge 3",
        icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
        callback: () => console.log("log click item"),
        isActive: false,
      },
      {
        text: "Badge 4",
        icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
        callback: () => console.log("log click item"),
        isActive: false,
      },
      {
        text: "Badge 5",
        icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
        callback: () => console.log("log click item"),
        isActive: false,
      },
      {
        text: "Badge 6",
        icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
        callback: () => console.log("log click item"),
        isActive: false,
      },
    ];
    const { goBadges } = this.state;

    return (
      <>
        <div className="wrapper-mobile">
        {goBadges && <Navigate to="/coache/badge-list" replace={true} />}

          <div className="content-mobile col-sm-12">
            <div className="mb-32">
              <Link to="/coache/dashboard">
                <button type="submit" className="back-btn">
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                </button>
              </Link>
            </div>
            <div className="mb-8">
              <ProfileContainer {...profile}></ProfileContainer>
            </div>
            <div className="mb-8">
              <ListBoxUI
                title="BADGES"
                callback={() => this.setState({ goBadges : true })}
                callback2={() => this.setState({ goBadges : true })}
                more={true}
                more2={true}
                moreText2='Give Badge'
              >
                <BadgeList badges={badges}></BadgeList>
              </ListBoxUI>
            </div>
            <div className="mb-8">
              <ListBoxUI
                title="Attendance"
                callback={() => {}}
                more={true}
                moreText="View All"
              >
                <>
                  <ListItem {...item}>
                    <div className="second-text ">
                      <WatchLaterIcon />
                      <label>14 Jul, 9:00 AM</label>
                    </div>
                  </ListItem>
                  <ListItem {...item}>
                    <div className="second-text ">
                      <WatchLaterIcon />
                      <label>14 Jul, 9:00 AM</label>
                    </div>
                  </ListItem>
                  <ListItem {...item}>
                    <div className="second-text ">
                      <WatchLaterIcon />
                      <label>14 Jul, 9:00 AM</label>
                    </div>
                  </ListItem>
                  <ListItem {...item}>
                    <div className="second-text ">
                      <WatchLaterIcon />
                      <label>14 Jul, 9:00 AM</label>
                    </div>
                  </ListItem>
                  <ListItem {...item}>
                    <div className="second-text ">
                      <WatchLaterIcon />
                      <label>14 Jul, 9:00 AM</label>
                    </div>
                  </ListItem>
                </>
              </ListBoxUI>
            </div>
            <div className="mb-8">
              <ListBoxUI
                title="Events"
                callback={() => {}}
                more={true}
                moreText="View All"
              >
                <>
                  <ListItem {...item2}>
                    <></>
                  </ListItem>
                  <ListItem {...item2}>
                    <></>
                  </ListItem>
                  <ListItem {...item2}>
                    <></>
                  </ListItem>
                  <ListItem {...item2}>
                    <></>
                  </ListItem>
                  <ListItem {...item2}>
                    <></>
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

export default connect(mapStateToProps, {})(CoachProfileDetailsPage);
