import React from "react";
import { connect } from "react-redux";
import { CreateProfile } from "../atoms/createProfile";
import ListItem from "../atoms/ListItem";
import ProfileContainer, { IProfile } from "../atoms/ProfileContainer";
import { setStudentView } from "../stores/actions";
import { StoreState } from "../stores/reducers";
import ListBoxUI from "./ListBox";

interface IStates {

}
interface IProps {
  event_id: any;
  history: any,
  defaultPath: string
  events: any
  setStudentView: Function
}

class EventDetailPage extends React.Component<IProps, IStates> {

  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    if (!this.props.events.eventDetail) {
      this.props.history.back()
    }
  }

  goStudentRecord = (student: any) => {
    this.props.setStudentView(student)
    this.props.history.push(this.props.defaultPath + '/student/record/' + student.id)
  }

  render() {
    const profile: IProfile = {
      isLogo: false,
      title: this.props.events.eventDetail?.name,
      display_item: [
        {
          title: 'Stroke',
          value: this.props.events.eventDetail?.stroke
        },
        {
          title: 'Length',
          value: this.props.events.eventDetail?.stroke_length
        },
        {
          title: 'Gender',
          value: (this.props.events.eventDetail?.gender || "").toUpperCase()
        },
        {
          title: 'Age Class',
          value: `${this.props.events.eventDetail?.from_age || "-"} to ${this.props.events.eventDetail?.to_age || "-"} y/o`
        },
        {
          title: "No. Students",
          value: this.props.events.eventDetail?.students.length
        }
      ]
    }
    return (
      <>
        <ProfileContainer {...profile}></ProfileContainer>
        <div className="mb-8">
          <ListBoxUI
            title="Students"
            callback={() => { }}
            callback2={() => { }}
            more={true}
            key={'event_box'}
          >
            <>
              {this.props.events.eventDetail?.students.map((student: any, index: number) => {
                return (
                  <ListItem icon={<CreateProfile image_url={student.avatar} name={student.name} />} text={student.name} callback={() => { this.goStudentRecord(student) }} key={`student${index}`} arrowRight={true} secondryText={true} >
                    <>
                      <label>{student.best_record || "0.00"}s</label>
                    </>
                  </ListItem>
                )
              })}
            </>
          </ListBoxUI>
        </div>
      </>
    )
  }
}

const mapStateToProps = ({
  events
}: StoreState): {
  events: any
} => {
  return {
    events
  };
};

export default connect(mapStateToProps, { setStudentView })(EventDetailPage)