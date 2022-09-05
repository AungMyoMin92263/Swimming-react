import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

import ListBoxUI from "../../atoms/ListBox";
import ListItem, { IListItem } from "../../atoms/ListItem";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

interface IStates {
  step: number;
}

interface IProps {
  authUser: AuthInterface;
}

class StudentDashboardPage extends React.Component<IProps, IStates> {
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
      smallText: "Male 9-10 100 Freestyle",
      icon: <></>,
      secondryText: false,
      isBigIcon: false,
    };
    return (
      <>
        <div className="wrapper-mobile">
          <div className="content-mobile col-sm-12">
            <div className="f-32 fw-500 mt-16 mb-32">
              <span> Hello, Azlan</span>
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

            <ListBoxUI
              title="Upcoming Competitons"
              callback={() => {}}
              more={true}
              moreText="View Events"
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

export default connect(mapStateToProps, {})(StudentDashboardPage);
