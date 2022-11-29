import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import { IListItem } from "../../atoms/ListItem";
import InputFormAtom from "../../atoms/InputFormAtom";
import { Link, Navigate } from "react-router-dom";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import { putBadge, getAllBadges, selectGiveBadge } from "../../stores/actions/badge-action";
import { getItem } from "../../auth/LocalStorage";

interface IStates {
  id: number;
  image: any;
  logo: string;
  name: string;
  color: string;
  isNameValid: boolean;
  isNameEmpty: boolean;
  NameMsg: string;
  description: string;
  DesMsg: string;
  isDesValid: boolean;
  isDesEmpty: boolean;
  goBadges: boolean;
  schoolId: any;
  errorMsg: string;
}

interface IProps {
  authUser: AuthInterface;
  badges: any;
  putBadge: Function;
  history: any;
  getAllBadges: Function;
  selectGiveBadge : Function;
}

class CoachEditBadgePage extends React.Component<IProps, IStates> {
  colors = ["dark-blue", "blue", "light-blue", "light-pink", "pink"];
  id: any;

  constructor(props: any) {
    super(props);

    let path = window.location.pathname.split("/");
    this.id = path[3];

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
      goBadges: false,
      color: "",
      schoolId: -1,
      errorMsg: "",
    };
  }
  componentDidMount() {
    this.authFromLocal();
  }

  getBadges = async (schoolId: any) => {

    await this.props.getAllBadges(schoolId);

    if (this.props.badges.badges_list) {
      let badges = this.props.badges.badges_list;
      console.log('badges',badges)
        if (badges && badges.length > 0) {
          let index = badges.findIndex((b: any) => b.id == this.id);
          if (index > -1) {
            let badge = badges[index];
            console.log('badge',badge,index)
            this.setState({
              logo: badge.logo,
              name: badge.name,
              color: badge.color,
              description: badge.description,
              schoolId: badge.school_id,
            });
          }
        }
    }else if (this.props.badges.error) {
      this.setState({
        errorMsg: this.props.badges.error,
      });
    }
  };

  authFromLocal = async () => {
    let user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
      if (user.userInfo.assign_class && user.userInfo.assign_class.length > 0) {
        if (user.userInfo.assign_class[0].classes) {
          await this.setState({
            schoolId: user.userInfo.assign_class[0].classes.school_id,
          });
          if (this.id)
            this.getBadges(user.userInfo.assign_class[0].classes.school_id);
        }
      }
    }
  };

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

  editBadge = async () => {
    let postData = {
      name: this.state.name,
      logo:
        this.props.badges.selectedIcon ||
        this.state.logo ||
        "/assets/icons/star.svg",
      color: this.state.color,
      school_id: this.state.schoolId,
      description: this.state.description,
    };
    await this.props.putBadge(postData,'/badge',this.id);
    console.log('editBadge',this.props.badges.editBadge)
    this.props.selectGiveBadge(this.props.badges.editBadge);
    this.props.history.back();
  };

  renderImageUpload = (image_url: string, color?: string) => {
    return (
      <div>
        <label className="upload-button-cus">
          <div className={`badge-icon-box big bg-${color}`}>
            <img
              src={image_url ? image_url : "/assets/icons/star.svg"}
              alt="preview"
              className={`preview-icon-only`}
            />
          </div>

          <Link to="/coach/edit-icon">
            <div className="primary f-14 cursor">Tap to edit Icon</div>
          </Link>
        </label>
      </div>
    );
  };

  render() {
    let item: IListItem = {
      text: "Create a new badge",
      callback: () => console.log("log click item"),
      smallText: "Reward your students.",
      icon: <img src={"/assets/icons/start.svg"} />,
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
      goBadges,
    } = this.state;
    let badgeIcon =
      this.props.badges.logo !== ""
        ? this.props.badges.logo
        : this.props.badges.selectedIcon || "";
    return (
      <>
        <div className="wrapper-mobile">
          {goBadges && (
            <Navigate to="/coach/dashboard/badge-list" replace={true} />
          )}

          <div className="content-mobile-cus-space bg-w col-sm-12">
            <CoachMobileHeader backBtn={true}></CoachMobileHeader>
            <div className="f-32 fw-500 mt-32 mb-32" style={{ width: "247px" }}>
              <span>{name}</span>
            </div>
            <div className="text-center pt-8">
              <div className="mb-16 f-12">
                <span>Badge Preview</span>
              </div>
              <div className="mb-32">
                {this.renderImageUpload(badgeIcon, this.state.color)}
              </div>
            </div>
            <div className="f-12 fw-500 mb-16">
              <span>Badge Colour</span>
            </div>
            <div
              className="align-center mb-16"
              style={{ justifyContent: "space-between" }}
            >
              {this.colors.map((color, index) => {
                return (
                  <button
                    key={`colotbtn${index}`}
                    className={`badge-color-btn bg-${color}`}
                    onClick={() => {
                      this.setState({
                        ...this.state,
                        color: color,
                      });
                    }}
                  ></button>
                );
              })}

              {/* <button className="mr-16 badge-color"></button>
              <button className="mr-16 badge-color" style={{ backgroundColor: '#0070F8' }}></button>
              <button className="mr-16 badge-color" style={{ backgroundColor: '#E6F1FE' }}></button>
              <button className="mr-16 badge-color" style={{ backgroundColor: '#FAEFEF' }}></button>
              <button className="mr-16 badge-color" style={{ backgroundColor: '#C95D63' }}></button> */}
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
            <button
              type="submit"
              className="btn btn-primary cus-primay-btn-m right w-100"
              onClick={() => this.editBadge()}
            >
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
  badges,
}: StoreState): {
  authUser: AuthInterface;
  badges: any;
} => {
  return {
    authUser,
    badges,
  };
};

export default connect(mapStateToProps, { putBadge, getAllBadges, selectGiveBadge })(
  CoachEditBadgePage
);
