import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
// icon
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { Link } from "react-router-dom";

import { setItemWithObject } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import { InitialIcon } from "../../atoms/InitialIcon";
import { getSchoolObj, LoadingActionFunc } from "../../stores/actions";
import { deleteManager } from './../../stores/actions/school-action';
interface IStates {
  school: any;
  errorMsg: string;
  url : string;
}

interface IProps {
	LoadingActionFunc: Function;
	schools: any;
	getSchoolObj: Function;
	deleteManager: Function
}
class InvitedManagerSummaryPage extends React.Component<IProps, IStates> {
	id: any;
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[3];

		this.state = {
			school: { name: "", logo: "", assign_user: [] },
			errorMsg: "",
			url: "",
		};
	}
	componentDidMount() {
		if (this.id) this.getSchool();
		this.props.LoadingActionFunc(false);
	}

	getSchool = async () => {
		await this.props.getSchoolObj("schools/" + this.id);

		if (this.props.schools.result) {
			if (this.props.schools.error) {
				this.setState({
					errorMsg: this.props.schools.error,
				});
			} else {
				let school1 = this.props.schools.result;
				if (school1) {
					this.setState({
						school: school1,
						url: "/admin/invite-manager/" + school1.id,
					});
					setItemWithObject("school", school1);
				}
			}
			this.props.LoadingActionFunc(false);
		}
	};
	handleDelete = async (user_id: any) => {
		let deleteCoachUrl = "assigned/school";
		await this.props.deleteManager(deleteCoachUrl, user_id);

			
		if (this.props.schools.error) {
			this.setState({
				errorMsg: this.props.schools.error,
			});
		}else{
this.getSchool();
    }
	};

	render() {
		const { school, url } = this.state;
		return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<Link to='/manager/dashboard'>
							<span>My Report Cards</span>
						</Link>
					</div>
					<div className='container-cus'>
						<div className='content col-lg-6 col-md-6 col-sm-12'>
							<div className='f-14 mb-32'>
								<Link to='/admin/dashboard' style={{ textDecoration: "none" }}>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								</Link>
							</div>
							<div className='mb-8 align-center'>
								<img
									src={
										school && school.logo
											? process.env.REACT_APP_API_ENDPOINT + "/" + school.logo
											: placeholder
									}
									alt='logo'
									className={`${school && school.logo ? "item-icon" : "w-48"}`}
								/>
								<span className='f-16'>{school && school.name}</span>
							</div>
							<div className='hr mb-32'></div>

							<div className='f-32 fw-500 mb-32'>
								<span>My Managers.</span>
							</div>

							{school.assign_user &&
								school.assign_user.length > 0 &&
								school.assign_user.map((manager: any) => (
									<>
										<div className='f-16 mb-32 align-center justify-space-between'>
											<div className='align-center'>
												<InitialIcon
													initials={manager.user.email
														.substr(0, 1)
														.toUpperCase()}
													isFooterMenu={false}
												/>
												<span className='ml-16'>
													{manager.user.name ? manager.user.name : "-"}
												</span>
											</div>
											<div>
												<DeleteOutlineOutlinedIcon
													sx={{
														color: "#0070F8",
														fontSize: 24,
														cursor: "pointer",
													}}
													onClick={() => this.handleDelete(manager.id)}
												></DeleteOutlineOutlinedIcon>
											</div>
										</div>

										<div className='hr mb-16'></div>
									</>
								))}
							<Link to={url} style={{ textDecoration: "none" }}>
								<div className='mb-16 align-center'>
									<AddIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></AddIcon>
									<span className='primary'>Add another manager</span>
								</div>
							</Link>

							<div className='hr mb-32'></div>
							<Link to='/admin/dashboard' style={{ textDecoration: "none" }}>
								<button type='submit' className='primary-btn right'>
									Done
								</button>
							</Link>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = ({
	schools,
}: StoreState): {
	schools: any;
} => {
  return {
    schools,
  };
};

export default connect(mapStateToProps, {
	LoadingActionFunc,
	getSchoolObj,
	deleteManager,
})(InvitedManagerSummaryPage);
