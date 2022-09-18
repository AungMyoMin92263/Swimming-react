import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IListItem } from "../../atoms/ListItem";
import InputFormAtom from "../../atoms/InputFormAtom";
import { Link, Navigate } from "react-router-dom";

interface IStates {
  id: number;
  image: any;
  logo: string;
  name: string;
  isNameValid: boolean;
  isNameEmpty: boolean;
  NameMsg: string;
  description: string;
  DesMsg: string;
  isDesValid: boolean;
  isDesEmpty: boolean;
  goBadges : boolean;
}

interface IProps {
  authUser: AuthInterface;
}

class CoachCreateBadgePageOld extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: -1,
      image: { preview: "", raw: "" },
      logo: "",
      name: "",
      isNameValid: true,
      isNameEmpty: false,
      NameMsg: "",
      description: "",
      DesMsg: "",
      isDesValid: true,
      isDesEmpty: false,
      goBadges : false
    };
  }
  componentDidMount() {
    console.log("authUser", this.props.authUser);
    //loading
  }

  handleChange = (e: any) => {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(e.target.files[0].name)) {
      alert("Invalid file type");
    } else {
      if (e.target.files.length) {
        let temp = this.state.image;
        temp.preview = URL.createObjectURL(e.target.files[0]);
        temp.raw = e.target.files[0];
        temp.fileName = e.target.files[0].name;
        this.setState({
          image: temp,
          logo: temp.raw,
        });
        //setItem('school_img_file', temp.raw);
      }
    }
  };

  renderImageUpload = () => {
    return (
      <div>
        <label htmlFor="upload-button">
        <img
                src={"/assets/icons/logo.png"}
                alt="preview"
                className="preview-icon cursor"
              />
              <Link to="/coach/edit-icon">
              <div
                className="primary f-14 cursor"
              >
                Tap to edit Icon
              </div></Link>
        </label>
        <input
          type="file"
          id="upload-button"
          style={{ display: "none" }}
          onChange={this.handleChange}
        />
      </div>
    );
  };

  render() {
    let item: IListItem = {
      text: "Create a new badge",
      callback: () => console.log("log click item"),
      smallText: "Reward your students.",
      icon: <img src={"/assets/icons/upload.png"} />,
      secondryText: false,
      isBigIcon: true,
    };

    const {
      id,
      image,
      logo,
      name,
      isNameValid,
      isNameEmpty,
      NameMsg,
      description,
      DesMsg,
      isDesValid,
      isDesEmpty,
      goBadges
    } = this.state;

    return (
      <>
        <div className="wrapper-mobile">
        {goBadges && <Navigate to="/coach/dashboard/badge-list" replace={true} />}

          <div className="content-mobile col-sm-12">
            <div className="mb-32">
              <Link to="/coach/badge-list">
                <button type="submit" className="back-btn">
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                </button>
              </Link>
            </div>
            <div className="f-32 fw-500 mt-16 mb-32" style={{ width: "247px" }}>
              <span>Create Badge</span>
            </div>
            <div className="text-center">
              <div className="mb-16 f-12">
                <span>Badge Preview</span>
              </div>
              <div className="mb-32">{this.renderImageUpload()}</div>
            </div>
            <div className="f-12 fw-500 mb-16">
              <span>Badge Colour</span>
            </div>
            <div className="align-center mb-16">
              <button className="mr-16 badge-color"></button>
              <button className="mr-16 badge-color" style={{ backgroundColor : '#0070F8'}}></button>
              <button className="mr-16 badge-color" style={{ backgroundColor : '#E6F1FE'}}></button>
              <button className="mr-16 badge-color" style={{ backgroundColor : '#FAEFEF'}}></button>
              <button className="mr-16 badge-color" style={{ backgroundColor : '#C95D63'}}></button>
            </div>
            <div className="mb-16">
              <InputFormAtom
                label="Badge Name"
                placeholder={"Enter badge name"}
                warning={NameMsg}
                type="text"
                showWarning={isNameEmpty || !isNameValid}
                isDropdown={false}
                callback={(value: string) => {
                  this.setState({
                    name: value,
                  });
                }}
                id="badgeName"
                name="badgeName"
                value={name}
                required={true}
                maxLength={200}
                className=""
                clickCallback={() => {}}
                focusCallback={() => {
                  this.setState({
                    isNameEmpty: false,
                    isNameValid: true,
                  });
                }}
              />
            </div>
            <div className="mb-16">
              <InputFormAtom
                label="Badge Description"
                placeholder={"Enter badge description or criteria"}
                warning={DesMsg}
                type="text"
                showWarning={isDesEmpty || !isDesValid}
                isDropdown={false}
                callback={(value: string) => {
                  this.setState({
                    description: value,
                  });
                }}
                id="description"
                name="description"
                value={description}
                required={true}
                maxLength={200}
                className=""
                clickCallback={() => {}}
                focusCallback={() => {
                  this.setState({
                    isDesEmpty: false,
                    isDesValid: true,
                  });
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary right w-100" onClick={()=> this.setState({ goBadges : true})}>
              Done
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({
  authUser,
}: StoreState): {
  authUser: AuthInterface;
} => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps, {})(CoachCreateBadgePageOld);
