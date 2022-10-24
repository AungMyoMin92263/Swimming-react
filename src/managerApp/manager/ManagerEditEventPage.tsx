import React from "react";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// import csss
import "./ManagerDashboard.css";
import "./tabs.scss";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";
import { getItem, setItemWithObject } from "../../auth/LocalStorage";
import { postEvent, putEvent, LoadingActionFunc } from "../../stores/actions";
import { getDetailEvents } from "../../stores/actions";

interface IStates {
	event: any;
	isCompleted: boolean;
	EventNameMsg: string;
	isEventNameEmpty: boolean;
	isStrokeEmpty: boolean;
	isLengthEmpty: boolean;
	isGenderClassEmpty: boolean;
	isAgeClassFromEmpty: boolean;
	isAgeClassToEmpty: boolean;
	selectedTab: string;
	schoolId: any;
	errorMsg: string;
}

interface IProps {
    history:any;
	events: any;
	getDetailEvents: Function;
	postEvent: Function;
	putEvent: Function;
	LoadingActionFunc: Function;
}
class ManagerEditEventPage extends React.Component<IProps, IStates> {
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		let event_id = path[3];

		this.state = {
			event: {
				id: event_id,
				name: "",
				gender: "male",
				stroke: "",
				stroke_length: 0,
				from_age: 0,
				to_age: 0,
			},
			isCompleted: false,
			EventNameMsg: "",
			isEventNameEmpty: false,
			isStrokeEmpty: false,
			isLengthEmpty: false,
			isGenderClassEmpty: false,
			isAgeClassFromEmpty: false,
			isAgeClassToEmpty: false,
			selectedTab: "Male",
			schoolId: -1,
			errorMsg: "",
		};
	}
	componentDidMount(): void {
		this.authFromLocal();
		this.getEventDetail();
	}

	authFromLocal = async () => {
		const user = JSON.parse(getItem("authUser") || "null");
		console.log(user.userInfo);
		if (user && user.userInfo) {
			await this.setState({
				schoolId: user.userInfo.assign_school
					? user.userInfo.assign_school.school_id
					: -1,
			});
		}
	};
	getEventDetail = async () => {
		await this.props.getDetailEvents(this.state.schoolId, this.state.event.id);
		if (this.props.events.eventDetail) {
			let event = this.props.events.eventDetail;
			let temp = this.state.event;
			temp.id = event.id;
			temp.name = event.name;
			temp.stroke = event.stroke;
			temp.stroke_length = event.stroke_length;
			temp.from_age = event.from_age;
			temp.to_age = event.to_age;
			temp.gender = event.gender;

			this.setState({
				event: temp,
				selectedTab : event.gender
			});
		}
	};

	isValid = () => {
		if (!this.state.event) return;
		if (
			!this.state.event.name ||
			this.state.event.name.length === 0 ||
			!this.state.event.stroke ||
			this.state.event.stroke.length === 0 ||
			this.state.event.stroke_length === 0 ||
			this.state.event.from_age === 0 ||
			this.state.event.to_age === 0
		)
			return false;
		else return true;
	};

	submit = async () => {
		if (isNaN(this.state.event.stroke_length)) {
			console.log("error");
			this.setState({
				errorMsg: "Strok Length must be number",
			});
		} else {
			if (this.isValid()) {
				this.props.LoadingActionFunc(true);

				let url = "school/" + this.state.schoolId + "/event";
				if (this.state.event.id < 0) {
					let tempEvent = {
						name: this.state.event.name,
						school_id: this.state.schoolId,
						gender: this.state.event.gender,
						stroke: this.state.event.stroke,
						stroke_length: this.state.event.stroke_length,
						from_age: this.state.event.from_age,
						to_age: this.state.event.to_age,
					};
					await this.props.postEvent(tempEvent, url);
					console.log(this.props.events.error);
					if (this.props.events.error) {
						this.setState({
							isCompleted: false,
							errorMsg: this.props.events.error,
						});
						this.props.LoadingActionFunc(false);
					} else {
						if (this.props.events.result) {
							setItemWithObject("event", this.props.events.result.data);
							let temp = this.state.event;
							temp.id = this.props.events.result.data.id;
							temp.name = this.props.events.result.data.name;
							temp.stroke = this.props.events.result.data.stroke;
							temp.stroke_length = this.props.events.result.data.stroke_length;
							temp.from_age = this.props.events.result.data.from_age;
							temp.to_age = this.props.events.result.data.to_age;
							temp.gender = this.props.events.result.data.gender;

							this.setState({
								isCompleted: true,
								event: temp,
							});
						}
					}
				} else {
					let tempEvent = {
						name: this.state.event.name,
						school_id: this.state.schoolId,
						gender: this.state.event.gender,
						stroke: this.state.event.stroke,
						stroke_length: this.state.event.stroke_length,
						from_age: this.state.event.from_age,
						to_age: this.state.event.to_age,
					};

					await this.props.putEvent(tempEvent, url, this.state.event.id);
					if (this.props.events.result)
						setItemWithObject("event", this.props.events.result.data);
					let temp = this.state.event;
					temp.id = this.props.events.result.data.id;
					temp.name = this.props.events.result.data.name;
					temp.stroke = this.props.events.result.data.stroke;
					temp.stroke_length = this.props.events.result.data.stroke_length;
					temp.from_age = this.props.events.result.data.from_age;
					temp.to_age = this.props.events.result.data.to_age;
					temp.gender = this.props.events.result.data.gender;

					this.setState({
						isCompleted: true,
						event: temp,
					});
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
						this.props.history.back()
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

	setTab = async (tab: string) => {
		let temp = this.state.event;
		temp.gender = tab.toLowerCase();
		await this.setState({
			selectedTab: tab,
			event: temp,
		});
		console.log("selectedTab", this.state.selectedTab);
	};

	renderTabs = () => {
		switch (this.state.selectedTab.toLowerCase()) {
			case "male": {
				return (
					<div className='tab'>
						<div
							className='tab-item-selected'
							onClick={() => this.setTab("Male")}
						>
							<span>Male</span>
						</div>
						<div className='tab-item' onClick={() => this.setTab("Female")}>
							<span>Female</span>
						</div>
						<div className='tab-item' onClick={() => this.setTab("Mixed")}>
							<span>Mixed</span>
						</div>
					</div>
				);
			}
			case "female": {
				return (
					<div className='tab'>
						<div className='tab-item' onClick={() => this.setTab("Male")}>
							<span>Male</span>
						</div>
						<div
							className='tab-item-selected'
							onClick={() => this.setTab("Female")}
						>
							<span>Female</span>
						</div>
						<div className='tab-item' onClick={() => this.setTab("Mixed")}>
							<span>Mixed</span>
						</div>
					</div>
				);
			}
			case "mixed": {
				return (
					<div className='tab'>
						<div className='tab-item' onClick={() => this.setTab("Male")}>
							<span>Male</span>
						</div>
						<div className='tab-item' onClick={() => this.setTab("Female")}>
							<span>Female</span>
						</div>
						<div
							className='tab-item-selected'
							onClick={() => this.setTab("Mixed")}
						>
							<span>Mixed</span>
						</div>
					</div>
				);
			}
		}
	};

	render() {
		const { event, EventNameMsg, errorMsg } = this.state;
		return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<Link to='/manager/dashboard'>
							<span>My Report Cards</span>
						</Link>
					</div>
					<div className='container-cus'>
						<div className='content col-6 col-md-6 col-sm-12'>
							<div className='f-14 mb-32 cursor' onClick={()=>this.props.history.back()}>
								
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								
							</div>

							<div className='f-32 fw-500 mb-16'>
								<span>Create an event.</span>
							</div>
							<div className='f-16 mb-32 fw-400'>
								<span>Create an event to assign to students.</span>
							</div>
							<div className='fw-400 mb-16 f-12'>
								<InputFormAtom
									label='Event Name'
									placeholder={"Enter name of Event"}
									warning={EventNameMsg}
									type='text'
									showWarning={false}
									isDropdown={false}
									callback={(value: string) => {
										let temp = event;
										temp.name = value;
										this.setState({
											event: temp,
										});
									}}
									id='addEventName'
									name='addEventName'
									value={event.name}
									required={true}
									maxLength={200}
									className=''
									clickCallback={() => {}}
									focusCallback={() => {
										this.setState({
											isEventNameEmpty: false,
										});
									}}
								/>
							</div>

							<div className='flex'>
								<div
									className='fw-400 mb-16 f-12 mr-24'
									style={{ width: "292px" }}
								>
									<InputFormAtom
										label='Stroke'
										placeholder={"Enter Stroke of Event"}
										warning={EventNameMsg}
										type='text'
										showWarning={false}
										isDropdown={false}
										callback={(value: string) => {
											let temp = event;
											temp.stroke = value;
											this.setState({
												event: temp,
											});
										}}
										id='addStroke'
										name='addStroke'
										value={event.stroke}
										required={true}
										maxLength={200}
										className=''
										clickCallback={() => {}}
										focusCallback={() => {
											this.setState({
												isStrokeEmpty: false,
											});
										}}
									/>
								</div>
								<div className='fw-400 mb-16 f-12' style={{ width: "132px" }}>
									<InputFormAtom
										label='Length'
										placeholder={"Enter Length of Event"}
										warning={EventNameMsg}
										type='text'
										showWarning={false}
										isDropdown={false}
										callback={(value: string) => {
											let temp = event;
											temp.stroke_length = value;
											this.setState({
												event: temp,
											});
										}}
										id='addLength'
										name='addLength'
										value={event.stroke_length}
										required={true}
										maxLength={200}
										className=''
										clickCallback={() => {}}
										focusCallback={() => {
											this.setState({
												isLengthEmpty: false,
											});
										}}
									/>
								</div>
							</div>

							<div className='fw-400 mb-8 f-12'>
								<span>Age Class</span>
							</div>
							<div className='flex'>
								<div className='fw-400 mb-16 f-12' style={{ width: "64px" }}>
									<InputFormAtom
										label=''
										placeholder={"Enter From"}
										warning={EventNameMsg}
										type='text'
										showWarning={false}
										isDropdown={false}
										callback={(value: string) => {
											let temp = event;
											temp.from_age = value;
											this.setState({
												event: temp,
											});
										}}
										id='addFrom'
										name='addFrom'
										value={event.from_age}
										required={true}
										maxLength={200}
										className=''
										clickCallback={() => {}}
										focusCallback={() => {
											this.setState({
												isAgeClassFromEmpty: false,
											});
										}}
									/>
								</div>
								<span className='p-8 mt-8'>to</span>
								<div className='fw-400 mb-16 f-12' style={{ width: "64px" }}>
									<InputFormAtom
										label=''
										placeholder={"Enter To"}
										warning={EventNameMsg}
										type='text'
										showWarning={false}
										isDropdown={false}
										callback={(value: string) => {
											let temp = event;
											temp.to_age = value;
											this.setState({
												event: temp,
											});
										}}
										id='addTo'
										name='addTo'
										value={event.to_age}
										required={true}
										maxLength={200}
										className=''
										clickCallback={() => {}}
										focusCallback={() => {
											this.setState({
												isAgeClassToEmpty: false,
											});
										}}
									/>
								</div>
							</div>

							<div className='fw-400 mb-8 f-12'>
								<span>Gender Class</span>
							</div>
							<div className='mb-32'>{this.renderTabs()}</div>

							<div>{errorMsg && <p className='text-danger'>{errorMsg}</p>}</div>

							<div className='right flex align-center'>
								<span className='secondary mr-16'>1 of 1</span>
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
	postEvent,
	putEvent,
	LoadingActionFunc,
	getDetailEvents,
})(ManagerEditEventPage);
