import React from "react";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon

import { Link, Navigate } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";
import { putUser,LoadingActionFunc } from "../../stores/actions";
import { getItem } from "../../auth/LocalStorage";
import { InitialIcon } from "../../atoms/InitialIcon";

interface IStates {
  id: number;
  name: string;
  isManagerNameValid: boolean;
  isManagerNameEmpty: boolean;
  nameMsg: string;
  image: any;
  logo: string;
  email : string;
  password : string;
  isCompleted: boolean;
  isChangeLogo: boolean;
  errorMsg:string;
}

interface IProps {
  match : any;
  user : any;
  putUser : Function;
  LoadingActionFunc : Function;
}
class AddManagerNamePage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      id:  -1,
      name: "",
      isManagerNameValid: true,
      isManagerNameEmpty: false,
      nameMsg: "",
      image: { preview: "", raw: "" },
      logo: "",
      email : "",
      password : "",
      isCompleted: false,
      isChangeLogo: false,
      errorMsg: ''
    };
  }
  componentDidMount() {
    this.authFromLocal();
  }

  authFromLocal = async () => {
    let user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
      this.setState({
        id : user.userInfo.id,
        name : user.userInfo.name,
        logo : user.userInfo.avatar,
        email : user.userInfo.email,
        password : user.userInfo.password,
      })
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
          isChangeLogo: this.state.id === -1 ? false : true,
        });
        //setItem('school_img_file', temp.raw);
      }
    }
  };

  isValid = () => {
    if (this.state.name === "" || this.state.logo === "") return false;
    else return true;
  };

  submit = async () => {
    if (this.isValid()) {
      const formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("email", this.state.email);
      formData.append("password", this.state.password);
      if(this.state.logo)formData.append("avatar", this.state.logo);
      this.props.LoadingActionFunc(true);

      await this.props.putUser(formData,'users', this.state.id);

        if (this.props.user.error) {
          this.setState({
            isCompleted: false,
            errorMsg:this.props.user.error
          });
          this.props.LoadingActionFunc(false);
        } else {
          if (this.props.user.result)
          // setItemWithObject("authUser", this.props.authUser.result.data);
          console.log('this.props.user.result',this.props.user.result)
          this.setState({
            isCompleted: true,
            name: this.props.user.result.data.name,
            logo: this.props.user.result.data.logo,
          });
        }
    }
  };

  renderBtn = () => {
    if (!this.isValid()) {
      return (
        <button type="submit" className="idle-btn fw-600 ml-16">
          Done
        </button>
      );
    } else
      return (
        <>
          {this.state.isCompleted && (
            <Navigate to="/manager/dashboard" replace={true} />
          )}
          <button
            type="submit"
            className="primary-btn fw-600 ml-16"
            onClick={this.submit}
          >
            Done
          </button>
        </>
      );
  };

  renderImageUpload = () => {
    return (
      <div>
        <div className="f-12 mb-8">Photo(Optional)</div>
        <label htmlFor="upload-button">
          {this.state.image.preview || (this.state.logo && this.state.logo !== "") ? (
            <>
              <img
                src={
                  this.state.id === -1
                    ? this.state.image.preview
                    : this.state.isChangeLogo
                    ? this.state.image.preview
                    : process.env.REACT_APP_API_ENDPOINT + "/" + this.state.logo
                }
                alt="preview"
                className="preview-icon cursor  mb-8"
              />
              <span
                className="primary f-14 cursor"
              >
                &nbsp; Change Image
              </span>
            </>
          ) : (
            <>
              <>
                {/* <img
                  id="logo"
                  src="../../../assets/icons/upload.png"
                  alt="upload"
                  className="big-icon cursor"
                /> */}

                <InitialIcon initials={this.state.email? this.state.email.substr(0, 1).toUpperCase() : ''} isFooterMenu={false} isInitialIcon={true}/>

                <span
                  className="primary f-14 cursor  mb-8"
                >
                  &nbsp; Upload Image
                </span>
              </>
            </>
          )}
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
    const { name, isManagerNameEmpty, isManagerNameValid, nameMsg, errorMsg } = this.state;

    return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<Link to='/manager/dashboard'>
							<span>My Report Cards</span>
						</Link>
					</div>
					<div className='container-cus'>
						<div className='content col-6 col-md-6 col-sm-12'>
							<div className='f-32 fw-500 mb-8'>
								<span>Tell us a bit about yourself!</span>
							</div>
							<div className='f-16 mb-16 fw-400 mb-32'>
								<span>Welcome to My Report Cards!</span>
							</div>
							<div className='mb-16 align-center'>
								{this.renderImageUpload()}
							</div>

							<div className='fw-400 mb-16'>
								<InputFormAtom
									label='Name'
									placeholder={"Enter your name"}
									warning={nameMsg}
									type='text'
									showWarning={isManagerNameEmpty || !isManagerNameValid}
									isDropdown={false}
									callback={(value: string) => {
										this.setState({
											name: value,
										});
									}}
									id='addManagerName'
									name='addManagerName'
									value={name}
									required={true}
									maxLength={200}
									className=''
									clickCallback={() => {}}
									focusCallback={() => {
										// this.setState({
										//   isManagerNameEmpty: false,
										//   isManagerNameValid: true,
										// });
									}}
								/>
							</div>
							{errorMsg && <p className='text-danger'>{errorMsg}</p>}
							<div className='right flex-center'>
								{this.renderBtn()}
							</div>
						</div>
					</div>
				</div>
			</>
		);
  }
}

const mapStateToProps = ({
  schools,user
}: StoreState): {
  schools: any;user : any;
} => {
  return {
    schools,user
  };
};

export default connect(mapStateToProps, { putUser,LoadingActionFunc })(
  AddManagerNamePage
);