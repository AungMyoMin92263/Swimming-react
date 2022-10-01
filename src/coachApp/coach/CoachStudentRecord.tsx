import React from "react";
import { connect } from "react-redux";
import BestScoreBox from "../../atoms/BestScoreBox";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import { CreateProfile } from "../../atoms/createProfile";
import CommentListPage from "../../molecules/CommentPage"
import ListBoxUI from "../../molecules/ListBox";
import { getDetailEvents, getEventsRecordDetail } from "../../stores/actions";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ListItem from "../../atoms/ListItem";
import moment from "moment";
interface IStates {
  studentId: number,
}

interface IProps {
  authUser: AuthInterface
  events: any

  history: any;
  getEventsRecordDetail: Function
}

class CoachStudentRecordPage extends React.Component<IProps, IStates> {
  id: any;
  urlDailyProgram = '';
  urlEnterComment = '';
  constructor(props: any) {
    super(props);
    let path = window.location.pathname.split("/");
    this.id = path[4];
    this.state = {
      studentId: this.id ? this.id : -1,
    };
  }
  componentDidMount() {
    if (!this.props.authUser.viewStudent && !this.props.events.eventDetail)
      this.props.history.back()
    else{
      this.getEventList()
    }
  }

  getEventList = async () => {
    const { viewStudent } = this.props.authUser
    const { eventDetail } = this.props.events
    await this.props.getEventsRecordDetail(eventDetail.id, viewStudent.id)
  }

  render() {
    const { viewStudent } = this.props.authUser
    const { eventDetail, eventRecords } = this.props.events
    let maxObj = eventRecords.reduce((prev: any, current: any) => ((prev.record < current.record) ? prev : current), 0)
    console.log("maxObj", maxObj);
    
    return (
			<div className='wrapper-mobile bg-w'>
				<div className='content-mobile-cus-space col-sm-12'>
					<CoachMobileHeader
						backBtn={true}
						addBtn={true}
						callback={() => {
							this.props.history.push("/coach/create/record/" + viewStudent.id);
						}}
					></CoachMobileHeader>

					<div className='mini-profile pt-24'>
						<div className='img-profile'>
							<CreateProfile
								image_url={viewStudent?.avatar}
								name={viewStudent?.name || "User"}
							/>
						</div>
						<div className='profile-name'>
							{viewStudent?.name || viewStudent?.email}
						</div>
					</div>
					<div className='page-tile pt-16 pb-40'>
						<span>{eventDetail?.name}</span>
					</div>
					<div className='mb-8'>
						<ListBoxUI
							title='You'
							callback={() => {}}
							callback2={() => {}}
							more={true}
							moreText='View Profile'
						>
							<BestScoreBox
								score={maxObj?.record || "0.00"}
								title='Personal Best'
								scoreDate={moment(maxObj?.created_at).format("DD MMM YYYY")}
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

				{/* List Personal */}
			</div>
		);
  }
}

const mapStateToProps = ({
  events,
  authUser
}: StoreState): {
  events: any
  authUser: AuthInterface
} => {
  return {
    events,
    authUser
  };
};

export default connect(mapStateToProps, { getEventsRecordDetail })(CoachStudentRecordPage)