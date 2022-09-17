import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

import ListItem, { IListItem } from "../../atoms/ListItem";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ListBoxUI from "../../molecules/ListBox";

interface IStates {
  step: number;
}

interface IProps {
  authUser: AuthInterface;
}

class CoachEventsPage extends React.Component<IProps, IStates> {
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
    let item2: IListItem = {
      text: "Dolphin Swimming School Swim Meet",
      callback: () => console.log("log click item"),
      icon: <></>,
      secondryText: true,
    };

    let item3: IListItem = {
      text: "100m Freestyle",
      callback: () => console.log("log click item"),
      smallText: "Male 9-10 y/o",
      icon: <></>,
      secondryText: false,
      isBigIcon: false,
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
                <ListItem {...item2}>
                  <>
                  <WatchLaterIcon />
                  <label>27 Jul 2022</label>
                  </>
                </ListItem>
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
                  <></>
                </ListItem>
                <ListItem {...item3}>
                  <></>
                </ListItem>
                <ListItem {...item3}>
                  <></>
                </ListItem>
                <ListItem {...item3}>
                  <></>
                </ListItem>
                <ListItem {...item3}>
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

export default connect(mapStateToProps, {})(CoachEventsPage);
