import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommentItem, { ICommentItem } from "../../atoms/Comment";
import { getItem } from "../../auth/LocalStorage";
import {
  getClassObject,
  getAll,
  postComment,
  getSendComment,
} from "../../stores/actions";
import { InitialIcon } from "../../atoms/InitialIcon";
import { Link } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import ListBoxUI from "../../molecules/ListBox";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import CommentListPage from "../../molecules/CommentPage";
import { scrollToBottom } from "../../scroll-func";
import { Modal } from "react-bootstrap";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import { Player } from "video-react";
import placeholder from "../../assets/images/place-holder.png";

interface IStates {
  classId: any;
  schoolId: number;
  newcomment: any;
  commetFile: any;
  commentType: string;

  filterText: string;
  selectBox: number;
  modalShow: boolean;
}

interface IProps {
  authUser: AuthInterface;
  classes: any;
  postComment: Function;
  comments: any;
  getSendComment: Function;
  history: any;
}

class CoachCommentsPage extends React.Component<IProps, IStates> {
  id: number;
  constructor(props: any) {
    super(props);
    let path = window.location.pathname.split("/");
    this.id = parseInt(path[4]);
    this.state = {
      classId: this.id ? this.id : -1,
      schoolId: this.props.classes?.viewClass?.school_id || -1,
      newcomment: "",
      commetFile: [],
      commentType: path[5] || "",

      filterText: "",
      selectBox: 0,
      modalShow: false,
    };
  }

  componentDidMount(): void {
    if (!this.props.classes?.viewClass && !this.props.authUser.otherUserinfo) {
      this.props.history.back();
    }
  }

  getSendComments = async () => {
    await this.props.getSendComment(this.state.classId, this.state.commentType);
    scrollToBottom("sendCmtList");
  };

  //   fileUploadChange = () => {
  //     alert("We will add this feature in future!");
  //   };

  handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    this.setState({
      ...this.state,
      newcomment: e.currentTarget.value,
    });
  };

  fileUploadChange = () => {
	if(this.state.commetFile.length === 0){
		this.setState({
			...this.state,
			modalShow: true,
		  });
	}
  };

  choosed = (type: string) => {
    console.log("type", type);
  };

  submit = async () => {
	const formData = new FormData();
		formData.append("receiver_id", this.state.classId);
		formData.append("message", this.state.newcomment);
		formData.append("type", this.state.commentType);
		// formData.append("parent_id", null);
		formData.append("attachment", this.state.commetFile.length >  0 ?this.state.commetFile[0].file: null);

    await this.props.postComment(formData);
    if (!this.props.comments?.error) {
      this.setState({
        ...this.state,
        newcomment: "",
        commetFile : []
      });
      this.getSendComments();
    }
  };

  handlePhotoVideoChanged = (e: any) => {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.mp4)$/i;
    if (!allowedExtensions.exec(e.target.files[0].name)) {
      alert("Invalid file type");
    } else {
      if (e.target.files.length) {
        let temp = this.state.commetFile;
        let res = e.target.files[0].name.includes('.mp4');
        temp.push({
          file: e.target.files[0],
          fileName: e.target.files[0].name,
          type: "photovideo",
		      preview : URL.createObjectURL(e.target.files[0]),
          isVideo : res,
        });
        this.setState({
          commetFile: temp,
          modalShow: false,
        });
      }
    }
  };

  handleFileChanged = (e: any) => {
    var allowedExtensions = /(\.doc|\.docx|\.pdf|\.xls|\.xlsx)$/i;
    if (!allowedExtensions.exec(e.target.files[0].name)) {
      alert("Invalid file type");
    } else {
      if (e.target.files.length) {
        let temp = this.state.commetFile;
        temp.push({
          file: e.target.files[0],
          fileName: e.target.files[0].name,
          type: "file",
        });
        this.setState({
          commetFile: temp,
          modalShow: false,
        });
      }
    }
  };

  remove = (file : any) => {
	let temp = this.state.commetFile;
	let index = temp.findIndex((t : any) => t.fileName === file.fileName);
	if(index >= 0){
		temp.splice(index,1);
		this.setState({
			commetFile : temp
		});
	}
  }

  displayFile = (file: any, isVideo : boolean) => {
    if (isVideo) {
      return (
        <Player
          playsInline
          src={
            file ? file : placeholder
          }
          fluid={false}
          width={48}
          height={48}
        />
      );
    } else {
      return (
        <img
          src={
            file ? file : placeholder
          }
          alt="download"
          id="download"
          className="mr-16"
          style={{ width: "48px", height: "48px" }}
        />
      );
    }
  };

  renderFile = (file: any) => {
    if (file.type === "photovideo") {
      return (
        <div>
          {/* <img
            id="comment"
            src={file.preview}
            alt="upload"
            className="comment-photo"
          /> */}

          {this.displayFile(file.preview,file.isVideo)}
          <CancelIcon
            sx={{ color: "#41464b", fontSize: 24 }}
			style={{marginTop : file.isVideo? '-118px' : '-50px',
				marginLeft: file.isVideo? '40px' : '-26px',
				color: '#41464b', cursor: 'pointer' }}
				onClick={()=> this.remove(file)}
          ></CancelIcon>
        </div>
      );
    } else
      return (
        <div className="comment-file">
          <span>{file.fileName}</span>
		  <CancelIcon
            sx={{ color: "#41464b", fontSize: 24 }}
			style={{color: '#41464b' }}
			onClick={()=> this.remove(file)}
          ></CancelIcon>
        </div>
      );
  };

  renderComment = () => {
    if (this.state.commetFile && this.state.commetFile.length > 0) {
      return (
        <div className="comment-input-div-file" style={{ height: "auto" }}>
          <div>
            <input
              className="comment-input mb-16"
              placeholder="Enter your comment"
              value={this.state.newcomment}
              onChange={this.handleChange}
            />
            <div className="mb-8">
              {this.state.commetFile &&
                this.state.commetFile.length > 0 &&
                this.state.commetFile.map((file: any) => (
                  <>{this.renderFile(file)}</>
                ))}
            </div>
          </div>
          <div className="right">
            <div className="input-icons align-center">
              <AttachFileIcon
                className="cursor"
                onClick={() => this.fileUploadChange()}
                style={{ rotate: "45deg" }}
              />
              <button
                disabled={!this.state.newcomment}
                className="ml-16 send-btn"
                onClick={() => this.submit()}
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="comment-box">
          <div className="cmd-input">
            <div className="comment-input-div">
              <input
                className="comment-input"
                placeholder="Enter your comment"
                value={this.state.newcomment}
                onChange={this.handleChange}
              />
              <div className="input-icons align-center">
                <AttachFileIcon
                  className="cursor"
                  onClick={() => this.fileUploadChange()}
                  style={{ rotate: "45deg" }}
                />
                <button
                  disabled={!this.state.newcomment}
                  className="ml-16 send-btn"
                  onClick={() => this.submit()}
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    const { classId, commetFile } = this.state;
    return (
      <>
        <div className="wrapper-mobile bg-w">
          <div className="content-mobile-cus-space col-sm-12" id="sendCmtList">
            <CoachMobileHeader backBtn={true}></CoachMobileHeader>
            <CommentListPage
              receiverId={classId}
              isClass={this.state.commentType === "class"}
              isOwn={true}
              showRightArr={false}
            ></CommentListPage>

            {this.renderComment()}

            <Modal
              dialogClassName={"custom-modal"}
              show={this.state.modalShow}
              fullscreen={true}
              onHide={() => {
                this.setState({
                  ...this.state,
                  modalShow: false,
                });
              }}
            >
              <Modal.Body className="p-16">
                <div className="pl-8 pr-8">
                  <div className="filter-tile pt-8 pb-8 mb-8">Upload</div>
                  <div className={`input-form-atom`}>
                    <div
                      className="label-con cursor mb-8"
                      onClick={() => this.choosed("file")}
                    >
                      <label className="align-center" htmlFor="upload-file">
                        <AttachFileOutlinedIcon
                          sx={{ color: "#0070F8", fontSize: 24, mr: 1 }}
                          style={{ rotate: "45deg" }}
                        ></AttachFileOutlinedIcon>
                        <span className="f-16">File</span>
                      </label>

                      <input
                        type="file"
                        id="upload-file"
                        style={{ display: "none" }}
                        onChange={this.handleFileChanged}
                      />
                    </div>
                    <div className="hr mb-16"></div>
                    <div
                      className="label-con cursor"
                      onClick={() => this.choosed("photovideo")}
                    >
                      <label
                        className="align-center"
                        htmlFor="upload-photo-video"
                      >
                        <PhotoOutlinedIcon
                          sx={{ color: "#0070F8", fontSize: 24, mr: 1 }}
                        ></PhotoOutlinedIcon>
                        <span className="f-16">Photo or Video</span>
                      </label>
                      <input
                        type="file"
                        id="upload-photo-video"
                        style={{ display: "none" }}
                        onChange={this.handlePhotoVideoChanged}
                      />
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({
  authUser,
  classes,
  comments,
}: StoreState): {
  authUser: AuthInterface;
  classes: any;
  comments: any;
} => {
  return {
    authUser,
    classes,
    comments,
  };
};

export default connect(mapStateToProps, {
  postComment,
  getSendComment,
})(CoachCommentsPage);
