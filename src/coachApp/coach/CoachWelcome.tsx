import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

interface IStates {
  step: number;
}

interface IProps {
  authUser: AuthInterface;
}

class CoachWelcomePage extends React.Component<IProps, IStates> {
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
				<div className='wrapper-mobile'>
					<div className='content-mobile center col-sm-12'>
						<div className='primary f-16 fw-500 m-32'>
							<span>My Report Cards</span>
						</div>
						<div className='fw-500 f-32'>
							<span>View your classes and activities</span>
						</div>
						<div style={{ marginTop: "-35px" }}>
							<img
								src='../../../assets/images/mobile.png'
								alt='mobile'
								className='mobile-image'
							/>
						</div>
						<div>
							<div className='flex-center'>
								<Link
									to='/coach/dashboard'
									style={{ textDecoration: "none" }}
								>
									<button type='submit' className='primary-btn mobile-btn'>
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

export default connect(mapStateToProps, {})(CoachWelcomePage);
