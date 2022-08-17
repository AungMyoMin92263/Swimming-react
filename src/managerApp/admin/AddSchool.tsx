import React from "react";
import { IPageProp } from "../../pagePropsInterface";

// import csss
import styles from "./../../css/pages.module.css";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router-dom";
import InputFormAtom from "../../atoms/InputFormAtom";

interface IStates {
  name: string;
  isNameValid: boolean;
  isNameEmpty: boolean;
  nameMsg: string;
}

class AddSchoolPage extends React.Component<IPageProp, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: "",
      isNameValid: true,
      isNameEmpty: false,
      nameMsg: "",
    };
  }
  componentDidMount() {
    //loading
  }

  render() {
    const { name, isNameEmpty, isNameValid, nameMsg } = this.state;
    return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<span>My Report Cards</span>
					</div>
					<div className='container'>
						<div className='content'>
							<div className='f-14 mb-16'>
								<Link to='/admin/welcome' style={{ textDecoration: "none" }}>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
								</Link>
							</div>
							<div className='f-32 fw-500'>
								<span>Add a school.</span>
							</div>
							<div className='f-16 mb-16 fw-400'>
								<span>Get started by adding a school you manage.</span>
							</div>
							<div className='mb-16 align-center'>
								<img src='../../../assets/icons/upload.png' alt='upload' />
								<span className='primary f-14' style={{ marginLeft: "18px" }}>
									{" "}
									&nbsp; Upload Image
								</span>
							</div>
							<div className='fw-400 mb-16'>
								<InputFormAtom
									label='School Name'
									placeholder={"Enter name of school"}
									warning={nameMsg}
									type='text'
									showWarning={isNameEmpty || !isNameValid}
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
										this.setState({
											isNameEmpty: false,
											isNameValid: true,
										});
									}}
								/>
							</div>

							<Link to='/admin/invite-manager'>
								<div className='right'>
									<span className='secondary'>1 of 2</span>
									<button type='submit' className='idle-btn fw-600 ml-16'>
										Continue
									</button>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</>
		);
  }
}

export default AddSchoolPage;
