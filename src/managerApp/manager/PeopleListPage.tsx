import React from "react";

// import csss
import styles from "./../../css/pages.module.css";
import "../admin/AdminDashboard.css";
import "./ManagerDashboard.css";
import AddIcon from "@mui/icons-material/Add";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { School } from "../../stores/model/school";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { signOut, signIn } from "../../stores/actions";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";

interface IStates {
	schools: School[];
}
interface UserSignInPage {
	signIn: Function;
	authUser: AuthInterface;
}

type IProps = UserSignInPage;

class PeopleListPage extends React.Component<IProps, IStates> {
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
				<div className='container-cus'>
					<div className='dashboard'>
						{/* DASHBOARD HEADER */}
						<div className='dashboard-header'>
							<div className='justify-end'>
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
								<div className='col-9 col-md-12 justify-start align-center'>

									<div className='f-40 fw-500'>
										<span>People</span>
									</div>
								</div>
							</div>
						</div>
						{/* DASHBOARD BODY */}
						<div className='dashboard-body'>
							
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

export default connect(mapStateToProps, { signIn })(PeopleListPage);
