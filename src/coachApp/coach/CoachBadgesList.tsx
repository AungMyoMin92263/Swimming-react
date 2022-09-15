import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import ListBoxUI from "../../atoms/ListBox";
import ListItem, { IListItem } from "../../atoms/ListItem";
import BestScoreBox from "../../atoms/BestScoreBox";
import { InitialIcon } from "../../atoms/InitialIcon";
import { Link, Navigate } from "react-router-dom";
import { stderr } from "process";
interface IStates {
  step: number;
  goNewBadge: boolean;
  goBadgeChoosed: boolean;
  studentId:string | null;
}

interface IProps {
  authUser: AuthInterface;
}

class CoachBadgesListPage extends React.Component<IProps, IStates> {
  urlProfileDetail :any
  constructor(props: any) {
    super(props);

    this.state = {
      step: 0,
      goNewBadge: false,
      goBadgeChoosed: false,
      studentId:''
    };
  }
  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
		const studentId = params.get("id");
    this.setState({
      studentId:studentId
    })
    if (this.state.studentId) this.urlProfileDetail = "/coache/dashboard/profile-detail/" + this.state.studentId
    
    //loading
  }

  render() {
    let item: IListItem = {
      text: "Create a new badge",
      callback: () => this.setState({ goNewBadge: true }),
      smallText: "Reward your students.",
      icon: <img src={"/assets/icons/upload.png"} />,
      secondryText: false,
      isBigIcon: true,
    };

    let item2: IListItem = {
      text: "All-Star Rounder",
      callback: () => this.setState({ goBadgeChoosed: true }),
      smallText: "Lorem ipsum sit dolor.",
      icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
      secondryText: false,
      isBigIcon: true,
    };
    const { goNewBadge, goBadgeChoosed } = this.state;

    return (
      <>
        <div className="wrapper-mobile">
          {goNewBadge && <Navigate to="/coache/create-badge" replace={true} />}
          {goBadgeChoosed && (
            <Navigate to="/coache/icon-confirm" replace={true} />
          )}

          <div className="content-mobile col-sm-12">
            <div className="mb-32">
              <Link to="/coache/dashboard/">
                <button type="submit" className="back-btn">
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                </button>
              </Link>
            </div>
            <div className="align-center">
              <span className="mr-8">
                <InitialIcon initials={"AR"} isFooterMenu={false}/>
              </span>{" "}
              <span>Azlan Razali</span>
            </div>
            <div className="f-32 fw-500 mt-16 mb-32" style={{ width: "247px" }}>
              <span>Select Badge to Send</span>
            </div>
            <div>
              <ListItem {...item}>
                <></>
              </ListItem>
            </div>
            <div>
              <ListItem {...item2}>
                <></>
              </ListItem>
            </div>
            <div>
              <ListItem {...item2}>
                <></>
              </ListItem>
            </div>
            <div>
              <ListItem {...item2}>
                <></>
              </ListItem>
            </div>
            <div>
              <ListItem {...item2}>
                <></>
              </ListItem>
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

export default connect(mapStateToProps, {})(CoachBadgesListPage);
