import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

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
    return (
      <>
        <div className="wrapper-mobile">
          <div className="content-mobile center col-sm-12">
            
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
