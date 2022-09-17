import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import ListItem, { IListItem } from "../../atoms/ListItem";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Link } from "react-router-dom";
interface IStates {
  id: number;
  image: any;
  logo: string;
}

interface IProps {
  authUser: AuthInterface;
}

class CoachEditProfilePage extends React.Component<IProps, IStates> {
  backUrl = '/coach/me';

  constructor(props: any) {
    super(props);

    this.state = {
      id: -1,
      image: { preview: "", raw: "" },
      logo: "",
    };
  }

  renderImageUpload = () => {
    return (
			<div>
				<label htmlFor='upload-button'>
					{this.state.image.preview || this.state.logo !== "" ? (
						<>
							<img
								src={
									this.state.id === -1
										? this.state.image.preview
										: process.env.REACT_APP_API_ENDPOINT + this.state.logo
								}
								alt='preview'
								className='preview-icon cursor'
							/>
							<span
								className='primary f-14 cursor'
								style={{ marginLeft: "18px" }}
							>
								&nbsp; Change Image
							</span>
						</>
					) : (
						<>
							<>
								<img
									id='logo'
									src='../../../assets/icons/upload.png'
									alt='upload'
									className='big-icon cursor'
								/>
								<span
									className='primary f-14 cursor'
									style={{ marginLeft: "18px" }}
								>
									&nbsp; Upload Image
								</span>
							</>
						</>
					)}
				</label>
				<input
					type='file'
					id='upload-button'
					style={{ display: "none" }}
					onChange={this.handleChange}
				/>
			</div>
		);
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

  componentDidMount() {
    console.log("authUser", this.props.authUser);
    //loading
  }

  render() {
    let profile: IProfile = {
      title: "Azlan Razali",
      isLogo: true,
      display_item: [
        { title: "AGE", value: "28" },
        { title: "GENDER", value: "28" },
        { title: "FAVOURITE STROKE", value: "28" },
        { title: "PERSONAL BEST", value: "28" },
      ],
    };

    let item: IListItem = {
      text: "Pro Youth Morning",
      callback: () => console.log("log click item"),
      smallText: "",
      icon: <img src={"/assets/icons/logo.png"} className="logo-icon" />,
      secondryText: true,
      isBigIcon: false,
    };

    let item2: IListItem = {
      text: "100m Freestyle",
      callback: () => console.log("log click item"),
      smallText: "Male, 9-10 y/o, 64.42s",
      icon: <></>,
      secondryText: false,
      isBigIcon: false,
    };

    return (
      <>
        <div className="wrapper-mobile">
          <div className="content-mobile col-sm-12">
            <div className="mb-32">
              <Link to={this.backUrl}>
              <button type="submit" className="back-btn">
                <ArrowBackIcon
                  sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                ></ArrowBackIcon>
              </button>
              </Link>
            </div>
            <div className="mb-8 center f-12">
              <span>PHOTO</span>
            </div>
            <div className="mb-8 center">{this.renderImageUpload()}</div>
            <div className="row mb-8">
              <div className="col-6">
                <div>
                  <span className="f-10">Stroke</span>
                </div>
                <div>
                  <span className="f-16 fw-500">Freestyle</span>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <span className="f-10">Length</span>
                </div>
                <div>
                  <span className="f-16 fw-500">100 metres</span>
                </div>
              </div>
            </div>
            <div className="mb-8"></div>
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

export default connect(mapStateToProps, {})(CoachEditProfilePage);
