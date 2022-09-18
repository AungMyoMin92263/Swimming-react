import React from "react";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import EventDetailPage from "../../molecules/EventDetail";
interface IStates {
	eventId: number
}

interface IProps {
	history: any
}

class CoachEventsDetailPage extends React.Component<IProps, IStates> {
	id: any;
	urlProfileDetail: any

	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[4];

		this.state = {
			eventId: parseInt(path[4])
		};
	}
	componentDidMount() {
		console.log(this.state);
	}

	render() {
		return (
			<div className="wrapper-mobile bg-w">
				<div className="content-mobile-cus-space col-sm-12">
					<CoachMobileHeader backBtn={true}></CoachMobileHeader>
					<EventDetailPage history={this.props.history} event_id={this.state.eventId} defaultPath={'/coach'} />
				</div>
			</div>
		)
	}

}

export default CoachEventsDetailPage;
