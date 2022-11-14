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
interface IStates {
	event: any;
	email: string;
	isCompleted: boolean;
	logo: any;
	errorMsg: string;
	exisiting_users: any[];
	studentList: any[];
	selected_users: any[];
	school_id: number;
	filterText: string;
}

interface IProps {
	emails: string[];
	events: any;
	inviteEvent: Function;
	LoadingActionFunc: Function;
	studentList: any;
	getAllStudents: Function;
}

class InviteStudentEvent extends React.Component<IProps, IStates> {
	schoolImage: string | undefined;
	constructor(props: any) {
		super(props);

		this.state = {
			event: "",
			email: "",
			isCompleted: false,
			logo: "",
			errorMsg: "",
			exisiting_users: [],
			studentList: [],
			selected_users: [],
			school_id: 0,
			filterText: "",
		};
	}
	componentDidMount() {
		this.authFromLocal();
		
	}
	authFromLocal = async () => {
		const user = JSON.parse(getItem("authUser") || "null");
		if (user && user.userInfo && user.userInfo.assign_school) {
			await this.setState({
				logo: user.userInfo.assign_school.school.logo,
				school_id: user.userInfo.assign_school.school.id,
			});
		}
		let eventObj = JSON.parse(getItem("event") || "");
		if (eventObj) {
			this.setState({
				event: eventObj,
			});
		}
  await this.getStudents([]);
		this.props.LoadingActionFunc(false);
	};

	handleChange = (
		e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		this.setState({
			...this.state,
			filterText: e.currentTarget.value,
		});
	};

	selectUser = (id: number) => {
		let temp = this.state.selected_users;
		temp.push(this.state.exisiting_users.find((user: any) => user.id === id));
		this.setState({
			selected_users: temp,
			filterText: "",
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
			if (this.state.event) {
				this.props.LoadingActionFunc(true);
        for (let i = 0; i < this.state.selected_users.length; i++) {
					await this.props.inviteEvent({
						user_email: this.state.selected_users[i].email,
						event_id: this.state.event.id,
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

	getStudents = async (classStudents: any[]) => {
		let url = "schools/all-user/" + this.state.school_id + "?role=student";
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
						(s: any) => s.id === classStudents[i].user.id
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
	studentList,
}: StoreState): {
	events: any;
	studentList: any;
} => {
	return {
		events,
		studentList,
	};
};

export default connect(mapStateToProps, {
	inviteEvent,
	LoadingActionFunc,
	getAllStudents,
})(InviteStudentEvent);
