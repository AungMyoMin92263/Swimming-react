import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";
import { getStudentObject,getAll } from "../../stores/actions";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import ListBoxUI from "../../atoms/ListBox";
import ListItem, { IListItem } from "../../atoms/ListItem";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Link, Navigate } from "react-router-dom";

import BadgeList from "../../atoms/BadgeList";
import { IBadgeItem } from "../../atoms/BadgeItem";

interface IStates {
  step: number;
  goBadges : boolean;
  student : any;
  profile : any;
  attendances : any[],
  events : any[];
  badges : any[];
}

interface IProps {
  authUser: AuthInterface;
  student : any;
  getStudentObject : Function;
  getAll : Function;
  response : any;
}

class CoachProfileDetailsPage extends React.Component<IProps, IStates> {
	id: any;
	urlProfileDetail:any

	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[4];

		this.state = {
			step: 0,
			goBadges: false,
			student: { id: this.id ? this.id : -1 },
			profile: null,
			attendances: [],
			events: [],
			badges: [],
		};
	}
	componentDidMount() {
		if (this.state.student.id > -1) this.getStudentProfile();
		if (this.state.student.id > -1) {
      this.urlProfileDetail = "/coache/dashboard/badge-list?id=" + this.state.student.id
		}
	}

	getStudentProfile = async () => {
		let url = "student/" + this.state.student.id;
		await this.props.getStudentObject(url);

		if (this.props.student && this.props.student.result) {
			let temp = {
				title: this.props.student.result.name,
				isLogo: true,
				display_item: [
					{ title: "AGE", value: "16" },
					{ title: "GENDER", value: "Male" },
					{ title: "FAVOURITE STROKE", value: "FreeStyle" },
					{ title: "PERSONAL BEST", value: "64.42s" },
				],
			};
			await this.setState({
				student: this.props.student.result,
				profile: temp,
			});
			this.getEventsByStudent();
			this.getAttendanceByStudent();
			this.getBadgesByStudent();
		}
	};

	getAttendanceByStudent = async () => {
		let url =
			"/attendance/byStudent/" +
			this.state.student.id +
			"?record_date=" +
			new Date().toISOString();
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
					text: "Pro Youth Morning",
					callback: () => console.log("log click item"),
					smallText: "",
					icon: <img src={"/assets/icons/logo.png"} className='logo-icon' />,
					secondryText: true,
					isBigIcon: false,
					selectable: true,
				});
			}

			this.setState({
				attendances: res,
			});
		}
	};

	getEventsByStudent = async () => {
		let url = "assigned/event/by-users/" + this.state.student.id;
		await this.props.getAll(url);
		if (
			this.props.response &&
			this.props.response.result &&
			this.props.response.result.length > 0
		) {
			let tempEvents = this.props.response.result;
			let res = [];
			for (let i = 0; i < tempEvents.length; i++) {
				res.push({
					text: "100m Freestyle",
					callback: () => console.log("log click item"),
					smallText: "Male, 9-10 y/o, 64.42s",
					icon: <></>,
					secondryText: false,
					isBigIcon: false,
				});
			}

			this.setState({
				attendances: res,
			});
		}
	};

	getBadgesByStudent = async () => {
		let url = "own-badge/by-users/" + this.state.student.id;
		await this.props.getAll(url);
		if (
			this.props.response &&
			this.props.response.result &&
			this.props.response.result.length > 0
		) {
			let tempBadges = this.props.response.result;
			let res = [];
			for (let i = 0; i < tempBadges.length; i++) {
				res.push({
					text: "Badge 1",
					icon: <img src={"/assets/icons/logo.png"} className='logo-icon' />,
					callback: () => console.log("log click item"),
					isActive: true,
				});
			}

			this.setState({
				badges: res,
			});
		}
	};

	render() {
		let item: IListItem = {
			text: "Pro Youth Morning",
			callback: () => console.log("log click item"),
			smallText: "",
			icon: <img src={"/assets/icons/logo.png"} className='logo-icon' />,
			secondryText: true,
			isBigIcon: false,
			selectable: true,
		};

		let item2: IListItem = {
			text: "100m Freestyle",
			callback: () => console.log("log click item"),
			smallText: "Male, 9-10 y/o, 64.42s",
			icon: <></>,
			secondryText: false,
			isBigIcon: false,
		};

		const { profile, attendances, events, goBadges, badges } = this.state;
		console.log("profile", profile);
		return (
			<>
				<div className='wrapper-mobile'>
					{goBadges && <Navigate to={this.urlProfileDetail} replace={true} />}

					<div className='content-mobile col-sm-12'>
						<div className='mb-32'>
							<Link to='/coache/dashboard'>
								<button type='submit' className='back-btn'>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
								</button>
							</Link>
						</div>
						<div className='mb-8'>
							<ProfileContainer {...profile}></ProfileContainer>
						</div>
						<div className='mb-8'>
							{badges && badges.length > 0 && (
								<ListBoxUI
									title='BADGES'
									callback={() => this.setState({ goBadges: true })}
									callback2={() => this.setState({ goBadges: true })}
									more={true}
									more2={true}
									moreText2='Give Badge'
								>
									<BadgeList badges={badges}></BadgeList>
								</ListBoxUI>
							)}
						</div>
						<div className='mb-8'>
							{attendances && attendances.length > 0 && (
								<ListBoxUI
									title='Attendance'
									callback={() => {}}
									more={true}
									moreText='View All'
								>
									<>
										{attendances.map((attendance: any, index: any) => (
											<ListItem {...attendance}>
												<WatchLaterIcon />
												<label>14 Jul, 9:00 AM</label>
											</ListItem>
										))}
									</>
								</ListBoxUI>
							)}
						</div>
						<div className='mb-8'>
							{events && events.length > 0 && (
								<ListBoxUI
									title='Events'
									callback={() => {}}
									more={true}
									moreText='View All'
								>
									<>
										{events.map((event: any, index: any) => (
											<ListItem {...event}>
												<></>
											</ListItem>
										))}
									</>
								</ListBoxUI>
							)}
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = ({
  authUser,response,student
}: StoreState): {
  authUser: AuthInterface;response : any;student : any;
} => {
  return {
    authUser,response,student
  };
};

export default connect(mapStateToProps, { getStudentObject , getAll })(CoachProfileDetailsPage);
