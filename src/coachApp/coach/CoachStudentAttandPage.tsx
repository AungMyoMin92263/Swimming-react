import React from "react";
import { connect } from "react-redux";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import { CreateProfile } from "../../atoms/createProfile";
import { StoreState } from "../../stores/reducers";
import ListItem from "../../atoms/ListItem";
import moment from "moment";
import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import ListBoxUI from "../../molecules/ListBox";
import { createAttendance, getClassAttend } from "../../stores/actions";
import Modal from "react-bootstrap/Modal";
import InputFormAtom from "../../atoms/InputFormAtom";

interface IStates {
	classId: number;
	attendances: any[];
	modalShow: boolean;
	filterDate: string;
	isfilterDateValid: boolean;
	isfilterDateEmpty: boolean;
	filterDateMsg: string;
}

interface IProps {
	classes: any;
	attendance: any;
	history: any;
	getClassAttend: Function;
	createAttendance: Function;
}

class CoachStudentAttandPage extends React.Component<IProps, IStates> {
	id: any;
	urlDailyProgram = "";
	urlEnterComment = "";
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[4];
		this.state = {
			classId: this.id ? this.id : -1,
			attendances: [],
			modalShow: false,
			filterDate: moment().format("D MMM YYYY"),
			isfilterDateValid: true,
			isfilterDateEmpty: false,
			filterDateMsg: "",
		};
	}
	componentDidMount() {
		if (!this.props.classes.viewClass || this.props.classes.viewClass == null)
			this.props.history.back();
		else {
			this.getAttendancesByClass();
		}
	}

	createAttend = async () => {
		let userList = this.state.attendances.map((res) => {
			return {
				user_id: res.userId,
				attend: res.checked,
			};
		});
		await this.props.createAttendance({
			users: userList,
			class_id: parseInt(this.state.classId + ""),
		});
	};

	getAttendancesByClass = async () => {
		await this.props.getClassAttend(this.state.classId, this.state.filterDate);
		if (
			this.props.attendance &&
			this.props.attendance.attandance_list &&
			this.props.attendance.attandance_list.length > 0
		) {
			let tempAttendances = this.props.attendance.attandance_list;
			let res = tempAttendances.map((attend: any) => {
				return {
					text: attend.user.name? attend.user.name: attend.user.email,
					callback: () => console.log("log click item"),
					smallText: "",
					icon: (
						<CreateProfile
							image_url={attend.user.avatar}
							name={attend.user.name || attend.user.email}
						/>
					),
					secondryText: true,
					isBigIcon: false,
					id: attend.id,
					selectable: true,
					checked: attend.attend,
					userId: attend.user_id,
					chooseCallBack: async(check: any) => {
						let index = this.state.attendances.findIndex(
							(x: any) => x.id === attend.id
						);
						let temp = this.state.attendances;
						temp[index].checked = check;
						await this.setState({
							...this.state,
							attendances: temp,
						});
						this.createAttend();
					},
				};
			});
			this.setState({
				...this.state,
				attendances: res,
			});
		}
	};

	handleFilter =() =>{
		this.getAttendancesByClass()
		this.setState({modalShow:false})
	}

	render() {
		const { viewClass } = this.props.classes;
		let coaches = this.props.classes.assignUser.filter((user:any)=>  user.type==="coache").length
		let profile: IProfile = {
			isLogo: false,
			title: "Attendance",
			display_item: [
				{
					title: "Date",
					value: moment(this.state.filterDate).format("D MMM YYYY"),
				},
				{
					title: "Time",
					value: moment(viewClass?.start_time, "hh:mm").format("hh:mm A"),
				},
				{
					title: "Coaches",
					value: coaches,
				},
				{
					title: "No. Student",
					value: viewClass?.studentCount,
				},
			],
		};
		const {
			attendances,
			isfilterDateValid,
			isfilterDateEmpty,
			filterDateMsg,
			filterDate,
		} = this.state;
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
					></CoachMobileHeader>

					<div className='mini-profile pt-24'>
						<div className='img-profile'>
							<CreateProfile
								image_url={viewClass?.logo}
								name={viewClass?.name || "User"}
							/>
						</div>
						<div className='profile-name'>{viewClass?.name}</div>
					</div>
					{/* <div className='page-tile pt-16 pb-40'>
            <span>Attendance</span>
          </div> */}
					{/* Profile */}
					<ProfileContainer {...profile}></ProfileContainer>
					<div className='mb-8'>
						<ListBoxUI title='Attendance' callback={() => {}}>
							{attendances.length > 0 ? (
								<>
									{attendances.map((attand, index) => {
										return <ListItem {...attand} key={`student${index}`} />;
									})}
								</>
							) : (
								<></>
							)}
						</ListBoxUI>
					</div>
					{/* <button
						type='submit'
						className='btn btn-primary right w-100'
						onClick={() => this.createAttend()}
					>
						Done
					</button> */}
					<Modal
						dialogClassName={"custom-modal"}
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
								<InputFormAtom
									label='Badge Name'
									placeholder={"Enter badge name"}
									warning={filterDateMsg}
									type='text'
									showWarning={isfilterDateEmpty || !isfilterDateValid}
									isDropdown={false}
									callback={(value: string) => {
										this.setState({
											filterDate: value,
										});
									}}
									id='filterDate'
									name='filterDate'
									value={filterDate}
									required={true}
									maxLength={200}
									className=''
									clickCallback={() => {}}
									focusCallback={() => {
										this.setState({
											isfilterDateEmpty: false,
											isfilterDateValid: true,
										});
									}}
								/>
							</div>
							<button
								type='submit'
								className='mt-40 mt-16 btn btn-primary right w-100'
								onClick={() => {
									
									this.handleFilter()}}
							>
								Confirm
							</button>
						</Modal.Body>
					</Modal>
				</div>

				{/* List Personal */}
			</div>
		);
	}
}

const mapStateToProps = ({
	classes,
	attendance,
}: StoreState): {
	classes: any;
	attendance: any;
} => {
	return {
		classes,
		attendance,
	};
};

export default connect(mapStateToProps, { getClassAttend, createAttendance })(
	CoachStudentAttandPage
);
