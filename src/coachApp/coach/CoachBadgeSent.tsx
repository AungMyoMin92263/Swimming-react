import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IListItem } from "../../atoms/ListItem";
import InputFormAtom from "../../atoms/InputFormAtom";
import { InitialIcon } from "../../atoms/InitialIcon";
import { Link, Navigate } from "react-router-dom";

interface IStates {
  goProfile : boolean;
}

interface IProps {
  authUser: AuthInterface;
}

class CoachBadgeSentPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      goProfile : false,
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

    const {
      goProfile
    } = this.state;

    return (
      <>
        <div className="wrapper-mobile">
        {goProfile && <Navigate to="/coache/dashboard/profile-detail" replace={true} />}

          <div className="content-mobile col-sm-12">
            <div className="mb-32">
              <Link to="/coache/dashboard/badge-list">
              <button type="submit" className="back-btn">
                <ArrowBackIcon
                  sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                ></ArrowBackIcon>
              </button></Link>
            </div>
            <div className="text-center">
              <div className="f-32 fw-500 mt-16 mb-32">
                <span>Confirm send?</span>
              </div>
              <img
                src={"/assets/icons/logo.png"}
                alt="home"
                className="w-120-icon mb-16"
              />
              <div className="mb-16 f-14 fw-500">
                <span>Safe Swimmer</span>
              </div>
              <div className="mb-16 f-14">
                <span>Lorem ipsum sit dolor sanataria.</span>
              </div>
              <div className="flex-center mb-32">
                <div className="email-div" style={{ width: "181px" }}>
                  <InitialIcon initials={"AR"} isFooterMenu={false}/>
                  <span>Azlan Razali</span>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary right w-100" onClick={()=> this.setState({ goProfile : true })}>
              Send Badge
            </button>
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

export default connect(mapStateToProps, {})(CoachBadgeSentPage);
