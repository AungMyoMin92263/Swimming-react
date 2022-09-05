import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputFormAtom from "../../atoms/InputFormAtom";
import { IListItem } from "../../atoms/ListItem";

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
}

interface IProps {
  authUser: AuthInterface;
}

class CoachEditIconPage extends React.Component<IProps, IStates> {
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
    };
  }
  componentDidMount() {
    console.log("authUser", this.props.authUser);
    //loading
  }

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
    } = this.state;

    return (
      <>
        <div className="wrapper-mobile">
          <div className="content-mobile col-sm-12">
            <div className="mb-32">
              <button type="submit" className="back-btn">
                <ArrowBackIcon
                  sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                ></ArrowBackIcon>
              </button>
            </div>
            <div className="f-32 fw-500 mt-16 mb-32" style={{ width: "247px" }}>
              <span>Edit Icon</span>
            </div>
              <div className="mb-16">
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
                <img
                  src={"/assets/icons/logo.png"}
                  alt="home"
                  className="edit-icon m-8"
                />
              </div>
              <button type="submit" className="btn btn-primary right w-100">
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

export default connect(mapStateToProps, {})(CoachEditIconPage);
