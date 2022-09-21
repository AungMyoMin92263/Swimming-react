import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";
import moment from "moment";
import ListItem, { IListItem } from "../../atoms/ListItem";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { getItem } from "../../auth/LocalStorage";
import { InitialIcon } from "../../atoms/InitialIcon";
import { Navigate } from "react-router-dom";
import { getclassesByDate, getAllStudents } from "../../stores/actions";
import placeholder from "../../assets/images/place-holder.png";
import ListBoxUI from "../../molecules/ListBox";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

interface IStates {
  step: number;
  user_name: string;
  goClass: boolean;
  goStudent: boolean;
  classes: any[];
  students: any[];
  schoolId: any;
  user_id: number;
}

interface IProps {
  authUser: AuthInterface;
  history: any;
  getclassesByDate: Function;
  classList: any;
  getAllStudents: Function;
  studentList: any;
}
class StudentDashboardPage extends React.Component<IProps, IStates> {
  path: any;
  date: any;
  urlClass: any;
  urlStudent: any;

  constructor(props: any) {
    super(props);
    this.path = props.history ? props.history.location.pathname.split("/") : "";

    this.state = {
      step: 0,
      user_name: "",
      goClass: false,
      goStudent: false,
      classes: [],
      students: [],
      schoolId: -1,
      user_id: -1,
    };
  }
  componentDidMount() {
    this.date =
      "Today, " +
      new Date().getDate() +
      " " +
      this.displayMonth(new Date().getMonth());
    this.getAuthFromLocal();
  }

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

  getAuthFromLocal = async () => {
    let user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
      await this.setState({
        user_id: user.userInfo.id,
        user_name: user.userInfo.name,
      });

      if (user.userInfo.assign_class && user.userInfo.assign_class.length > 0) {
				
				if (user.userInfo.assign_class[0].classes) {
					await this.setState({
						schoolId: user.userInfo.assign_class[0].classes.school_id,
					});

					this.getClassesByDate(user.userInfo.assign_class[0].classes.school_id);
				}
      }
    }
  };

  getClassesByDate = async (id : any) => {

    let url =
      "school/" +
      id +
      "/class/by-date?date=" +
      new Date().toISOString();
    await this.props.getclassesByDate(url);

    if (this.props.classList.result) {
      if (this.props.classList.result.length > 0) {
        let temp = [];
        for (let i = 0; i < this.props.classList.result.length; i++) {
          temp.push({
            obj: {
              text: this.props.classList.result[i].name,
              callback: () => {
                this.classCallback(this.props.classList.result[i].id);
              },
              smallText: "",
              icon: (
                <img
                  src={
                    this.props.classList.result[i].logo
                      ? process.env.REACT_APP_API_ENDPOINT +
                        "/" +
                        this.props.classList.result[i].logo
                      : "/assets/images/place-holder.jpeg"
                  }
                  className="logo-icon"
                />
              ),
              secondryText: true,
              isBigIcon: false,
            },
            start_time: this.props.classList.result[i].start_time,
          });
        }

        this.setState({
          classes: temp,
        });
      }
    }
  };

  classCallback = (id: any) => {
    this.setState({ goClass: true });
    this.urlClass = "/student/dashboard/daily-program/" + id;
  };

  studentCallback = (id: any) => {
    this.setState({ goStudent: true });
    this.urlStudent = "/student/profile-detail/" + id;
  };

  render() {
    const { user_name, goClass, goStudent, classes } = this.state;
    let date = "Today, " + moment().format("D MMMM");
    return (
			<>
				{goClass && <Navigate to={this.urlClass} replace={true} />}
				{goStudent && <Navigate to={this.urlStudent} replace={true} />}
				<div className='wrapper-mobile bg-w'>
					<div className='content-mobile-cus-space col-sm-12'>
						<div className='f-32 fw-500 mt-24 mb-40'>
							<span> Hello, </span> <span>{user_name}</span>
						</div>
						<div className='mb-8'>
							<ListBoxUI
								title={date}
								callback={() => {}}
								more={false}
								noBtn={true}
							>
								<>
									{classes &&
										classes.length > 0 &&
										classes.map((classe: any, index: any) => (
											<ListItem
												{...classe.obj}
												key={`classOb${index}`}
												arrowRight={true}
											>
												<>
													<AccessTimeOutlinedIcon fontSize='small' />
													<label>{classe.start_time}</label>
												</>
											</ListItem>
										))}
								</>
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
  classList,
  studentList,
}: StoreState): {
  authUser: AuthInterface;
  classList: any;
  studentList: any;
} => {
  return {
    authUser,
    classList,
    studentList,
  };
};

export default connect(mapStateToProps, { getclassesByDate, getAllStudents })(
  StudentDashboardPage
);
