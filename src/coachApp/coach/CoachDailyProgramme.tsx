import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";
import {
	getClassObject,
	getAll,
	getClassProgram,
	postClassProgram,
	getAssignUserByClass,
} from "../../stores/actions";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import ListItem, { IListItem } from "../../atoms/ListItem";
import CommentItem, { ICommentItem } from "../../atoms/Comment";
import { InitialIcon } from "../../atoms/InitialIcon";
import { Link, Navigate } from "react-router-dom";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { getItem } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import { ClassProgramInterface } from "../../stores/model/class-interface";
import moment from "moment";
import ListBoxUI from "../../molecules/ListBox";
import { Button } from "react-bootstrap";
interface IStates {
	step: number;
	image: any;
	schoolId: any;
	id: any;
	classe: any;
	coaches: any[];
	attendances: any[];
	comments: any[];
	goAllComments: boolean;
	goEnterComment: boolean;
	profile: IProfile;
	classProgram: any;
	isPreview: boolean;
}

interface IProps {
	authUser: AuthInterface;
	getClassObject: Function;
	postClassProgram: Function;
	getClassProgram: Function;
	getAssignUserByClass: Function;
	classes: any;
	getAll: Function;
	response: any;
	history: any;
}

class CoachDailyProgramPage extends React.Component<IProps, IStates> {
	id: any;
	urlComments: any;
	urlEnterComment: any;
	minuteObj: any = {
		first_slot: 0,
		second_slot: 10,
		third_slot: 20,
	};
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[4];
		this.state = {
			step: 0,
			image: { preview: "", raw: "" },
			schoolId: -1,
			id: this.id ? this.id : -1,
			classe: { start_date: null },
			coaches: [],
			attendances: [],
			comments: [],
			classProgram: null,
			goAllComments: false,
			goEnterComment: false,
			profile: { title: "Dummy" },
			isPreview: false,
		};
	}
	componentDidMount() {
		this.authFromLocal();
	}

	authFromLocal = async () => {
		let user = JSON.parse(getItem("authUser") || "null");
		if (user && user.userInfo) {
			if (user.userInfo.assign_class && user.userInfo.assign_class.length > 0) {
				if (user.userInfo.assign_class[0].classes) {
					await this.setState({
						...this.state,
						schoolId: user.userInfo.assign_class[0].classes.school_id,
					});

					await this.getClass();
					await this.getCoachesByClass();
					await this.getAttendancesByClass();
					await this.getClassProgram();
				}
			}
		}
	};

	getClass = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		let date = urlParams.get("date")
			? urlParams.get("date")
			: moment(new Date(), "YYYY-MM-DD").toISOString();
		let url =
			"school/" +
			this.state.schoolId +
			"/class/" +
			this.state.id +
			"?date_string=" +
			date;
		await this.props.getClassObject(url, true);
		if (this.props.classes && this.props.classes.viewClass) {
			let comment = [];
			let profile: IProfile = {
				isLogo: true,
				logo: this.props.classes.viewClass.logo,
				title: this.props.classes.viewClass.name,
				display_item: [
					{
						title: "Date",
						value: moment(date, "YYYY-MM-DD").format("D MMM YYYY"),
					},
					{
						title: "Start Time",
						value: moment(
							this.props.classes.viewClass.start_time,
							"hh:mm"
						).format("hh:mm A"),
					},
					{
						title: "No. Student",
						value: this.props.classes.viewClass.studentCount,
					},
					{
						title: "End Time",
						value: moment(
							this.props.classes.viewClass.end_time,
							"hh:mm"
						).format("hh:mm A"),
					},
				],
			};
			// if(this.props.classes.viewClass.comments){
			//   comment
			// }
			this.setState({
				...this.state,
				classe: this.props.classes.viewClass,
				profile: profile,
			});
		}
	};

	getCoachesByClass = async () => {
		let url = "assigned/class/by-class/" + this.state.id;
		await this.props.getAssignUserByClass(url);
	};

	getAttendancesByClass = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		let date = urlParams.get("date") || new Date().toISOString();
		let url = "attendance/byClass/" + this.state.id + "?record_date=" + date;
		await this.props.getAll(url);
		if (
			this.props.response &&
			this.props.response.result &&
			this.props.response.result.length > 0
		) {
			let tempAttendances = this.props.response.result;
			let res = [];
			for (let i = 0; i < tempAttendances.length; i++) {
				res.push({
					text: tempAttendances[i].user.name
						? tempAttendances[i].user.name
						: tempAttendances[i].user.email,
					callback: () => console.log("log click item"),
					smallText: "",
					icon: tempAttendances[i].user.avatar ? (
						<img
							src={
								process.env.REACT_APP_API_ENDPOINT +
								"/" +
								tempAttendances[i].user.avatar
							}
							className='logo-icon'
						/>
					) : (
						<InitialIcon
							initials={(
								tempAttendances[i].user.name ||
								tempAttendances[i].user.email ||
								"User"
							)
								.substr(0, 1)
								.toUpperCase()}
							isFooterMenu={true}
						/>
					),
					secondryText: true,
					isBigIcon: false,
					selectable: true,
					checked: tempAttendances[i].attend,
				});
			}
			this.setState({
				...this.state,
				attendances: res,
			});
		}
	};

	upload = () => {
		console.log("upload", this.state.image);
	};

	handleChange = async (e: any) => {
		var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
		if (!allowedExtensions.exec(e.target.files[0].name)) {
			alert("Invalid file type");
		} else {
			if (e.target.files.length) {
				let temp = this.state.image;
				temp.preview = URL.createObjectURL(e.target.files[0]);
				temp.raw = e.target.files[0];
				await this.postClassProgram(this.state.id, temp.raw);
				// this.setState({
				//   image: temp,
				// });
			}
		}
	};

	postClassProgram = async (id: number, file: any) => {
		let url = "class-daily/" + id + "/program";
		const urlParams = new URLSearchParams(window.location.search);
		let date = urlParams.get("date")
			? urlParams.get("date")
			: new Date().toISOString();
		let oldId = this.state.classProgram ? this.state.classProgram.id : 0;
		let postData: ClassProgramInterface = {
			logo: file,
			upload_date: date || "",
			id: oldId,
		};

		await this.props.postClassProgram(postData, url);
		this.setState({
			...this.state,
			classProgram: this.props.classes.dailyProgram,
		});
	};

	getClassProgram = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		let date = urlParams.get("date")
			? urlParams.get("date")
			: new Date().toISOString();
		let url = "class-daily/" + this.state.id + "/program?req_date=" + date;
		await this.props.getClassProgram(url);
		if (this.props.classes && this.props.classes.dailyProgram) {
			this.setState({
				...this.state,
				classProgram: this.props.classes.dailyProgram,
			});
		}
	};

	goToAllComments = (id: any) => {
		// this.setState({ goAllComments: true });
		let cmdUrl = "/coach/dashboard/all-comments/" + id + "/class";
		this.props.history.push(cmdUrl);
	};

	goToEnterComments = (id: any) => {
		this.setState({ goEnterComment: true });
		this.urlEnterComment = "/coach/dashboard/enter-comments/" + id + "/class";
	};

	createProfile = (image_url: string, name: string, isXs?: boolean) => {
		if (image_url) {
			return (
				<img
					src={
						image_url
							? process.env.REACT_APP_API_ENDPOINT + "/" + image_url
							: ""
					}
					className='logo-icon'
					alt=''
				/>
			);
		} else {
			return (
				<InitialIcon
					initials={name.substr(0, 1).toUpperCase()}
					isFooterMenu={true}
					isXs={true}
				/>
			);
		}
	};

	render() {
				const urlParams = new URLSearchParams(window.location.search);
		let date = urlParams.get("date") || moment(new Date()).format("YYYY-MM-DD")
		let item: IListItem = {
			text: "Joseph",
			callback: () => console.log("log click item"),
			smallText: "",
			icon: (
				<>
					<InitialIcon initials={"J"} isFooterMenu={false} />
				</>
			),
			secondryText: false,
			isBigIcon: false,
		};

		const {
			classe,
			attendances,
			coaches,
			goAllComments,
			goEnterComment,
			profile,
			classProgram,
			isPreview,
		} = this.state;

		return (
			<>
				{goAllComments && <Navigate to={this.urlComments} replace={true} />}
				{goEnterComment && (
					<Navigate to={this.urlEnterComment} replace={true} />
				)}

				<div className='wrapper-mobile bg-w'>
					<div className='content-mobile-cus-space col-sm-12'>
						<CoachMobileHeader backBtn={true}></CoachMobileHeader>
						<ProfileContainer {...profile}></ProfileContainer>
						<div className='mb-8'>
							<ListBoxUI
								title='Daily Program'
								callback={() => {}}
								callback2={() => {}}
								noBtn={true}
							>
								{classProgram && classProgram.image_url !== "" ? (
									<>
										<Button
											className='preview-icon-btn'
											onClick={() => this.setState({ isPreview: true })}
										>
											<OpenInFullIcon
												sx={{ color: "#FFF", fontSize: 24, m: "auto" }}
											></OpenInFullIcon>
										</Button>
										<img
											src={
												process.env.REACT_APP_API_ENDPOINT +
												"/" +
												classProgram.image_url
											}
											alt='preview'
											className='daily-programme-image'
										/>

										<div style={{ marginTop: "-60px", paddingBottom: "16px" }}>
											<label htmlFor='fileUpload' className='width-100'>
												<div className='width-100 flex justify-space-around cursor-pointer  center'>
													<div
														className='shadow pt-2 pb-2 pl-3 pr-3 bg-white round-btn'
														style={{ marginTop: "-16px" }}
													>
														<span className='primary f-14'>Reupload</span>{" "}
														<FileUploadOutlinedIcon
															sx={{ color: "#0070F8", ml: 0.5 }}
														/>
													</div>
												</div>
												<input
													type='file'
													id='fileUpload'
													style={{ display: "none" }}
													onChange={this.handleChange}
												/>
											</label>
										</div>
									</>
								) : (
									<div className='file-upload'>
										<label htmlFor='fileUpload' className='cursor-pointer'>
											Tap to Upload
										</label>
										<FileUploadOutlinedIcon />
										<input
											type='file'
											id='fileUpload'
											style={{ display: "none" }}
											onChange={this.handleChange}
										/>
									</div>
								)}
							</ListBoxUI>
						</div>
						{this.props.classes.assignUser.length > 0 ? (
							<div className='mb-8'>
								<ListBoxUI
									title='Coaches'
									callback={() => {}}
									callback2={() => {}}
									noBtn={true}
								>
									<>
										{this.props.classes.assignUser
											?.filter((coach: any) => coach.type === "coache")
											.map((coach: any, index: any) => {
												return (
													<ListItem
														text={coach.user.name || coach.user.email}
														callback={() => {this.props.history.push("/coach/coach/profile/"+ coach.user_id);}}
														key={`coache${index}`}
														icon={
															<>
																<InitialIcon
																	isFooterMenu={true}
																	initials={(
																		coach.user.name ||
																		coach.user.email ||
																		"User"
																	)
																		.substr(0, 1)
																		.toUpperCase()}
																/>
															</>
														}
														arrowRight={true}
													/>
												);
											})}
									</>
								</ListBoxUI>
							</div>
						) : (
							<></>
						)}
						<div className='mb-8'>
							<ListBoxUI
								title='Post-Class Slots'
								callback={() => this.goToAllComments(this.state.classe.id)}
								callback2={() => {}}
								noBtn={true}
								// more2={true}
							>
								<>
									{classe?.class_slot?.map((slot: any, index: any) => {
										let min: number = this.minuteObj[slot?.slot_type] || 0;
										return (
											<ListItem
												key={`classSlot${index}`}
												callback={() => {}}
												noMainText={true}
												secondryText={true}
											>
												<>
													<div className='slot-label'>
														<AccessTimeOutlinedIcon fontSize='small' />
														<label>
															{moment(`${classe.start_date} ${classe.end_time}`)
																.add(min, "minutes")
																.format("hh:mm A")}
															&nbsp;with Coach
														</label>
													</div>
													{slot.user_id ? (
														<div className='slot-label'>
															{this.createProfile(
																"",
																slot.user.student.parent_name
																	? slot.user.student.parent_name
																	: slot.user.student.parent_email,
																true
															)}
															<label className='flex'>
																<span className='crop_text_email'>
																	{slot.user.student.parent_name
																		? slot.user.student.parent_name
																		: slot.user.student.parent_email}
																</span>{" "}
																booked this slot
															</label>
														</div>
													) : (
														<label>Available</label>
													)}
												</>
											</ListItem>
										);
									})}
								</>
							</ListBoxUI>
						</div>
						<div className='mb-8'>
							<ListBoxUI
								title='Class Comments'
								callback={() => this.goToAllComments(this.state.classe.id)}
								callback2={() => {}}
								more={true}
								// more2={true}
								moreText2='Add Comment'
							>
								{classe.comments ? (
									<>
										{classe.comments
											.slice(0, 3)
											.map((res: any, index: number) => {
												return (
													<CommentItem
														profile={this.createProfile(
															res.user_info.avatar,
															res.user_info.name
														)}
														message={res.message}
														callback={() => {}}
														timeString={
															res.user_info.name +
															" at " +
															moment(res.created_at).format("DD MMM, h:mm a")
														}
														key={`cmd-${index}`}
														showRightArr={false}
														isFileIncluded={
															res.attachment && res.attachment !== ""
																? true
																: false
														}
														file={res.attachment}
														reply={res.children && res.children.length}
													></CommentItem>
												);
											})}
									</>
								) : (
									<></>
								)}
							</ListBoxUI>
						</div>
						{attendances.length > 0 ? (
							<div className='mb-8'>
								<ListBoxUI
									title='Attendance'
									callback={() => {
										this.props.history.push(
											"/coach/class/attendance/" +
												this.state.classe.id +
												"?date=" +
												date
										);
									}}
									more={true}
									moreText='View All'
								>
									<>
										{attendances.slice(0, 5).map((attend, index) => {
											return <ListItem {...attend} key={`attend${index}`} />;
										})}
									</>
								</ListBoxUI>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>

				{isPreview && (
					<div className='preview-div'>
						<CloseOutlinedIcon
							sx={{ color: "#FFF", fontSize: 24, mr: 3, mt: 3 }}
							className='cursor-pointer right'
							onClick={() => this.setState({ isPreview: false })}
						/>
						<div className='img-div flex-center'>
							<img
								src={
									process.env.REACT_APP_API_ENDPOINT +
									"/" +
									classProgram.image_url
								}
								alt='preview'
								className='preview-image'
							/>
						</div>
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = ({
	authUser,
	classes,
	response,
}: StoreState): {
	authUser: AuthInterface;
	classes: any;
	response: any;
} => {
	return {
		authUser,
		classes,
		response,
	};
};

export default connect(mapStateToProps, {
	getClassObject,
	getAll,
	postClassProgram,
	getClassProgram,
	getAssignUserByClass,
})(CoachDailyProgramPage);
