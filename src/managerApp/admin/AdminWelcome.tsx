import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

import { LoadingActionFunc } from "../../stores/actions";

// icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";

interface IStates {
  step : number,
}

interface IProps {
	authUser: AuthInterface;
  LoadingActionFunc : Function;
}

class AdminWelcomePage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      step : 0,
    };
  }
  componentDidMount() {
    this.props.LoadingActionFunc(false);
    console.log('authUser',this.props.authUser)
    //loading
  }

  renderFooter = () => {
    switch(this.state.step){
      case 0 : {
        return <div style={{ marginTop: '-100px' }}>
        <div className="f-24 mb-32">
          <span>Manage Your Classes</span>
        </div>
        <div className="flex-center">
        <button type="submit" className="primary-btn" onClick={() => this.setState({ step : 1})}>
          <span>Next</span>
          <ArrowForwardIcon sx={{ color: '#FFF', fontSize: 24, ml: 0.5 }} ></ArrowForwardIcon>
        </button>
        </div>
        </div>;
      }
      case  1:{
        return <div style={{ marginTop: '-100px' }}>
        <div className="f-24 mb-32">
          <span>Create Swim Events</span>
        </div>
        <div className="flex-center">
        <button className="secondary-btn mr-8" onClick={() => this.setState({ step : 0})}>
        <ArrowBackIcon sx={{ color: '#0070F8', fontSize: 24, mr : 0.5 }} ></ArrowBackIcon>
          <span>Back</span>
        </button>
        <button type="submit" className="primary-btn" onClick={() => this.setState({ step : 2})}>
          <span>Next</span>
          <ArrowForwardIcon sx={{ color: '#FFF', fontSize: 24, ml: 0.5 }} ></ArrowForwardIcon>
        </button>
        </div>
        </div>;
      }
      case 2 : {
        return <div style={{ marginTop: '-100px' }}>
        <div className="f-24 mb-32">
          <span>Monitor Your Students</span>
        </div>
        <div className="flex-center">
        <button className="secondary-btn mr-8" onClick={() => this.setState({ step : 1})}>
        <ArrowBackIcon sx={{ color: '#0070F8', fontSize: 24, mr : 0.5 }} ></ArrowBackIcon>
          <span>Back</span>
        </button>
        <Link to="/admin/dashboard">
        <button type="submit" className="primary-btn">
          <span>Next</span>
          <ArrowForwardIcon sx={{ color: '#FFF', fontSize: 24, ml: 0.5 }} ></ArrowForwardIcon>
        </button>
        </Link>
        </div>
        </div>;
      }
    }
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <div className="primary f-16 project-header">
            <span>My Report Cards</span>
          </div>
          <div className="container-cus">
            <div className="content-center">
              <div className="fw-500 f-48">
                <span>Welcome to My Report Cards.</span>
              </div>
              <div style={{ marginTop: '-80px' }}>
                <img
                  src="../../../assets/images/mobile.png"
                  alt="mobile"
                  className="mobile-image"
                />
              </div>
              { this.renderFooter()}
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

export default connect(mapStateToProps, { LoadingActionFunc })(AdminWelcomePage);
