import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

import ListItem, { IListItem } from "../../atoms/ListItem";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ListBoxUI from "../../molecules/ListBox";
import { getItem } from "../../auth/LocalStorage";
import { getAllEvents, getDetailEvents } from "../../stores/actions";

interface IStates {
	userInfo?: IUser | null;
}

interface IProps {
	authUser: AuthInterface;
	eventList: any;
	getAllEvents: Function;
	getDetailEvents: Function;
	history: any;
}

class StudentEventsPage extends React.Component<IProps, IStates> {
	constructor(props: any) {
		super(props);

		this.state = {
			userInfo: null,
		};
	}

	getUserInfo = () => {
		let user: any;
		user = this.props.authUser?.userInfo;
		if (!user) {
			let tempUser = JSON.parse(getItem("authUser") || "null");
			if (tempUser && tempUser.userInfo) {
				user = tempUser.userInfo;
			}
		}
		this.setState({
			...this.state,
			userInfo: user,
		});
		this.getEventList(user);
	};

	componentDidMount() {
		//loading
		this.getUserInfo();
	}

	getEventList = async (user: any) => {
    let eventUrl = "assigned/event/by-users/" + user.id;
		console.log(eventUrl);

		await this.props.getAllEvents(eventUrl);

	};

	goEventDetail = async (event: any) => {
		await this.props.getDetailEvents(event.event.school_id, event.event_id);
		this.props.history.push("/student/event/detail/" + event.event_id);
	};

	render() {
		let item2: IListItem = {
			text: "Dolphin Swimming School Swim Meet",
			callback: () => console.log("log click item"),
			icon: <></>,
			secondryText: true,
		};
		const { result } = this.props.eventList;
		return (
			<>
				<div className='wrapper-mobile'>
					<div className='content-mobile-cus-space bg-w col-sm-12'>
						<div className='f-32 fw-500 mt-16 mb-32'>
							<span> Events </span>
						</div>

						{/* <div className='mb-8'>
							<ListBoxUI
								title='Upcoming Competitons'
								callback={() => {}}
								more={false}
							>
								<ListItem {...item2}>
									<>
										<WatchLaterIcon />
										<label>27 Jul 2022</label>
									</>
								</ListItem>
							</ListBoxUI>
						</div> */}
						<div className='mb-8'>
							<ListBoxUI title='My Events' callback={() => {}} more={false}>
								{result?.length > 0 ? (
									<>
										{result.map((event: any, index: number) => {
											return (
												<ListItem
													key={`st_event${index}`}
													text={event.event.name}
													smallText={`${event.event.gender}, ${event.event.from_age}-${event.event.to_age} y/o`}
													callback={() => {
														this.goEventDetail(event);
													}}
													arrowRight={true}
												/>
											);
										})}
									</>
								) : (
									<></>
								)}
							</ListBoxUI>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = ({
	authUser,
	eventList,
}: StoreState): {
	authUser: AuthInterface;
	eventList: any;
} => {
	return {
		authUser,
		eventList,
	};
};

export default connect(mapStateToProps, { getAllEvents, getDetailEvents })(
	StudentEventsPage
);
