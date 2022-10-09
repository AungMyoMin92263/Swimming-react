import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import ListItem, { IListItem } from "../../atoms/ListItem";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { getItem } from "../../auth/LocalStorage";
import { Modal } from "react-bootstrap";
import { Class } from "../../stores/model/class";
import { getclassesByDateRange } from "../../stores/actions/class-action";
import { ClassRangeInterface } from "../../stores/model/class-interface";
import placeholder from "../../assets/images/place-holder.png";
import { ClassInterface } from "./../../stores/model/class-interface";
import { Navigate } from "react-router-dom";
import ListBoxUI from "../../molecules/ListBox";
import moment from "moment";
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
	lastDate: any;
	noClass: boolean;
	noClassOld: boolean;
	noMoreData: boolean;
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
			lastDate: new Date().toISOString(),
			noClass: false,
			noClassOld: false,
			noMoreData: false,
		};
	}
	classCallback = (id: any, date: any) => {
		this.setState({ goClass: true });
		this.urlClass = "/student/dashboard/daily-program/" + id + "/?date=" + date;
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
					await this.setState({
						schoolId: user.userInfo.assign_class[0].classes.school_id,
					});
					this.getClassbyDateR();
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
	newDateOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	};

	getClassbyDateR = async () => {
		console.log("this.state.lastDate", this.state.lastDate);
		let url =
			"school/" +
			this.state.schoolId +
			"/class/by-date-range?date=" +
			this.state.lastDate +
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
						if (tempObj[i].start_time < new Date()) {
						}
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
			let date = moment(
				this.props.classListR.result[this.props.classListR.result.length - 1]
					.date
			)
				.utc()
				.format();
			if (this.state.pastClasses) {
				let newDate = moment(date).subtract(1, "d").toISOString();
				this.setState({
					lastDate: newDate,
				});
			} else {
				let newDate = moment(date).add(1, "d").toISOString();
				this.setState({
					lastDate: newDate,
				});
			}

			this.setState({
				classList: temp,
			});
		} else {
			this.setState({
				noMoreData: true,
			});
		}
	};
	handleOptionChange = (e: any) => {
		console.log("haenlelee", e.target.value);
		if (e.target.value === "past") {
			this.setState({
				lastDate: new Date().toISOString(),
				pastClasses: true,
				noMoreData: false,
			});
		} else if (e.target.value === "upcoming") {
			this.setState({
				lastDate: new Date().toISOString(),
				pastClasses: false,
				noMoreData: false,
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
	}

	noClassFunc = () => {
		this.setState({
			noClass: true,
		});
		return <></>;
	};

	noClassOldFunc = () => {
		this.setState({
			noClassOld: true,
		});
		return <></>;
	};

	render() {
		const { classList, goClass } = this.state;

		return (
			<>
				{goClass && <Navigate to={this.urlClass} replace={true} />}

				<div className='wrapper-mobile'>
					<div className='content-mobile-cus-space bg-w  col-sm-12'>
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
						{!this.state.pastClasses
							? classList &&
							  classList.length > 0 &&
							  classList.map((classes: any) => (
									<div className='mb-8'>
										{moment(classes.date).format(moment.HTML5_FMT.DATE) !==
										moment(new Date()).format(moment.HTML5_FMT.DATE) ? (
											<ListBoxUI
												title={classes.date}
												callback={() => {}}
												more={false}
												noBtn={true}
											>
												<>
													{classes.list &&
														classes.list.length > 0 &&
														classes.list.map((classe: any, index: any) => (
															<ListItem
																{...classe.obj}
																callback={() =>
																	this.classCallback(classe.id, classes.date)
																}
																arrowRight={true}
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
											</ListBoxUI>
										) : (
											<>
												{this.state.noClass ? (
													<></>
												) : (
													<ListBoxUI
														title={classes.date}
														callback={() => {}}
														more={false}
														noBtn={true}
													>
														<>
															{classes.list &&
																classes.list.length > 0 &&
																classes.list.map((classe: any, index: any) =>
																	moment(classe.start_time, "hh:mm") >
																	moment(new Date()) ? (
																		<ListItem
																			{...classe.obj}
																			callback={() =>
																				this.classCallback(
																					classe.id,
																					classes.date
																				)
																			}
																			arrowRight={true}
																		>
																			<WatchLaterIcon />
																			<label>
																				{moment(
																					classe.start_time,
																					"hh:mm"
																				).format("hh:mm A")}
																			</label>
																		</ListItem>
																	) : (
																		<>{this.noClassFunc()}</>
																	)
																)}
														</>
													</ListBoxUI>
												)}
											</>
										)}
									</div>
							  ))
							: classList &&
							  classList.length > 0 &&
							  classList.map((classes: any) => (
									<div className='mb-8'>
										{moment(classes.date).format(moment.HTML5_FMT.DATE) !==
										moment(new Date()).format(moment.HTML5_FMT.DATE) ? (
											<ListBoxUI
												title={classes.date}
												callback={() => {}}
												more={false}
												noBtn={true}
											>
												<>
													{classes.list &&
														classes.list.length > 0 &&
														classes.list.map((classe: any, index: any) => (
															<ListItem
																{...classe.obj}
																callback={() =>
																	this.classCallback(classe.id, classes.date)
																}
																arrowRight={true}
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
											</ListBoxUI>
										) : (
											<>
												{this.state.noClassOld ? (
													<></>
												) : (
													<ListBoxUI
														title={classes.date}
														callback={() => {}}
														more={false}
														noBtn={true}
													>
														<>
															{classes.list &&
																classes.list.length > 0 &&
																classes.list.map((classe: any, index: any) =>
																	moment(classe.start_time, "hh:mm") <
																	moment(new Date()) ? (
																		<ListItem
																			{...classe.obj}
																			callback={() =>
																				this.classCallback(
																					classe.id,
																					classes.date
																				)
																			}
																			arrowRight={true}
																		>
																			<WatchLaterIcon />
																			<label>
																				{moment(
																					classe.start_time,
																					"hh:mm"
																				).format("hh:mm A")}
																			</label>
																		</ListItem>
																	) : (
																		<>{this.noClassOldFunc()}</>
																	)
																)}
														</>
													</ListBoxUI>
												)}
											</>
										)}
									</div>
							  ))}
						{!this.state.noMoreData && (
							<span
								className='f-10 fc-primary flex-center cursor m-16'
								onClick={() => this.getClassbyDateR()}
							>
								Load More
							</span>
						)}
					</div>
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
									classList: [],
								});
								this.getClassbyDateR();
							}}
						>
							Confirm
						</button>
					</Modal.Body>
				</Modal>
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

;
