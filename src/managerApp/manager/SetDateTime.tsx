import React from "react";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Typography, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getItem, setItemWithObject } from "../../auth/LocalStorage";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

import {
	getClassObject,
	postClass,
	putClass,
	LoadingActionFunc
} from "../../stores/actions";
import placeholder from "./../../assets/images/place-holder.png";
import { removeItem } from './../../auth/LocalStorage';

interface IStates {
	isRecur: boolean;
	selectedDays: any;
	classObj: any;
	isCompleted: boolean;
	school_name: string;
	school_id: number;
	class_id: number;
	errorMsg: string;
	logo: string;
	class_name: string;
}

const AntSwitch = styled(Switch)(({ theme }) => ({
	width: 28,
	height: 18,
	padding: 0,
	display: "flex",
	"&:active": {
		"& .MuiSwitch-thumb": {
			width: 15,
		},
		"& .MuiSwitch-switchBase.Mui-checked": {
			transform: "translateX(9px)",
		},
	},
	"& .MuiSwitch-switchBase": {
		padding: 2,
		"&.Mui-checked": {
			transform: "translateX(12px)",
			color: "#fff",
			"& + .MuiSwitch-track": {
				opacity: 1,
				backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
			},
		},
	},
	"& .MuiSwitch-thumb": {
		boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
		width: 12,
		height: 12,
		borderRadius: 6,
		transition: theme.transitions.create(["width"], {
			duration: 200,
		}),
	},
	"& .MuiSwitch-track": {
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor:
			theme.palette.mode === "dark"
				? "rgba(255,255,255,.35)"
				: "rgba(0,0,0,.25)",
		boxSizing: "border-box",
	},
}));

var daysArray = [
	{ text: "Mo", value: "mon" },
	{ text: "Tu", value: "tue" },
	{ text: "We", value: "wed" },
	{ text: "Th", value: "thu" },
	{ text: "Fr", value: "fri" },
	{ text: "Sa", value: "sat" },
	{ text: "Su", value: "sun" },
];

interface IProps {
	classes: any;
	postClass: Function;
	putClass: Function;
	getClassObject: Function;
	LoadingActionFunc : Function;
}
class SetDateTime extends React.Component<IProps, IStates> {
	constructor(props: any) {
		super(props);

		this.state = {
			isRecur: true,
			selectedDays:[],
			classObj: { start_time: "", end_time: "", start_date: "", end_date:"" },
			isCompleted: false,
			school_name: "",
			errorMsg: "",
			school_id: -1,
			class_id: -1,
			class_name: "",
			logo: "",
		};
	}

	componentDidMount() {
		const classObject = JSON.parse(getItem("class") || "null");
		if (classObject) {
			this.setState({
				isRecur: classObject.type === "daily" ? true : false,
				selectedDays: classObject.open_days,
				classObj: {
					start_time: classObject.start_time,
					end_time: classObject.end_time,
					start_date: classObject.start_date,
					end_date: classObject.end_date,
				},
				isCompleted: false,
				school_name: classObject.name,
				errorMsg: "",
				school_id: classObject.school_id,
				class_id: classObject.id,
				class_name: classObject.name,
				logo: classObject.logo,
			});
		}

		const user = JSON.parse(getItem("authUser") || "null");
		if (user && user.userInfo && user.userInfo.assign_school) {
			this.setState({
				school_name: user.userInfo.assign_school.school.name,
			});
		}
		this.props.LoadingActionFunc(false);
	}

	valueChangedTimeEnd = (e: any) => {
		let classTemp = this.state.classObj;
		classTemp.end_time = e.target.value;
		this.setState({
			classObj: classTemp,
		});
	};

	valueChangedTimeStart = (e: any) => {
		let classTemp = this.state.classObj;
		classTemp.start_time = e.target.value;
		this.setState({
			classObj: classTemp,
		});
	};

	renderBtn = () => {
		if (this.state.isRecur) {
			if (
				this.state.selectedDays.length === 0 ||
				this.state.classObj.start_time === "" ||
				this.state.classObj.end_time === ""
			) {
				return (
					<button type='submit' className='idle-btn fw-600 ml-16'>
						Continue
					</button>
				);
			} else
				return (
					<button type='submit' className='primary-btn' onClick={this.submit}>
						Continue
					</button>
				);
		} else if (!this.state.isRecur) {
			if (
				!this.state.classObj.start_date
				// this.state.classObj.start_time === "" ||
				// this.state.classObj.end_time === ""
			) {
				return (
					<button type='submit' className='idle-btn fw-600 ml-16'>
						Continue
					</button>
				);
			} else
				return (
					<button type='submit' className='primary-btn' onClick={this.submit}>
						Continue
					</button>
				);
		}
	};

	isRecurChanged = () => {
		let temp = this.state.selectedDays;
		if (!this.state.isRecur) {
			
			this.setState({
				selectedDays: temp,
				isRecur: true,
			});
		}else{
			
			this.setState({
				
				selectedDays: [],
				isRecur: false,
			});
		}
	};

	handleChange = (day: any) => {
		let temp = this.state.selectedDays;
		let index = temp.findIndex((d: any) => d === day.value);
		if (index > -1) {
			temp.splice(index, 1);
		} else {
			temp.push(day.value);
		}
		this.setState({
			selectedDays: temp,
		});
	};

	renderDay = (day: any) => {
		let temp = this.state.selectedDays;
		let index = temp.findIndex((d: any) => d === day.value);
		if (index > -1) {
			return (
				<div
					style={{
						width: 40,
						height: 40,
						backgroundColor: "var(--primary)",
						color: "#fff",
						borderRadius: "50%",
						padding: "8px",
						textAlign: "center",
						marginRight: 8,
						cursor: "pointer",
					}}
					onClick={() => this.handleChange(day)}
				>
					{day.text}
				</div>
			);
		} else {
			return (
				<div
					style={{
						width: 40,
						height: 40,
						backgroundColor: "white",
						color: "#1A1A1A",
						borderRadius: "50%",
						padding: "8px",
						textAlign: "center",
						marginRight: 8,
						cursor: "pointer",
					}}
					onClick={() => this.handleChange(day)}
				>
					{day.text}
				</div>
			);
		}
	};

	renderByIsRecur = () => {
		if (this.state.isRecur) {
			return (
				<>
					<div className='mb-32'>
						<span className='f-12 mb-8 flex-column'>Days</span>
						<div className='justify-start'>
							{daysArray.map((day) => this.renderDay(day))}
						</div>
					</div>
					<div className='mb-32 flex'>
						<div className='col-6 pad-0-16'>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									inputFormat='dd/MM/yyyy'
									label='Starting Date'
									value={this.state.classObj.start_date}
									onChange={(newValue) => {
										let temp = this.state.classObj;
										temp.start_date = newValue;
										this.setState({
											classObj: temp,
										});
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</div>
						<div className='col-6 pad-0-16'>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									inputFormat='dd/MM/yyyy'
									label='Ending Date'
									value={this.state.classObj.end_date}
									onChange={(newValue) => {
										let temp = this.state.classObj;
										temp.end_date = newValue;
										this.setState({
											classObj: temp,
										});
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</div>
					</div>
				</>
			);
		} else {
			return (
				<>
					<div className='mb-32 flex'>
						<div className='col-6 pad-0-16'>
							<LocalizationProvider
								dateAdapter={AdapterDateFns}
								
							>
								<DatePicker
									inputFormat='dd/MM/yyyy'
									label='Class Date'
									value={this.state.classObj.start_date}
									onChange={(newValue) => {
										let temp = this.state.classObj;
										temp.start_date = newValue;
										this.setState({
											classObj: temp,
										});
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</div>
					</div>
				</>
			);
		}
	};

	isValid = () => {
		if (this.state.isRecur) {
			if (
				this.state.selectedDays.length === 0 ||
				this.state.classObj.start_time === "" ||
				this.state.classObj.end_time === ""
			)
				return false;
			else return true;
		} else {
			if (
				!this.state.classObj.start_date ||
				this.state.classObj.start_time === "" ||
				this.state.classObj.end_time === ""
			)
				return false;
			else return true;
		}
	};

	submit = async () => {
		const formData = new FormData();
		var start_date = new Date(this.state.classObj.start_date);
		var end_date = new Date(this.state.classObj.end_date);
		formData.append("name", this.state.class_name);
		formData.append("school_id", this.state.school_id.toString());
		formData.append("type", this.state.isRecur ? "daily" : "one-day");
		formData.append("start_time", this.state.classObj.start_time);
		formData.append("end_time", this.state.classObj.end_time);
		formData.append("open_days", this.state.selectedDays);
		formData.append("start_date", start_date.toISOString());
		formData.append(
			"end_date",
			this.state.isRecur ? end_date.toISOString() : new Date().toISOString()
		);
		formData.append("logo", this.state.logo);

		if (this.isValid()) {
			this.props.LoadingActionFunc(true);

			let url = "school/" + this.state.school_id + "/class";
			await this.props.putClass(formData, url, this.state.class_id);

			if (this.props.classes.error) {
				this.setState({
					isCompleted: false,
					errorMsg: this.props.classes.error,
				});
				this.props.LoadingActionFunc(false);

			} else {
				if (this.props.classes.result && this.props.classes.result.data) {
					removeItem('class')
					setItemWithObject("class", this.props.classes.result.data);
					this.setState({
						isCompleted: true,
					});
				}
			}
		}
	};

	render() {
		const { isRecur, classObj, school_name, errorMsg, logo, class_name } =
			this.state;
		return (
			<>
				<div className='wrapper'>
					{this.state.isCompleted === true && (
						<Navigate to='/manager/invite-coach' replace={true} />
					)}
					<div className='primary f-16 project-header'>
						<Link to='/manager/dashboard'>
							<span>My Report Cards</span>
						</Link>
					</div>
					<div className='container-cus'>
						<div className='content'>
							<div className='f-14 mb-32'>
								<Link
									to='/manager/add-class'
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
										logo
											? process.env.REACT_APP_API_ENDPOINT + "/" + logo
											: placeholder
									}
									alt='logo'
									className={`${logo ? "item-icon" : "w-48"}`}
								/>
								<span className='f-16 '>
									{class_name} ({school_name})
								</span>
							</div>
							<div className='hr mb-16'></div>
							<div className='f-32 fw-500 mb-16'>
								<span>Set date and time.</span>
							</div>
							<div className='f-16 mb-32 fw-400'>
								<span>Create a recurring class or a one-time class.</span>
							</div>
							<div className='mb-32'>
								<Stack direction='row' spacing={1} alignItems='center'>
									<AntSwitch
										inputProps={{ "aria-label": "ant design" }}
										value={isRecur}
										checked={isRecur}
										onChange={this.isRecurChanged}
									/>
									<Typography className='f-16'>
										Set as reccuring class
									</Typography>
								</Stack>
							</div>
							{this.renderByIsRecur()}

							<div className='mb-32 flex'>
								<div className='col-6'>
									<TextField
										id='time'
										label='Time Start'
										type='time'
										value={classObj.start_time}
										InputLabelProps={{
											shrink: true,
										}}
										inputProps={{
											step: 300, // 5 min
										}}
										sx={{ width: 208, height: 80 }}
										onChange={this.valueChangedTimeStart}
									/>
								</div>
								<div className='col-6'>
									<TextField
										id='time'
										label='Time End'
										type='time'
										value={classObj.end_time}
										InputLabelProps={{
											shrink: true,
										}}
										inputProps={{
											step: 300, // 5 min
										}}
										sx={{ width: 208, height: 80 }}
										onChange={this.valueChangedTimeEnd}
									/>
								</div>
							</div>
							{errorMsg && <p className='text-danger'>{errorMsg}</p>}
							<div className='right flex align-center'>
								<span className='secondary mr-16'>2 of 4</span>

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
	classes,
}: StoreState): {
	classes: any;
} => {
	return {
		classes,
	};
};

export default connect(mapStateToProps, {
	postClass,
	putClass,
	getClassObject,
	LoadingActionFunc
})(SetDateTime);
