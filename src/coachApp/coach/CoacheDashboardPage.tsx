import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

import ListBoxUI from "../../atoms/ListBox";
import ListItem, { IListItem } from "../../atoms/ListItem";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { getItem } from "../../auth/LocalStorage";
import { InitialIcon } from "../../atoms/InitialIcon";
import { Navigate } from "react-router-dom";

interface IStates {
  step: number;
  name: string;
  goClass: boolean;
  goStudent: boolean;
}

interface IProps {
  authUser: AuthInterface;
  history: any;
}
class CoacheDashboardPage extends React.Component<IProps, IStates> {
  path: any;

  constructor(props: any) {
    super(props);
    this.path = props.history ? props.history.location.pathname.split("/") : "";

    this.state = {
      step: 0,
      name: "",
      goClass: false,
      goStudent: false,
    };
  }
  componentDidMount() {
    const user = JSON.parse(getItem("authUser") || "null");
    console.log("AuthUser", this.props.authUser);
    if (user && user.userInfo) {
      this.setState({
        name: user.userInfo.data.name,
      });
    }
    //loading
  }

  render() {
    let item: IListItem = {
      text: "Pro Youth Evening Class",
      callback: () => this.setState({ goClass: true }),
      smallText: "",
      icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
      secondryText: true,
      isBigIcon: false,
    };

    let item2: IListItem = {
      text: "Jerry Choo",
      callback: () => this.setState({ goStudent: true }),
      icon: (
        <>
          <InitialIcon initials={"J"} />
        </>
      ),
      secondryText: false,
      isBigIcon: false,
    };
    let item3: IListItem = {
      text: "Azlan Razali",
      callback: () => this.setState({ goStudent: true }),
      icon: (
        <>
          <InitialIcon initials={"AZ"} />
        </>
      ),
      secondryText: false,
      isBigIcon: false,
    };
    const { name, goClass, goStudent } = this.state;
    return (
      <>
        {goClass && <Navigate to="/coache/daily-program" replace={true} />}
        {goStudent && <Navigate to="/coache/profile-detail" replace={true} />}
        <div className="wrapper-mobile">
          <div className="content-mobile col-sm-12">
            <div className="f-32 fw-500 mt-16 mb-32">
              <span> Hello, </span> <span>{name}</span>
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
                  <ListItem {...item}>
                    {/* isBig */}
                    <div className="second-text ">
                      <WatchLaterIcon />
                      <label>9:30 PM</label>
                    </div>
                  </ListItem>
                  <ListItem {...item}>
                    {/* isBig */}
                    <div className="second-text ">
                      <WatchLaterIcon />
                      <label>10:30 PM</label>
                    </div>
                  </ListItem>
                </>
              </ListBoxUI>
            </div>

            <ListBoxUI
              title="Students"
              callback={() => {}}
              more={true}
              moreText="View All"
            >
              <>
                <ListItem {...item2}>
                  <></>
                </ListItem>
                <ListItem {...item3}>
                  <></>
                </ListItem>
                <ListItem {...item2}>
                  <></>
                </ListItem>
                <ListItem {...item3}>
                  <></>
                </ListItem>
                <ListItem {...item2}>
                  <></>
                </ListItem>
              </>
            </ListBoxUI>
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

export default connect(mapStateToProps, {})(CoacheDashboardPage);
