import React from "react";
import { IPageProp } from "../../pagePropsInterface";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Typography, TextField, Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { flexbox } from "@mui/system";
interface IStates {
	isRecur: boolean;
	selectedDays: string[];
	isTimeStartEmpty: boolean;
	isTimeEndEmpty: boolean;
	classDate: Date | null;
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

var daysArray = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

class SetDateTime extends React.Component<IPageProp, IStates> {
	constructor(props: any) {
		super(props);

		this.state = {
			isRecur: false,
			selectedDays: [],
			isTimeStartEmpty: true,
			isTimeEndEmpty: true,
			classDate: new Date(),
		};
	}
	componentDidMount() {
		//loading
	}

	renderBtn = () => {
		if (this.state.isRecur) {
			if (
				this.state.selectedDays.length === 0 ||
				this.state.isTimeStartEmpty ||
				this.state.isTimeEndEmpty
			) {
				return (
					<button type='submit' className='idle-btn fw-600 ml-16'>
						Continue
					</button>
				);
			} else
				return (
					<Link to='/manager/set-date-time'>
						<button type='submit' className='primary-btn'>
							Continue
						</button>
					</Link>
				);
		} else {
			if (
				!this.state.classDate ||
				this.state.isTimeStartEmpty ||
				this.state.isTimeEndEmpty
			) {
				return (
					<button type='submit' className='idle-btn fw-600 ml-16'>
						Continue
					</button>
				);
			} else
				return (
					<Link to='/manager/set-date-time'>
						<button type='submit' className='primary-btn'>
							Continue
						</button>
					</Link>
				);
		}
	};

	isRecurChanged = () => {
		let temp = this.state.selectedDays;
		this.setState({
			selectedDays: temp,
			isRecur: !this.state.isRecur,
		});
	};


	handleChange = (day:string) => {
    console.log("clicked")
		let temp = this.state.selectedDays;
		let index = temp.findIndex((d) => d === day);
		if (index > -1) {
			temp.splice(index, 1);
		} else {
			temp.push(day);
		}
		this.setState({
			selectedDays: temp,
		});
		console.log("days", this.state.selectedDays);
	};


	renderDay = (day: string) => {
    let temp = this.state.selectedDays;
		let index = temp.findIndex((d) => d === day);
		if (index > -1) {
			return (
				<div
					style={{
						width: 40,
						height: 40,
						backgroundColor: "var(--primary)",
						color: "#fff",
						borderRadius: "50%",
						padding: "5px",
						textAlign: "center",
						marginRight: 8,
						cursor: "pointer",
					}}
					onClick={() => this.handleChange(day)}
				>
					{day}
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
						padding: "5px",
						textAlign: "center",
						marginRight: 8,
            cursor:'pointer'
					}}
					onClick={() => this.handleChange(day)}
				>
					{day}
				</div>
			);
		}
	};

	renderByIsRecur = () => {
		if (!this.state.isRecur) {
			return (
				<div className='mb-32'>
					<span className='f-12 mb-8 flex-column'>Days</span>
					<div className='justify-start'>
						{daysArray.map((day) => this.renderDay(day))}
					</div>
				</div>
			);
		} else {
			return (
				<div className='mb-32'>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							label='Class Date'
							value={this.state.classDate}
							onChange={(newValue) => {
								this.setState({
									classDate: newValue,
								});
							}}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</div>
			);
		}
	};

	render() {
		const {
			isRecur,
			selectedDays,
			isTimeStartEmpty,
			isTimeEndEmpty,
			classDate,
		} = this.state;
		return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<span>My Report Cards</span>
					</div>
					<div className='container-cus'>
						<div className='content'>
							<div className='f-14 mb-32'>
								<Link to='/admin/welcome' style={{ textDecoration: "none" }}>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								</Link>
							</div>
							<div className='mb-16 flex'>
								<img
									src={"/assets/icons/logo.png"}
									alt='right-arrow'
									className='item-icon'
								/>
								<span className='f-16 '>
									Pro Youth Morning (Dorphin swimming school)
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
										defaultChecked
										inputProps={{ "aria-label": "ant design" }}
										value={isRecur}
										onChange={this.isRecurChanged}
									/>
									<Typography className='f-16'>
										Set as reccuring class
									</Typography>
								</Stack>
							</div>
							{this.renderByIsRecur()}

							<div className='row mb-32'>
								<div className='col-6'>
									<TextField
										id='time'
										label='Time Start'
										type='time'
										defaultValue='09:00'
										InputLabelProps={{
											shrink: true,
										}}
										inputProps={{
											step: 300, // 5 min
										}}
										sx={{ width: 208, height: 80 }}
									/>
								</div>
								<div className='col-6'>
									<TextField
										id='time'
										label='Time End'
										type='time'
										defaultValue='10:00'
										InputLabelProps={{
											shrink: true,
										}}
										inputProps={{
											step: 300, // 5 min
										}}
										sx={{ width: 208, height: 80 }}
									/>
								</div>
							</div>

							<div className='right'>
								<span className='secondary'>2 of 4</span>
								{this.renderBtn()}
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default SetDateTime;
