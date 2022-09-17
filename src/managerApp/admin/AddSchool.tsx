import React from "react";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, Navigate } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";
import { postSchool, putSchool,getSchoolObj } from "../../stores/actions/school-action";
import { getItem, setItemWithObject } from "../../auth/LocalStorage";
import { LoadingActionFunc } from "../../stores/actions";

interface IStates {
  id: number;
  name: string;
  isSchoolNameValid: boolean;
  isSchoolNameEmpty: boolean;
  nameMsg: string;
  image: any;
  logo: string;
  isCompleted: boolean;
  isChangeLogo: boolean;
  errorMsg:string;
}

interface IProps {
  match : any;
  schools: any;
  postSchool: Function;
  putSchool: Function;
  getSchoolObj : Function;
  LoadingActionFunc : Function;
}
class AddSchoolPage extends React.Component<IProps, IStates> {
  id : any;
  constructor(props: any) {
    super(props);
    let path = window.location.pathname.split("/");
		this.id = path[3];

    this.state = {
      id: this.id? this.id : -1,
      name: "",
      isSchoolNameValid: true,
      isSchoolNameEmpty: false,
      nameMsg: "",
      image: { preview: "", raw: "" },
      logo: "",
      isCompleted: false,
      isChangeLogo: false,
      errorMsg: ''
    };
    this.props.LoadingActionFunc(true);
  }
  componentDidMount() {
    if(!this.state.id){ 
    let school = getItem("school");
    console.log(school)
    if (school) {
      let school1 = JSON.parse(school);
      if (school1) {
        this.setState({
          logo: school1.logo,
          id: school1.id,
          name: school1.name,
        });
      }
    }
    }else{
      this.getSchool();
    }
  }

  getSchool = async () => {
    await this.props.getSchoolObj('schools/'+this.state.id);
    if(this.props.schools.result){
      if (this.props.schools.error) {
        this.setState({
          errorMsg:this.props.schools.error
        });
      }else{
        let school = this.props.schools.result;
        if (school){
          setItemWithObject("school", school);
        this.setState({
          name: school.name,
          logo: school.logo,
          id: school.id,
        });
        }
      }
      this.props.LoadingActionFunc(false);

    }
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
          isChangeLogo: this.state.id === -1 ? false : true,
        });
        //setItem('school_img_file', temp.raw);
      }
    }
  };

  isValid = () => {
    if (this.state.name.length === 0 || this.state.logo === "") return false;
    else return true;
  };

  submit = async () => {
    if (this.isValid()) {
      this.props.LoadingActionFunc(true);
      const formData = new FormData();
      formData.append("name", this.state.name);
      if (this.state.id < 0) {
        formData.append("logo", this.state.image.raw);
      } else if (this.state.isChangeLogo) {
        formData.append("logo", this.state.image.raw);
      }

      if (this.state.id < 0) {
        await this.props.postSchool(formData);
        if (this.props.schools.error) {
          this.setState({
            isCompleted: false,
            errorMsg:this.props.schools.error
          });
        }else{
          if (this.props.schools.result)
          setItemWithObject("school", this.props.schools.result.data);
        this.setState({
          isCompleted: true,
          name: this.props.schools.result.data.name,
          logo: this.props.schools.result.data.logo,
          id: this.props.schools.result.data.id,
        });
        }
        this.props.LoadingActionFunc(false);
        
      } else {
        await this.props.putSchool(formData, this.state.id);

        if (this.props.schools.error) {
          this.setState({
            isCompleted: false,
            errorMsg:this.props.schools.error
          });
        } else {
          if (this.props.schools.result)
          setItemWithObject("school", this.props.schools.result.data);
          this.setState({
            isCompleted: true,
            name: this.props.schools.result.data.name,
            logo: this.props.schools.result.data.logo,
            id: this.props.schools.result.data.id,
          });
        }
        this.props.LoadingActionFunc(false);
      }
    }
  };

  renderBtn = () => {
    if (!this.isValid()) {
      return (
        <button type="submit" className="idle-btn fw-600 ml-16">
          Continue
        </button>
      );
    } else
      return (
        <>
          {this.state.isCompleted && (
            <Navigate to="/admin/invite-manager" replace={true} />
          )}
          <button
            type="submit"
            className="primary-btn fw-600 ml-16"
            onClick={this.submit}
          >
            Continue
          </button>
        </>
      );
  };

  renderImageUpload = () => {
    return (
      <div>
        <label htmlFor="upload-button">
          {this.state.image.preview || this.state.logo !== "" ? (
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
                className="preview-icon cursor"
              />
              <span
                className="primary f-14 cursor"
                style={{ marginLeft: "18px" }}
              >
                &nbsp; Change Image
              </span>
            </>
          ) : (
            <>
              <>
                <img
                  id="logo"
                  src="../../../assets/icons/upload.png"
                  alt="upload"
                  className="big-icon cursor"
                />
                <span
                  className="primary f-14 cursor"
                  style={{ marginLeft: "18px" }}
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
    const { name, isSchoolNameEmpty, isSchoolNameValid, nameMsg, errorMsg } = this.state;

    return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<Link to='/admin/dashboard'>
							<span>My Report Cards</span>
						</Link>
					</div>
					<div className='container-cus'>
						<div className='content col-6 col-md-6 col-sm-12'>
							<div className='f-14 mb-16'>
								<Link to='/admin/dashboard' style={{ textDecoration: "none" }}>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								</Link>
							</div>
							<div className='f-32 fw-500 mb-8'>
								<span>Add a school.</span>
							</div>
							<div className='f-16 mb-16 fw-400 mb-32'>
								<span>Get started by adding a school you manage.</span>
							</div>
							<div className='mb-16 align-center'>
								{this.renderImageUpload()}
							</div>

							<div className='fw-400 mb-16'>
								<InputFormAtom
									label='School Name'
									placeholder={"Enter name of school"}
									warning={nameMsg}
									type='text'
									showWarning={isSchoolNameEmpty || !isSchoolNameValid}
									isDropdown={false}
									callback={(value: string) => {
										this.setState({
											name: value,
										});
									}}
									id='addSchoolName'
									name='addSchoolName'
									value={name}
									required={true}
									maxLength={200}
									className=''
									clickCallback={() => {}}
									focusCallback={() => {
										// this.setState({
										//   isSchoolNameEmpty: false,
										//   isSchoolNameValid: true,
										// });
									}}
								/>
							</div>
							{errorMsg && <p className='text-danger'>{errorMsg}</p>}
							<div className='right flex-center'>
								<span className='secondary'>1 of 2</span>
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
  schools,
}: StoreState): {
  schools: any;
} => {
  return {
    schools,
  };
};

export default connect(mapStateToProps, { postSchool, putSchool,getSchoolObj,LoadingActionFunc })(
  AddSchoolPage
);
