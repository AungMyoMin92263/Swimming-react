import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import { Carousel } from "react-bootstrap";
import "./CoachWelcome.css"
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
				<div className='wrapper-mobile bg-w'>
					<div className='content-mobile-cus center col-sm-12'>
						<CoachMobileHeader title={true} backBtn={true}></CoachMobileHeader>

						<div className='fw-500 f-32 pt-24 pb-24 '>
							<span>View your classes and activities</span>
						</div>
						<Carousel controls={false}>
							<Carousel.Item>
								<div >
									<img
										src={'/assets/images/mobile.png'}
										alt='mobile'
										className='mobile-image-cus'
									/>
								</div>
							</Carousel.Item>
							<Carousel.Item>
								<div >
									<img
										src={'/assets/images/mobile.png'}
										alt='mobile'
										className='mobile-image-cus'
									/>
								</div>
							</Carousel.Item>
							<Carousel.Item>
								<div >
									<img
										src={'/assets/images/mobile.png'}
										alt='mobile'
										className='mobile-image-cus'
									/>
								</div>
							</Carousel.Item>

						</Carousel>
						{/* <div >
							<img
								src={'/assets/images/mobile.png'}
								alt='mobile'
								className='mobile-image-cus'
							/>
						</div> */}
						<div>
							<div className='flex-center mt-24'>
								<Link
									to='/coach/add-info'
									style={{ textDecoration: "none",width:'100%' }}
								>
									<button type='submit' className='btn btn-primary mobile-btn cus-primay-btn-m'>
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
