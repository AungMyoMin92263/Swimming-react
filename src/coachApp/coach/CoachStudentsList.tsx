import React from "react";
import { connect } from "react-redux";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import { CreateProfile } from "../../atoms/createProfile";
import ListItem from "../../atoms/ListItem";
import ProfileContainer from "../../atoms/ProfileContainer";
import { getItem } from "../../auth/LocalStorage";
import CommentListPage from "../../molecules/CommentPage"
import ListBoxUI from "../../molecules/ListBox";
import { getMyOwnStudent } from "../../stores/actions";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Modal } from "react-bootstrap";
interface IStates {
  students: any[]
  filterText: string
  selectBox: number
  selectedClass: number
  modalShow: boolean
}

interface IProps {
  authUser: AuthInterface
  studentList: any
  getMyOwnStudent: Function
  history: any;
}

class CoachStudentsList extends React.Component<IProps, IStates> {
  id: any;
  constructor(props: any) {
    super(props);
    this.state = {
      students: [],
      filterText: "",
      selectBox: 0,
      selectedClass: 0,
      modalShow: false
    }

  }
  componentDidMount() {
    this.getMyOwnStudent()
  }

  getMyOwnStudent = async () => {
    let user: any
    user = this.props.authUser?.userInfo
    if (!user) {
      let tempUser = JSON.parse(getItem("authUser") || "null");
      if (tempUser && tempUser.userInfo) {
        user = tempUser.userInfo
      }
    }
    await this.props.getMyOwnStudent(user?.id)
  }

  handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    this.setState({
      ...this.state,
      filterText: e.currentTarget.value,
    });
  };
  studentCallback = (id: any) => {
    this.props.history.push("/coach/dashboard/profile-detail/" + id)
  };

  render() {
    const { own_students } = this.props.studentList
    const { userInfo } = this.props.authUser
    const { filterText, selectedClass, selectBox } = this.state
    return (
      <div className="wrapper-mobile bg-w">
        <div className="content-mobile-cus-space col-sm-12">
          <CoachMobileHeader backBtn={true} filterBtn={true}
            callback={() => {
              this.setState({
                ...this.state,
                modalShow: true
              })
            }} />
          <ProfileContainer title="Students" display_item={[{ value: own_students?.length, title: 'Number of students' }]} />
          <ListBoxUI
            title="Students"
            callback={() => { }}
            noBtn={true}
          >
            {own_students?.length > 0 ?
              <>
                <div className="card-list-item filter-input-item">
                  <div className="filter-icon">
                    <SearchOutlinedIcon />
                  </div>
                  <div className="filter-input">
                    <input
                      className='filter-input-box'
                      placeholder='Search by name'
                      value={this.state.filterText}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                {own_students.filter((student: any) => {
                  if (!selectedClass)
                    return true
                  else {
                    return selectedClass === student.class_id
                  }
                }).filter((student: any) => {
                  if (!filterText) {
                    return true
                  } else {
                    return (student.name || "").toLowerCase().startsWith(filterText.toLowerCase())
                  }
                }).map((student: any, index: any) => {
                  return <ListItem icon={<CreateProfile image_url={student.avatar} name={student.name} />} text={student.name} callback={() => {
                    this.studentCallback(student.id)
                  }} arrowRight={true} key={`student${index}`} />
                })}
              </>
              : <></>}
          </ListBoxUI>
          <Modal dialogClassName={'custom-modal'} show={this.state.modalShow} fullscreen={true} onHide={() => {
            this.setState({
              ...this.state,
              modalShow: false
            })
          }}>
            <Modal.Body className="p-16">
              <div className="pl-8 pr-8">
                <div className="filter-tile pt-16 pb-16 ">Filter by</div>
                <div className={`input-form-atom`}>
                  <div className="label-con">
                    <label>Class Name</label>
                  </div>
                  <div className="dropdown-box">
                    <select name="filter-class" id="filterClass" value={selectBox} onChange={(e) => {
                      this.setState({
                        ...this.state,
                        selectBox: parseInt(e.currentTarget.value),
                      });
                    }}>
                      <option value={0}>All</option>
                      {userInfo?.assign_class?.map((classData: any, index: any) => {
                        return (
													<option
														value={classData.classes && classData.classes.id}
														key={`classId${index}`}
													>
														{classData.classes && classData.classes.name}
													</option>
												);
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <button type="submit" className="mt-40 mt-16 btn btn-primary right w-100" onClick={() => {
                this.setState({
                  ...this.state,
                  selectedClass: this.state.selectBox,
                  modalShow: false
                })
              }}>
                Confirm
              </button>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({
  authUser,
  studentList,
}: StoreState): {
  authUser: AuthInterface
  studentList: any;
} => {
  return {
    authUser,
    studentList
  };
};

export default connect(mapStateToProps, { getMyOwnStudent })(CoachStudentsList);
// export default CoachCommentsPage;