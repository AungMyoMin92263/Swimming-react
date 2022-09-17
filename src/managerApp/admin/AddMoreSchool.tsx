import React from "react";
import { LoadingActionFunc } from "../../stores/actions";

// icon
import AddIcon from "@mui/icons-material/Add";

import { Link } from "react-router-dom";
import { School } from "../../stores/model/school";

import { connect } from "react-redux";
import { SchoolInterface } from "../../stores/model/school-interface";
import { StoreState } from "../../stores/reducers";
import { getItem, removeItem } from "../../auth/LocalStorage";
interface IStates {
	schools: School[];
	name:string;
	image:any
}
interface IProps {
	schools: any;
	school:School;
	LoadingActionFunc : Function;
}

class AddMoreSchoolPage extends React.Component<IProps, IStates> {
	constructor(props: any) {
		super(props);

		this.state = {
			name:'',
			image:{},
			schools: [],
		};
	}
	componentDidMount() {
		var schoolobj = JSON.parse(getItem("school") || "null");
		if (schoolobj) var school = schoolobj

		if (school) {
			this.setState({
				name: school.name,
				image: school.logo,
			});
		}
		this.props.LoadingActionFunc(false);
	}


	render() {
		const {name, image} = this.state;

		return (
			<>
				<div className='wrapper'>
					<div className='primary f-16 project-header'>
						<span>My Report Cards</span>
					</div>
					<div className='container-cus'>
						<div className='content col-lg-6 col-md-6 col-sm-12'>
							<div className='f-32 fw-500'>
								<span>Your Schools.</span>
							</div>
							<div className='f-16 mb-32'>
								<span>Get started by adding a school you manage.</span>
							</div>
							<div className='mb-16 flex'>
								<img
									src={
										image
											? process.env.REACT_APP_API_ENDPOINT + "/"+
											image
											: "../../../assets/icons/logo.png"
									}
									alt='right-arrow'
									className='item-icon'
								/>
								<span className='f-16'>
									{name
										? name
										: ""}
								</span>
							</div>
							<div className='hr mb-16'></div>
							<Link to='/admin/add-school' style={{ textDecoration: "none" }} onClick={()=> removeItem("school")}>
								<div className='mb-16 align-center'>
									<AddIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></AddIcon>
									<span className='primary'>Add another school</span>
								</div>
							</Link>

							<div className='hr mb-32'></div>
							<Link to='/admin/dashboard' style={{ textDecoration: "none" }}>
								<button type='submit' className='primary-btn right' onClick={()=> removeItem("school")}>
									Done
								</button>
							</Link>
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
	schools: SchoolInterface;
} => {
	return {
		schools,
	};
};

export default connect(mapStateToProps, { LoadingActionFunc })(AddMoreSchoolPage);

