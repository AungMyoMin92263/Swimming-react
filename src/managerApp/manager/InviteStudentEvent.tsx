import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import TagInput from "../../components/TagInput";
import { getItem, removeItem } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import { inviteEvent } from "../../stores/actions/event-action";
interface IStates {
  event:any;
	emails: string[];
	isCompleted: boolean;
	logo: any;
	errorMsg: string;
}

interface IProps {
	emails: string[];
	events: any;
	inviteEvent: Function;
}

class InviteStudentEvent extends React.Component<IProps, IStates> {
	schoolImage: string | undefined;
	constructor(props: any) {
		super(props);

		this.state = {
      event:"",
			emails: [],
			isCompleted: false,
			logo: "",
			errorMsg: "",
		};
	}
	componentDidMount() {
		const user = JSON.parse(getItem("authUser") || "null");
		if (
			user &&
			user.userInfo &&
			user.userInfo.data.assign_school
		) {
			this.setState({
				logo: user.userInfo.data.assign_school.school.logo,
			});
		}
    let eventObj = JSON.parse(getItem("event") || "")
    if (eventObj) {
			this.setState({
				event: eventObj
			});
		}
	}
  

	handleChange = (tags: string[]) => {
		this.setState({
			emails: tags,
		});
	};

	isValid = () => {
		// return true;
		if (this.state.emails.length === 0) return false;
		else return true;
	};

	submit = async () => {
		console.log("clicked")
		if (this.isValid()) {
			if (this.state.event ) {
				await this.props.inviteEvent({
					user_email: this.state.emails,
					event_id: this.state.event.id,
				});
				if (this.props.events.error) {
					this.setState({
						isCompleted: false,
						errorMsg: this.props.events.error,
					});
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
    const { errorMsg, event } = this.state;
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
							<div className='f-14 mb-32'>
								<Link
									to='/manager/add-event'
									style={{ textDecoration: "none" }}
								>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								</Link>
							</div>

							<div className='mb-16 align-center'>
								<img
									src={
										this.state.logo
											? process.env.REACT_APP_API_ENDPOINT +
											  "/" +
											  this.state.logo
											: placeholder
									}
									alt='logo'
									id='logo'
									className={`${this.state.logo ? "item-icon" : "w-48"}`}
								/>

								<span className='f-16'>
									{this.state.event && this.state.event.name}(
									{this.state.event && this.state.event.gender === "male"
										? "Male"
										: this.state.event.gender === "female"
										? "Female"
										: "Mixed"}{" "}
									{this.state.event && this.state.event.from_age}-
									{this.state.event && this.state.event.to_age} y/o)
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
								<TagInput
									onInputChange={this.handleChange}
									callback={(tags: string[]) => {
										this.setState({
											emails: tags,
										});
									}}
								/>
							</div>
							<div>{errorMsg && <p className='text-danger'>{errorMsg}</p>}</div>
							<div className='right flex-center'>
								<span className='secondary'>2 of 2</span>
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

export default connect(mapStateToProps, { inviteEvent })(InviteStudentEvent);
