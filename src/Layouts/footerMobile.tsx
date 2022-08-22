import { IPageProp } from '../pagePropsInterface';
import './MenuSideBar.css';

const FooterMobileMenu = (props: IPageProp) => {
  console.log(props.history.location);
  let path = props.history.location.pathname.split("/")
  console.log('ffffffffff')
  return (
    <div className="menu-bar">
    <div className="menu-list">
      <div className={`menu-item ${path[2] === 'dashboard' ? "active" : ""}`} onClick={() => props.history.push('dashboard')}>
        <img src={"/assets/icons/home.png"} alt="home" className="item-icon" />
        <span className="item-text">Home</span>
      </div>
      <div className={`menu-item ${path[2] === 'class-list' ? "active" : ""}`} onClick={() => props.history.push('class-list')}>
        <img src={"/assets/icons/classes.png"} alt="className" className="item-icon" />
        <span className="item-text">Classes</span>
      </div>
      <div className={`menu-item ${path[2] === 'event-list' ? "active" : ""}`} onClick={() => props.history.push('event-list')}>
        <img src={"/assets/icons/events.png"} alt="event" className="item-icon" />
        <span className="item-text">Events</span>
      </div>
      <div className={`menu-item ${path[2] === 'profile' ? "active" : ""}`} onClick={() => props.history.push('profile')}>
        <img src={"/assets/icons/me.png"} alt="profile" className="item-icon" />
        <span className="item-text">Me</span>
      </div>
    </div>
  </div>
  )
}

export default FooterMobileMenu