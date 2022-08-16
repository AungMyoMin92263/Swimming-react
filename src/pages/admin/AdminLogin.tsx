import React from "react";


// import csss
import styles from "./../../css/pages.module.css";

interface IStates {
	email : string,
    password : string,
}

class AdminLoginPage extends React.Component {
	//urls

	constructor(props: any) {
		super(props);
		this.state = {
            email : '',
            password : ''
		};
	}

	componentDidMount() {
		//loading
	}

	render() {
		return (
			<>
                <div className="wrapper">
    <div className="primary f-16 project-header">
        <span>My Report Cards</span>
    </div>
    <div className="container">
        <div className="content">
            <div className="title mb-16">
                <span>Login</span>
            </div>
            <div className="mb-16">
                {/* <label for="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter your email address"> */}
              </div>
              <div className="mb-32">
                {/* <label for="exampleFormControlInput1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Enter your password"> */}
              </div>
              <span>Forgot password?</span>
              <a href="http://localhost:4200/app/sub-page/managers/welcome">
                <button type="submit" className="btn btn-primary right">Login</button>
              </a>
        </div>

    </div>
</div>
			</>
		);
	}
}

export default AdminLoginPage;
