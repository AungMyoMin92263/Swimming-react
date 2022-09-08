import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IListItem } from "../../atoms/ListItem";
import { Link, Navigate } from "react-router-dom";

interface IStates {
  goCreateBadge : boolean;
}

interface IProps {
  authUser: AuthInterface;
}

class CoachEditIconPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      goCreateBadge : false
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
      goCreateBadge
    } = this.state;

    return (
      <>
        <div className="wrapper-mobile">
        {goCreateBadge && <Navigate to="/coache/create-badge" replace={true} />}

          <div className="content-mobile col-sm-12">
            <div className="mb-32">
              <Link to="/coache/create-badge">
              <button type="submit" className="back-btn">
                <ArrowBackIcon
                  sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                ></ArrowBackIcon>
              </button></Link>
            </div>
            <div className="f-32 fw-500 mt-16 mb-32" style={{ width: "247px" }}>
              <span>Edit Icon</span>
            </div>
              <div className="mb-16">
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
              </div>
              <button type="submit" className="btn btn-primary right w-100" onClick={()=> this.setState({ goCreateBadge : true })}>
                Done
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

export default connect(mapStateToProps, {})(CoachEditIconPage);
