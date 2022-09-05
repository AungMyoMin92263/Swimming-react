import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import ListBoxUI from "../../atoms/ListBox";
import ListItem, { IListItem } from "../../atoms/ListItem";
import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import BestScoreBox from "../../atoms/BestScoreBox";
interface IStates {
  step: number;
}

interface IProps {
  authUser: AuthInterface;
}

class StudentEventDetailsPage extends React.Component<IProps, IStates> {
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
      text: "64.42s",
      callback: () => console.log("log click item"),
      smallText: "",
      icon: <></>,
      secondryText: true,
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
            <div className="row f-32 fw-500 mt-16 mb-32">
              <span>100m Freestyle</span>
            </div>
            <div className="row mb-8">
              <div className="col-6">
                <div>
                  <span className="f-10">Stroke</span>
                </div>
                <div>
                  <span className="f-16 fw-500">Freestyle</span>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <span className="f-10">Length</span>
                </div>
                <div>
                  <span className="f-16 fw-500">100 metres</span>
                </div>
              </div>
            </div>
            <div className="row mb-8">
              <div className="col-6">
                <div>
                  <span className="f-10">Gender</span>
                </div>
                <div>
                  <span className="f-16 fw-500">Male</span>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <span className="f-10">Age Class</span>
                </div>
                <div>
                  <span className="f-16 fw-500">9 to 10 y/o</span>
                </div>
              </div>
            </div>
            <div className="row mb-8">
              <div className="col-6">
                <div>
                  <span className="f-10">No. Students</span>
                </div>
                <div>
                  <span className="f-16 fw-500">2</span>
                </div>
              </div>
              <div className="col-6"></div>
            </div>
            <div className="row mb-8">
              <ListBoxUI
                title="You"
                callback={() => {}}
                more={true}
                moreText="View Profile"
              >
                <BestScoreBox
                  score="64.42"
                  title="Personal Best"
                  scoreDate="6 July 2022"
                />
              </ListBoxUI>
            </div>
            <div className="row mb-8">
              <ListBoxUI title="History" callback={() => {}} more={false}>
                <>
                  <ListItem {...item}>
                    {/* isBig */}
                    <div className="second-text ">
                      <CalendarTodayIcon sx={{ color : '0070F8'}}/>
                      <label>6 July 2022</label>
                    </div>
                  </ListItem>
                  <ListItem {...item}>
                    {/* isBig */}
                    <div className="second-text ">
                      <CalendarTodayIcon sx={{ color : '0070F8'}}/>
                      <label>6 July 2022</label>
                    </div>
                  </ListItem>
                  <ListItem {...item}>
                    {/* isBig */}
                    <div className="second-text ">
                      <CalendarTodayIcon sx={{ color : '0070F8'}}/>
                      <label>6 July 2022</label>
                    </div>
                  </ListItem>
                  <ListItem {...item}>
                    {/* isBig */}
                    <div className="second-text ">
                      <CalendarTodayIcon sx={{ color : '0070F8'}}/>
                      <label>6 July 2022</label>
                    </div>
                  </ListItem>
                  <ListItem {...item}>
                    {/* isBig */}
                    <div className="second-text ">
                      <CalendarTodayIcon sx={{ color : '0070F8'}}/>
                      <label>6 July 2022</label>
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

export default connect(mapStateToProps, {})(StudentEventDetailsPage);
