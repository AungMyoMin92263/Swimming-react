import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import ListItem, { IListItem } from "../../atoms/ListItem";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { getItem } from "../../auth/LocalStorage";
import { Class } from "../../stores/model/class";
import { getclassesByDateRange } from "../../stores/actions/class-action";
import { ClassRangeInterface } from "../../stores/model/class-interface";
import placeholder from "../../assets/images/place-holder.png";
import { ClassInterface } from "./../../stores/model/class-interface";
import ListBoxUI from "../../molecules/ListBox";
import { Navigate } from "react-router-dom";
import moment from "moment";
import { Modal } from "react-bootstrap";
interface IStates {
	step: number;
	user_name: string;
	user_id: number;
	schoolId: any;
	classList: any[];
	classesobj: any;
	goClass: boolean;
	modalShow: boolean;
	pastClasses: boolean;
}

interface IProps {
  authUser: AuthInterface;
  getclassesByDateRange: Function;
  classListR: any;
}

class StudentClassesPage extends React.Component<IProps, IStates> {
	path: any;
	date: any;
	urlClass: any;
	urlStudent: any;

	constructor(props: any) {
		super(props);

		this.state = {
			pastClasses: false,
			step: 0,
			goClass: false,
			user_name: "",
			user_id: -1,
			schoolId: -1,
			classList: [],
			classesobj: [],
			modalShow: false,
		};
	}
	classCallback = (id: any, date: any) => {
		console.log("id", id);
		this.setState({ goClass: true });
		this.urlClass =
			"/student/class-list/daily-program/" + id + "/?date=" + date;
	};

	getDatesInRange(startDate: Date, endDate: Date) {
		const date = new Date(startDate.getTime());
		const dates = [];
		while (date <= endDate) {
			dates.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}
		return dates;
	}

	getAuthFromLocal = async () => {
		let user = JSON.parse(getItem("authUser") || "null");
		if (user && user.userInfo) {
			this.setState({
				user_id: user.userInfo.id,
				user_name: user.userInfo.name,
			});

			if (user.userInfo.assign_class && user.userInfo.assign_class.length > 0) {
				if (user.userInfo.assign_class[0].classes) {
					this.setState({
						schoolId: user.userInfo.assign_class[0].classes.school_id,
					});
				}
			}
		}
	};

	displayMonth = (month: number) => {
		switch (month) {
			case 0:
				return "January";
			case 1:
				return "February";
			case 2:
				return "March";
			case 3:
				return "April";
			case 4:
				return "May";
			case 5:
				return "Jun";
			case 6:
				return "July";
			case 7:
				return "August";
			case 8:
				return "September";
			case 9:
				return "October";
			case 10:
				return "November";
			case 11:
				return "December";
		}
	};

	getClassbyDateR = async () => {
        await this.setState({
					classList: [],
				});
		let url =
			"school/" +
			1 +
			"/class/by-date-range?date=" +
			new Date().toISOString() +
			"&count=5&" +
			"past=" +
			this.state.pastClasses;

		await this.props.getclassesByDateRange(url);
		this.setDataComponents();
	};

	setDataComponents = async () => {
		if (
			this.props.classListR.result &&
			this.props.classListR.result.length > 0
		) {
			let temp = this.state.classList;
			this.props.classListR.result.map((classesObj: any) => {
				let tempObj: any[] = classesObj.class_list || [];
				if (tempObj.length > 0) {
					let tempInnerList = [];
					for (let i = 0; i < tempObj.length; i++) {
						tempInnerList.push({
							obj: {
								text: tempObj[i].name,
								callback: () => console.log("log click item"),
								smallText: "",
								icon: (
									<img
										src={
											tempObj[i].logo
												? process.env.REACT_APP_API_ENDPOINT +
												  "/" +
												  tempObj[i].logo
												: placeholder
										}
										className='logo-icon'
										alt=''
									/>
								),
								secondryText: true,
								isBigIcon: false,
							},
							start_time: tempObj[i].start_time,
							id: tempObj[i].id,
						});
					}
					temp.push({
						list: tempInnerList,
						date: classesObj.date,
					});
				}
			});
			this.setState({
				classList: temp,
			});
		}
	};
	handleOptionChange = (e: any) => {
		console.log("haenlelee", e.target.value);
		if (e.target.value === "past") {
			this.setState({
				pastClasses: true,
			});
		} else if (e.target.value === "upcoming") {
			this.setState({
				pastClasses: false,
			});
		}
	};

	componentDidMount() {
		this.date =
			"Today, " +
			new Date().getDate() +
			" " +
			this.displayMonth(new Date().getMonth());
		this.getAuthFromLocal();
		this.getClassbyDateR();
	}

	render() {
		const { classList, goClass } = this.state;

		return (
			<>
				{goClass && <Navigate to={this.urlClass} replace={true} />}

				<div className='wrapper-mobile bg-w'>
					<div className='content-mobile col-sm-12'>
						<div className='f-32 fw-500 flex'>
							<span className='mt-16'> Classes </span>
							<CoachMobileHeader
								filterBtn={true}
								callback={() => {
									this.setState({
										...this.state,
										modalShow: true,
									});
								}}
							/>
						</div>
						{classList && classList.length > 0 ? (
							classList.map((classes: any) => (
								<div className='mb-8'>
									<ListBoxUI
										title={classes.date}
										callback={() => {}}
										more={false}
										noBtn={true}
									>
										<>
											<>
												{classes.list &&
													classes.list.length > 0 &&
													classes.list.map((classe: any) => (
														<ListItem
															{...classe.obj}
															callback={() =>
																this.classCallback(classe.id, classes.date)
															}
														>
															<WatchLaterIcon />
															<label>
																{moment(classe.start_time, "hh:mm").format(
																	"hh:mm A"
																)}
															</label>
														</ListItem>
													))}
											</>
										</>
									</ListBoxUI>
								</div>
							))
						) : (
							<ListBoxUI
								title={"Classes"}
								callback={() => {}}
								more={false}
								noBtn={true}
							>
								<></>
							</ListBoxUI>
						)}
					</div>
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
								<div className='flex-column'>
									<div className='mt-16'>
										<input
											type='radio'
											value='upcoming'
											checked={!this.state.pastClasses}
											className='mr-8'
											onChange={this.handleOptionChange}
										/>
										<label htmlFor='upcoming classes' className='f-16 fw-400'>
											Upcoming Classes
										</label>
									</div>
									<div className='mt-16'>
										<input
											type='radio'
											value='past'
											checked={this.state.pastClasses}
											className='mr-8'
											onChange={this.handleOptionChange}
										/>
										<label htmlFor='past classes'>Past Classes</label>
									</div>
								</div>
							</div>
							<button
								type='submit'
								className='mt-40 mt-16 btn btn-primary right w-100'
								onClick={() => {
									this.setState({
										...this.state,

										modalShow: false,
									});
									this.getClassbyDateR();
								}}
							>
								Confirm
							</button>
						</Modal.Body>
					</Modal>
				</div>
			</>
		);
	}
}

const mapStateToProps = ({
  authUser,
  classListR,
}: StoreState): {
  authUser: AuthInterface;
  classListR: any;
} => {
  return {
    authUser,
    classListR,
  };
};

export default connect(mapStateToProps, { getclassesByDateRange })(
  StudentClassesPage
);
