import ListItem from "../../atoms/ListItem";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { getDetailEvents, getEventsRecordDetail } from "../../stores/actions";

import React from "react";
import { connect } from "react-redux";
import BestScoreBox from "../../atoms/BestScoreBox";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import EventDetailPage from "../../molecules/EventDetail";
import ListBoxUI from "../../molecules/ListBox";
import moment from "moment";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { getItem } from "../../auth/LocalStorage";
import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import userEvent from "@testing-library/user-event";

interface IStates {
	eventId: number;
	userInfo?: IUser | null;
	user_id:number
}

interface IProps {
	history: any;
	events: any;
	authUser: AuthInterface;
	getEventsRecordDetail: Function;
	getDetailEvents:Function;
}

class StudentEventsDetailPage extends React.Component<IProps, IStates> {
	id: any;
	urlProfileDetail: any;

	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[4];

		this.state = {
			eventId: parseInt(path[4]),
			user_id:0
		};
	}
	componentDidMount() {
		this.getUserInfo();
		this.getEventList();
		

	}
	getUserInfo = async() => {
		let user: any;
		user = this.props.authUser?.userInfo;
		if (!user) {
			let tempUser = JSON.parse(getItem("authUser") || "null");
			if (tempUser && tempUser.userInfo) {
				user = tempUser.userInfo;
			}
		}
		await this.setState({
			...this.state,
			userInfo: user,
			user_id:user.id
		});
		await this.props.getDetailEvents();
		await this.props.getEventsRecordDetail(
			this.state.eventId,
			this.state.user_id
		);
	};

	getEventList = async () => {
		const { eventDetail } = this.props.events;
		
	};

	render() {
		const {  eventDetail,eventRecords } = this.props.events;
		let maxObj = eventRecords.reduce(
			(prev: any, current: any) =>
				prev.record < current.record ? prev : current,
			0
		);
		const profile: IProfile = {
			isLogo: false,
			title: this.props.events.eventDetail?.name,
			display_item: [
				{
					title: "Stroke",
					value: this.props.events.eventDetail?.stroke,
				},
				{
					title: "Length",
					value: this.props.events.eventDetail?.stroke_length,
				},
				{
					title: "Gender",
					value: (this.props.events.eventDetail?.gender || "").toUpperCase(),
				},
				{
					title: "Age Class",
					value: `${this.props.events.eventDetail?.from_age || "-"} to ${
						this.props.events.eventDetail?.to_age || "-"
					} y/o`,
				},
				{
					title: "No. Students",
					value: this.props.events.eventDetail?.students.length,
				},
			],
		};
		console.log(this.props.events);
		return (
			<div className='wrapper-mobile bg-w'>
				<div className='content-mobile-cus-space col-sm-12'>
					<CoachMobileHeader backBtn={true}></CoachMobileHeader>
					<ProfileContainer {...profile}></ProfileContainer>
					<div className='mb-8'>
						<ListBoxUI
							title='You'
							callback={() => {this.props.history.push("/me/profile-detail/"+this.state.userInfo?.id)}}
							callback2={() => {}}
							more={true}
							moreText='View Profile'
						>
							<BestScoreBox
								score={maxObj?.record || "0.00"}
								title='Personal Best'
								scoreDate={moment(maxObj?.record?.created_date).format(
									"DD MMM YYYY"
								)}
							/>
						</ListBoxUI>
					</div>
					<div className='mb-8'>
						<ListBoxUI
							title={"history"}
							callback={() => {}}
							more={false}
							noBtn={true}
						>
							{eventRecords.length > 0 ? (
								<>
									{eventRecords.map((record: any, index: any) => (
										<ListItem
											text={record.record}
											secondryText={true}
											callback={() => {}}
											key={`classOb${index}`}
										>
											<>
												<CalendarTodayOutlinedIcon fontSize='small' />
												<label>
													{moment(record.created_date).format("DD MMM YYYY")}
												</label>
											</>
										</ListItem>
									))}
								</>
							) : (
								<></>
							)}
						</ListBoxUI>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({
	authUser,
	events,
}: StoreState): {
	authUser: AuthInterface;
	events: any;
} => {
	return {
		authUser,
		events,
	};
};
export default connect(mapStateToProps, {
	getEventsRecordDetail,
	getDetailEvents,
})(StudentEventsDetailPage);
