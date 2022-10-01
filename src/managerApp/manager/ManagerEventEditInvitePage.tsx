import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import TagInput from "../../components/TagInput";
import { getItem, removeItem } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import { inviteEvent, LoadingActionFunc } from "../../stores/actions";
import InputFormAtom from "../../atoms/InputFormAtom";
import { getDetailEvents } from "../../stores/actions";
interface IStates {

	event: any;
	email: string;
	isCompleted: boolean;
	errorMsg: string;
	schoolId: any;
	school_logo: any;
	event_id: any;
	school_name: string;
}

interface IProps {
	history: any;
	events: any;
	emails: string[];
	inviteEvent: Function;
	LoadingActionFunc: Function;
	getDetailEvents: Function;
}

class ManagerEventEditInvitePage extends React.Component<IProps, IStates> {
	schoolImage: string | undefined;
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		let event_id = path[3];

		this.state = {
			event: "",
			email: "",
			isCompleted: false,
			errorMsg: "",
			schoolId: 0,
			school_logo: "",
			event_id: event_id,
			school_name: "",
		};
	}
	componentDidMount() {
		this.authFromLocal();
		this.props.LoadingActionFunc(false);
	}
	authFromLocal = async () => {
		const user = JSON.parse(getItem("authUser") || "null");
		if (user && user.userInfo) {
			await this.setState({
				school_name: user.userInfo.assign_school
					? user.userInfo.assign_school.school.name
					: "",
				schoolId: user.userInfo.assign_school
					? user.userInfo.assign_school.school_id
					: -1,
				school_logo:
					user.userInfo.assign_school &&
					user.userInfo.assign_school.school?.logo,
			});
		}
		this.getEventDetail();
		this.props.LoadingActionFunc(false);
	};
	getEventDetail = async () => {
		await this.props.getDetailEvents(this.state.schoolId, this.state.event_id);
	};

	handleChange = (tags: string) => {
		this.setState({
			email: tags,
		});
	};

	isValid = () => {
		// return true;
		if (this.state.email === "") return false;
		else return true;
	};

	submit = async () => {
		console.log("clicked");
		if (this.isValid()) {
			if (this.props.events && this.props.events.eventDetail) {
				this.props.LoadingActionFunc(true);
				await this.props.inviteEvent({
					user_email: this.state.email,
					event_id: this.state.event_id,
				});
				if (this.props.events.error) {
					this.setState({
						isCompleted: false,
						errorMsg: this.props.events.error,
					});
					this.props.LoadingActionFunc(false);
				} else {
					this.setState({
						isCompleted: true,
					});
					removeItem("school");
				}
			}
		}
	};

	renderBtn = () => {
		if (!this.isValid()) {
			return (
				<button type='submit' className='idle-btn fw-600 ml-16'>
					Done
				</button>
			);
		} else
			return (
				<>
					{this.state.isCompleted && (
						<Navigate to='/manager/event-list' replace={true} />
					)}
					<button
						type='submit'
						className='primary-btn fw-600 ml-16'
						onClick={this.submit}
					>
						Done
					</button>
				</>
			);
	};

	render() {
		const { errorMsg, event, email } = this.state;
		return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<Link to='/manager/dashboard'>
							<span>My Report Cards</span>
						</Link>
					</div>
					<div className='container-cus'>
						<div className='content col-lg-6'>
							<div className='f-14 mb-32 cursor' onClick={() => {this.props.history.back()}}>
								
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								
							</div>

							<div className='mb-16 align-center'>
								<img
									src={
										this.state.school_logo
											? process.env.REACT_APP_API_ENDPOINT +
											  "/" +
											  this.state.school_logo
											: placeholder
									}
									alt='logo'
									id='logo'
									className={`${this.state.school_logo ? "item-icon" : "w-48"}`}
								/>

								<span className='f-16'>
									{this.props.events &&
										this.props.events.eventDetail &&
										this.props.events.eventDetail.name}
									(
									{this.props.events &&
									this.props.events.eventDetail &&
									this.props.events.eventDetail?.gender === "male"
										? "Male"
										: this.props.events.eventDetail?.gender === "female"
										? "Female"
										: "Mixed"}{" "}
									{this.props.events &&
										this.props.events.eventDetail &&
										this.props.events.eventDetail.from_age}
									-
									{this.props.events && this.props.events.eventDetail &&
										this.props.events.eventDetail.to_age}{" "}
									y/o)
								</span>
							</div>
							<div className='hr mb-32'></div>
							<div className='f-32 fw-500'>
								<span>Assign Students.</span>
							</div>
							<div className='f-16 mb-32'>
								<span>Assign students to your event.</span>
							</div>

							<div className='f-12'>
								<span>Student(s)</span>
							</div>
							<div className='fw-400 mb-16'>
								{/* <TagInput
									onInputChange={this.handleChange}
									callback={(tags: string[]) => {
										this.setState({
											emails: tags,
										});
									}}
								/> */}

								<InputFormAtom
									label='Student Email'
									placeholder={"Enter Email"}
									warning={""}
									type='text'
									showWarning={false}
									isDropdown={false}
									callback={(value: string) => {
										this.setState({
											email: value,
										});
									}}
									id='email'
									name='email'
									value={email}
									required={true}
									maxLength={200}
									className=''
									clickCallback={() => {}}
									focusCallback={() => {}}
								/>
							</div>
							<div>{errorMsg && <p className='text-danger'>{errorMsg}</p>}</div>
							<div className='right flex-center'>
								<span className='secondary'>1 of 1</span>
								{this.renderBtn()}
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = ({
	events,
}: StoreState): {
	events: any;
} => {
	return {
		events,
	};
};

export default connect(mapStateToProps, {
	inviteEvent,
	LoadingActionFunc,
	getDetailEvents,
})(ManagerEventEditInvitePage);
