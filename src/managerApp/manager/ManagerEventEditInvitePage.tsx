import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../stores/reducers";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { InitialIcon } from "../../atoms/InitialIcon";
import SearchIcon from "@mui/icons-material/Search";
import { Link, Navigate } from "react-router-dom";
import TagInput from "../../components/TagInput";
import { getItem, removeItem } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import {
	inviteEvent,
	LoadingActionFunc,
	getAllStudents,
} from "../../stores/actions";
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
	exisiting_users: any[];
	studentList: any[];
	selected_users: any[];
	school_id: number;
	filterText: string;
}

interface IProps {
	history: any;
	events: any;
	emails: string[];
	studentList:any;
	inviteEvent: Function;
	LoadingActionFunc: Function;
	getDetailEvents: Function;
	getAllStudents: Function;
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
			exisiting_users: [],
			studentList: [],
			selected_users: [],
			school_id: 0,
			filterText: "",
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
		await this.getStudents(this.props.events.eventDetail.students);
		this.props.LoadingActionFunc(false);
	};
	getEventDetail = async () => {
		await this.props.getDetailEvents(this.state.schoolId, this.state.event_id);
	};
	getStudents = async (classStudents: any[]) => {
		console.log("classStudents", classStudents);
		let url = "schools/all-user/" + this.state.schoolId + "?role=student";
		await this.props.getAllStudents(url);
		if (classStudents.length === 0) {
			this.setState({
				exisiting_users: this.props.studentList.result,
				studentList: this.props.studentList.result,
			});
		}
		if (this.props.studentList && this.props.studentList.result) {
			if (this.props.studentList.result.length > 0) {
				let temp = this.props.studentList.result;
				for (let i = 0; i < classStudents.length; i++) {
					let ind = temp.findIndex(
						(s: any) => s.id === classStudents[i].id
					);
					if (ind > -1) temp.splice(ind, 1);
					if (i === classStudents.length - 1) {
						await this.setState({
							exisiting_users: temp,
							studentList: temp,
						});
					}
				}
			}
		}
	};

	handleChange = (
		e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		this.setState({
			...this.state,
			filterText: e.currentTarget.value,
		});
	};

	isValid = () => {
		// return true;
		if (this.state.email === "") return true;
		else return true;
	};

	submit = async () => {
		console.log("clicked");
		if (this.isValid()) {
			if (this.props.events && this.props.events.eventDetail) {
				this.props.LoadingActionFunc(true);
				for (let i = 0; i < this.state.selected_users.length; i++) {
					await this.props.inviteEvent({
						user_email: this.state.selected_users[i].email,
						event_id: this.state.event_id,
					});
				}

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
	selectUser = (id: number) => {
		let temp = this.state.selected_users;
		temp.push(this.state.exisiting_users.find((user: any) => user.id === id));
		this.setState({
			selected_users: temp,
			filterText: "",
		});
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
							<div
								className='f-14 mb-32 cursor'
								onClick={() => {
									this.props.history.back();
								}}
							>
								<ArrowBackIcon
									sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
								></ArrowBackIcon>
								<span className="primary">Back</span>
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
									{this.props.events &&
										this.props.events.eventDetail &&
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

								<div className='tableSearch'>
									<div className='textArea'>
										<div className='invite-exisiting-div'>
											<div className='invite-exisiting'>
												<SearchIcon
													sx={{ color: "#808080", fontSize: 24, mr: 0.5 }}
												/>
											</div>
											<input
												className='invite-exisiting-input'
												placeholder='Search by name or role'
												value={this.state.filterText}
												onChange={this.handleChange}
											/>
										</div>
									</div>
								</div>
								{this.state?.selected_users &&
									this.state.selected_users.map((selected_user: any) => {
										return (
											<>
												<div className='selecting-user'>
													<div className='existing-user-content'>
														<InitialIcon
															initials={selected_user.email
																.substr(0, 1)
																.toUpperCase()}
															isFooterMenu={false}
														/>
														<span className='ml-16 fw-500 f-16'>
															{selected_user.name}
														</span>
													</div>
												</div>
											</>
										);
									})}
								<div></div>

								<div className='exisiting-user-lists'>
									{this.state?.exisiting_users &&
										this.state.exisiting_users
											.filter((user: any) => {
												if (!this.state.filterText) {
													return false;
												} else {
													return (user.name || "")
														.toLowerCase()
														.startsWith(this.state.filterText.toLowerCase());
												}
											})
											.map((user: any, index: any) => {
												return (
													<>
														<div
															className='exisiting-user'
															onClick={() => {
																this.selectUser(user.id);
															}}
														>
															<div className='existing-user-content'>
																<InitialIcon
																	initials={user.email
																		.substr(0, 1)
																		.toUpperCase()}
																	isFooterMenu={false}
																/>
																<span className='ml-16 fw-500 f-16'>
																	{user.name}
																</span>
															</div>
														</div>
													</>
												);
											})}
								</div>
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
	studentList,
}: StoreState): {
	events: any;
	studentList:any;
} => {
	return {
		events,
		studentList,
	};
};

export default connect(mapStateToProps, {
	inviteEvent,
	LoadingActionFunc,
	getDetailEvents,
	getAllStudents,
})(ManagerEventEditInvitePage);
