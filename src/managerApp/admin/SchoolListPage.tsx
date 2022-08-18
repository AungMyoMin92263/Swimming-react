import React from "react";

// import csss
import styles from "./../../css/pages.module.css";

import { School } from "../../interfaces/School";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { signOut, signIn } from "../../stores/actions";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

interface IStates {
	schools: School[];
}
interface UserSignInPage {
	signIn: Function;
	authUser: AuthInterface;
}

type IProps = UserSignInPage;

class SchoolListPage extends React.Component<IProps, IStates> {
	constructor(props: any) {
		super(props);

		this.state = {
			schools: [],
		};
	}

	componentDidMount() {
		//loading
	}

	render() {
		return (
			<>
				<div className='container'>
					<div className='content-dashboard'>
						<div className='right-div mb-16'>
							<div className='email-div'>
								<img
									src='../../../assets/icons/alpha.png'
									alt='alpha'
									className='icon'
								/>
								<span>Leon@gmail.com </span>
							</div>
						</div>
						<div className='row justify-center'>
							<div className='col-2'>
								<img
									src='../../../assets/icons/logo.png'
									alt='right-arrow'
									className='icon'
								/>
								&nbsp;
							</div>
							<div className='col-8'>
								<div className='f-40 fw-500'>
									<span>Dolphin Swimming School</span>
								</div>
							</div>
							<div className='col-2'>
								<a href='http://localhost:4200/app/sub-page/managers/admin-dashboard'>
									<button
										type='submit'
										className='btn btn-primary flex-center justify-center'
										style={{ width: "140px" }}
									>
										Create Class&nbsp;
										<img
											src='../../../assets/icons/plus.png'
											alt='plus'
											className='icon'
										/>
									</button>
								</a>
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

export default connect(mapStateToProps, { signIn })(SchoolListPage);
