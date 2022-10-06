import React from "react";
import { connect } from "react-redux";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import ProfileContainer from "../../atoms/ProfileContainer";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { Modal } from "react-bootstrap";
import { getMyAttendByRange } from "../../stores/actions";
import { CreateProfile } from "../../atoms/createProfile";
import moment from "moment";
import ListBoxUI from "../../molecules/ListBox";
import ListItem from "../../atoms/ListItem";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MonthPicker } from "@mui/x-date-pickers-pro";
import { Typography, TextField } from "@mui/material";
interface IStates {
	filterText: string;
	selectBox: number;
	selectedClass: any;
	modalShow: boolean;
	selectedMonth: any;
}

interface IProps {
  authUser: AuthInterface
  classe: any
  attendance: any
  getMyAttendByRange: Function
  history: any;
}

class StudentAttendanceList extends React.Component<IProps, IStates> {
	id: any;
	constructor(props: any) {
		super(props);
		this.state = {
			selectedMonth: moment(new Date()).format("YYYY-MM-DD"),
			filterText: "",
			selectBox: 0,
			selectedClass: this.props.classe?.viewClass
				? this.props.classe.viewClass
				: {},
			modalShow: false,
		};
	}
	componentDidMount() {
		if (!this.props.authUser.otherUserinfo || !this.props.authUser.userInfo) {
			console.log("enter");

			this.props.history.back();
		} else {
			this.getMyAttendance(this.state.selectedMonth);
		}
	}

	getMyAttendance = async (date: any) => {
		console.log("attend");
		let changed_date = moment(date).format("YYYY-MM-DD");
		const student = this.props.authUser.otherUserinfo;
		if (this.props && this.props.authUser.userInfo?.assign_class.length > 0) {
			if (this.props.authUser.userInfo?.assign_class[0].classes) {
				const selected = this.state.selectedClass?.id
					? this.state.selectedClass
					: this.props.authUser.userInfo?.assign_class[0].classes;
				this.setState({
					...this.state,
					selectedClass: selected,
					selectBox: selected.id,
				});
				await this.props.getMyAttendByRange(student.id, changed_date);
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

	studentCallback = (id: any) => {
		this.props.history.push("/coach/dashboard/profile-detail/" + id);
	};

	render() {
		const { userInfo, otherUserinfo } = this.props.authUser;
		const { attandance_list } = this.props.attendance;
		const { selectedClass, selectBox } = this.state;
		const count = (attandance_list || []).reduce(
			(counter: any, attandance: any) =>
				attandance.attend ? (counter += 1) : counter,
			0
		);
		return (
			<div className='wrapper-mobile bg-w'>
				<div className='content-mobile-cus-space col-sm-12'>
					<CoachMobileHeader
						backBtn={true}
						filterBtn={true}
						callback={() => {
							this.setState({
								...this.state,
								modalShow: true,
							});
						}}
					/>
					{/* <div className='mini-profile pt-24'>
						<div className='img-profile'>
							<CreateProfile
								image_url={selectedClass?.logo}
								name={selectedClass?.name || "User"}
							/>
						</div>
						<div className='profile-name'>{selectedClass?.name}</div>
					</div> */}
					<ProfileContainer
						title={moment(this.state.selectedMonth, "YYYY-MM-DD").format(
							"MMM YYYY"
						)}
						display_item={[
							{ value: otherUserinfo?.name, title: "Student" },
							{
								title: "Classes Attended",
								value: `${count}/${attandance_list?.length} classes`,
							},
						]}
					/>
					<div className='mb-8'>
						<ListBoxUI title='Attendance' callback={() => {}}>
							{attandance_list?.length > 0 ? (
								<>
									{/* callback: () => console.log("log click item"),
                  smallText: "",
                  icon: <CreateProfile image_url={attend.user.avatar} name={attend.user.name || attend.user.email} />,
                  secondryText: true,
                  isBigIcon: false,
                  id: attend.id,
                  selectable: true,
                  checked: attend.attend,
                      userId: attend.user_id  */}
									{attandance_list.map((attend: any, index: any) => {
										return (
											<ListItem
												text={attend.classes?.name}
												callback={() => {}}
												icon={
													<CreateProfile
														image_url={attend.classes?.logo}
														name={attend.classes?.name || ""}
													/>
												}
												secondryText={true}
												selectable={true}
												checked={attend.attend}
												key={`student${index}`}
											>
												<>
													<AccessTimeOutlinedIcon fontSize='small' />
													<label>
														{moment(attend.record_date).format("D MMM")}
													</label>
												</>
											</ListItem>
										);
									})}
								</>
							) : (
								<></>
							)}
						</ListBoxUI>
					</div>
					<Modal
						dialogClassName={"custom-modal-filter"}
						show={this.state.modalShow}
						fullscreen={true}
						onHide={() => {
							this.setState({
								...this.state,
								modalShow: false,
							});
						}}
					>
						<Modal.Body className='p-16'>
							<div className='pl-8 pr-8'>
								<div className='filter-tile pt-16 pb-16 '>Filter by</div>
								<div className={`input-form-atom`}>
									<div className='label-con'>
										<label>Month</label>
									</div>
									<div className='dropdown-box'>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
											className='dropdown-box'
										>
											<MonthPicker
												date={new Date()}
												onChange={(newValue) => {
													this.setState({
														selectedMonth: newValue,
													});
												}}
											></MonthPicker>
											{/* <DatePicker
											openTo='year'
											views={["year", "month"]}
											label='Year and Month'
											minDate={new Date("2012-03-01")}
											maxDate={new Date("2050-06-01")}
											value={this.state.selectedMonth}
											onChange={(newValue) => {
												this.setState({
													selectedMonth: newValue,
												});
											}}
											renderInput={(params) => (
												<TextField {...params} helperText={null} />
											)}
										/> */}
										</LocalizationProvider>
									</div>
								</div>
							</div>
							<button
								type='submit'
								className='mt-40 mt-16 btn btn-primary right w-100'
								onClick={() => {
									this.getMyAttendance(this.state.selectedMonth);
									this.setState({
										...this.state,

										modalShow: false,
									});
								}}
							>
								Confirm
							</button>
						</Modal.Body>
					</Modal>
				</div>
			</div>
		);
	}
}
const mapStateToProps = ({
  authUser,
  classes,
  attendance
}: StoreState): {
  authUser: AuthInterface,
  classes: any
  attendance: any
} => {
  return {
    authUser,
    classes,
    attendance
  };
};

export default connect(mapStateToProps, { getMyAttendByRange })(StudentAttendanceList);
// export default CoachCommentsPage;