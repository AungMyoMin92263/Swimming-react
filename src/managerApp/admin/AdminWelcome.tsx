import React from "react";
import { IPageProp } from "../../pagePropsInterface";

// import csss
import styles from "./../../css/pages.module.css";
class AdminWelcomePage extends React.Component<IPageProp> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: "",
      password: "",
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
            <div className="content-center">
              <div className="fw-500 f-48">
                <span>Welcome to My Report Cards.</span>
              </div>
              <div style={{ marginTop: '-80px' }}>
                <img
                  src="../../../assets/images/mobile.png"
                  alt="mobile"
                  className="mobile-image"
                />
              </div>
              <div className="f-24 mb-32" style={{ marginTop: '-100px' }}>
                <span>Manage Your Classes</span>
              </div>
              <button type="submit" className="btn btn-primary" onClick={() => this.props.history.push('/')}>
                Next&nbsp;
                <img
                  src="../../../assets/icons/right-arrow.png"
                  alt="right-arrow"
                  className="icon"
                />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminWelcomePage;
