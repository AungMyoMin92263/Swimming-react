import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";
import {  LoadingActionFunc } from "../../stores/actions";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, Navigate } from "react-router-dom";
import { getItem } from "../../auth/LocalStorage";

interface IStates {
  step: number;
  goDashboard:boolean;
}

interface IProps {
	authUser: AuthInterface;
	LoadingActionFunc: Function;
}

class ManagerWelcomePage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      step: 0,
      goDashboard:true,
    };
  }
  componentDidMount() {

	this.props.LoadingActionFunc(false);
    //loading
  }

  render() {
	const { userInfo } = this.props.authUser;
    return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<span>My Report Cards</span>
					</div>
					<div className='container-cus'>
						<div className='content-center'>
							<div className='fw-500 f-48'>
								<span>Welcome to My Report Cards.</span>
							</div>
							<div style={{ marginTop: "-80px" }}>
								<img
									src='../../../assets/images/mobile.png'
									alt='mobile'
									className='mobile-image'
								/>
							</div>

							<div className='f-24 mb-32' style={{ marginTop: "-70px" }}>
								<span>Manage Your Classes</span>
							</div>
							<div className='flex-center'>
								<Link
									to={
										userInfo?.name ? "/manager/dashboard" : "/manager/add-name"
									}
									style={{ textDecoration: "none", width: "100%" , display:"flex", justifyContent:'center'}}
								>
									{" "}
									<button type='submit' className='primary-btn'>
										<span>Next</span>
										<ArrowForwardIcon
											sx={{ color: "#FFF", fontSize: 24, ml: 0.5 }}
										></ArrowForwardIcon>
									</button>
								</Link>
								
							</div>
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

export default connect(mapStateToProps, { LoadingActionFunc })(
	ManagerWelcomePage
);
