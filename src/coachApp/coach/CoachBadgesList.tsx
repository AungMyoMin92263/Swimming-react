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
interface IStates {
  step: number;
}

interface IProps {
  authUser: AuthInterface;
}

class CoachBadgesListPage extends React.Component<IProps, IStates> {
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
      text: "Create a new badge",
      callback: () => console.log("log click item"),
      smallText: "Reward your students.",
      icon: <img src={"/assets/icons/upload.png"} />,
      secondryText: false,
      isBigIcon: true,
    };

    return (
      <>
        <div className="wrapper-mobile">
          <div className="content-mobile col-sm-12">
            <div className="mb-32">
              <button type="submit" className="back-btn">
                <ArrowBackIcon
                  sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                ></ArrowBackIcon>
              </button>
            </div>
            <div className="align-center">
              <span className="mr-8">
                <InitialIcon initials={"AR"} />
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
              <ListItem {...item}>
                <></>
              </ListItem>
            </div>
            <div>
              <ListItem {...item}>
                <></>
              </ListItem>
            </div>
            <div>
              <ListItem {...item}>
                <></>
              </ListItem>
            </div>
            <div>
              <ListItem {...item}>
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
