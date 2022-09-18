import React from 'react';
import './menuBar.css';

export default class FooterMobile extends React.Component {
    constructor(props: any) {
      super(props);
  
      this.state = {
        name: "",
      };
    }
    componentDidMount() {
      //loading
    }
  
    render() {
      return (
        <>
        <div className="menu-bar">
        <div className="menu-list">
          <div className="menu-item">
            <img src={"/assets/icons/home.png"} alt="home" className="item-icon" />
            <span className="item-text">Home</span>
          </div>
          <div className="menu-item">
            <img src={"/assets/icons/classes.png"} alt="className" className="item-icon" />
            <span className="item-text">Classes</span>
          </div>
          <div className="menu-item">
            <img src={"/assets/icons/events.png"} alt="event" className="item-icon" />
            <span className="item-text">Events</span>
          </div>
          <div className="menu-item">
            <img src={"/assets/icons/me.png"} alt="profile" className="item-icon" />
            <span className="item-text">Me</span>
          </div>
        </div>
      </div>
        </>
      );
    }
  }
