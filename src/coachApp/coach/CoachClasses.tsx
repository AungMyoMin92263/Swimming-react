import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

import ListBoxUI from "../../atoms/ListBox";
import ListItem, { IListItem } from "../../atoms/ListItem";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { getItem } from "../../auth/LocalStorage";
import { Class } from "../../stores/model/class";
import { getclassesByDateRange } from "../../stores/actions/class-action";
import { ClassRangeInterface } from "../../stores/model/class-interface";
import placeholder from "../../assets/images/place-holder.png";
import { ClassInterface } from "./../../stores/model/class-interface";
import { Navigate } from "react-router-dom";
interface IStates {
  step: number;
  user_name: string;
  user_id: number;
  schoolId: any;
  classList: any[];
  classesobj: any;
  goClass: boolean;
}

interface IProps {
  authUser: AuthInterface;
  getclassesByDateRange: Function;
  classListR: any;
}

class CoachClassesPage extends React.Component<IProps, IStates> {
  path: any;
  date: any;
  urlClass: any;
  urlStudent: any;

  constructor(props: any) {
    super(props);

    this.state = {
      step: 0,
      goClass: false,
      user_name: "",
      user_id: -1,
      schoolId: -1,
      classList: [],
      classesobj: [],
    };
  }
  classCallback = (id: any) => {
    this.setState({ goClass: true });
    this.urlClass = "/coache/dashboard/daily-program/" + id;
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
        user_id: user.userInfo.data.id,
        user_name: user.userInfo.data.name,
      });

      if (
        user.userInfo.data.assign_class &&
        user.userInfo.data.assign_class.length > 0
      ) {
        await this.setState({
          schoolId: user.userInfo.data.assign_class[0].classes.school_id,
        });
        this.getClassbyDateR();
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
        day: "2-digit"
}

  getClassbyDateR = async () => {
    let url =
			"school/" +
			this.state.schoolId +
			"/class/by-date-range?date=" +
			new Date().toISOString() +
			"&count=5";

    await this.props.getclassesByDateRange(url);
    this.setDataComponents();
  };

  setDataComponents = () => {
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
                    className="logo-icon"
                    alt=""
                  />
                ),
                secondryText: true,
                isBigIcon: false,
              },
              start_time: tempObj[i].start_time,
			  id : tempObj[i].id,
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

  componentDidMount() {
    this.date =
      "Today, " +
      new Date().getDate() +
      " " +
      this.displayMonth(new Date().getMonth());
    this.getAuthFromLocal();
  }

  render() {
    const { classList,goClass } = this.state;

    return (
      <>
        {goClass && <Navigate to={this.urlClass} replace={true} />}

        <div className="wrapper-mobile">
          <div className="content-mobile col-sm-12">
            <div className="f-32 fw-500 mt-16 mb-32">
              <span> Classes </span>
            </div>
            {classList &&
              classList.length > 0 &&
              classList.map((classes: any) => (
                <div className="mb-8">
                  <ListBoxUI
                    title={classes.date}
                    callback={() => {}}
                    more={false}
                    noBtn={true}
                  >
                    <>
                      {classes.list &&
                        classes.list.length > 0 &&
                        classes.list.map((classe: any) => (
                          <ListItem
                            {...classe.obj}
                            callback={() => this.classCallback(classe.id)}
                          >
                            <div className="second-text ">
                              <WatchLaterIcon />
                              <label>{classe.start_time}</label>
                            </div>
                          </ListItem>
                        ))}
                    </>
                  </ListBoxUI>
                </div>
              ))}
          </div>
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
  CoachClassesPage
);
