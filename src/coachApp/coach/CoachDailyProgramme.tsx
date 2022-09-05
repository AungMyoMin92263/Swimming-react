import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ListBoxUI from "../../atoms/ListBox";
import ListItem, { IListItem } from "../../atoms/ListItem";
import { InitialIcon } from "../../atoms/InitialIcon";
interface IStates {
  step: number;
}

interface IProps {
  authUser: AuthInterface;
}

class CoachDailyProgramPage extends React.Component<IProps, IStates> {
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
      text: "Joseph",
      callback: () => console.log("log click item"),
      smallText: "",
      icon: <><InitialIcon
      initials={'J'}/></>,
      secondryText: false,
      isBigIcon: false,
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
            <div className="mb-32">
            <img src={"/assets/icons/logo.png"} alt="logo"/>
            </div>
            <div className="row f-32 fw-500 mt-16 mb-32">
              <span>Pro Youth Evening Class</span>
            </div>
            <div className="row mb-8">
              <div className="col-6">
                <div>
                  <span className="f-10">Date</span>
                </div>
                <div>
                  <span className="f-16 fw-500">6 July 2022</span>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <span className="f-10">TIME</span>
                </div>
                <div>
                  <span className="f-16 fw-500">9:00 AM</span>
                </div>
              </div>
            </div>
            <div className="row mb-8">
              <div className="col-6">
                <div>
                  <span className="f-10">No. Students</span>
                </div>
                <div>
                  <span className="f-16 fw-500">10</span>
                </div>
              </div>
              <div className="col-6">
              </div>
            </div>
            <div className="row mb-8">
            <ListBoxUI title="Coaches" callback={() => {}} more={false}>
                <>
                  <ListItem {...item}>
                  <div className="second-text ">
                    </div>
                  </ListItem>
                  <ListItem {...item}>
                  <div className="second-text ">
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

export default connect(mapStateToProps, {})(CoachDailyProgramPage);
