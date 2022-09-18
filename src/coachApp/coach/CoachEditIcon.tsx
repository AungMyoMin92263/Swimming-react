import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IListItem } from "../../atoms/ListItem";
import { Link, Navigate } from "react-router-dom";
import BadgeItem from "../../atoms/BadgeItem";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import { selectBadgeIcon } from "../../stores/actions/badge-action";

interface IStates {
  goCreateBadge: boolean;
  selected: string
}

interface IProps {
  authUser: AuthInterface;
  selectBadgeIcon: Function
  history: any
}

class CoachEditIconPage extends React.Component<IProps, IStates> {
  icons = ["prize.svg", "wave.svg", "circle.svg", "muscle.svg", "star.svg", "fish.svg", "swimming.svg", "pool.svg", "prize-2.svg", "water.svg", "dop.svg", "shark.svg", "trophy.svg", "user-icon.svg", "target.svg", "final.svg"]
  constructor(props: any) {
    super(props);

    this.state = {
      goCreateBadge: false,
      selected: ''
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
      goCreateBadge
    } = this.state;

    return (
      <>
        <div className="wrapper-mobile">
          {goCreateBadge && <Navigate to="/coach/create-badge" replace={true} />}

          <div className="content-mobile-cus-space bg-w col-sm-12">
            {/* <div className="mb-32">
              <Link to="/coach/create-badge">
                <button type="submit" className="back-btn">
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                </button></Link>
            </div> */}
            <CoachMobileHeader backBtn={true}></CoachMobileHeader>
            <div className="f-32 fw-500 mt-16 mb-32" style={{ width: "247px" }}>
              <span>Edit Icon</span>
            </div>
            <div className="">
              <div className="row">
                {this.icons.map((icon, index) => {
                  return <div className="col-3 mb-24" key={"icon" + index}>
                    <BadgeItem icon={'/assets/icons/' + icon} isSelected={icon === this.state.selected} callback={() => {
                      console.log(icon);
                      this.setState({
                        ...this.state,
                        selected: icon
                      })
                    }} />
                    {/* <div className="badge-icon-box">
                      <img src={'/assets/icons/' + icon} alt="" onClick={() => {
                        
                      }} />
                    </div> */}
                  </div>
                })}

              </div>
            </div>
            <button type="submit" className="btn btn-primary cus-primay-btn-m right w-100" onClick={() => {
              this.props.selectBadgeIcon(this.state.selected)
              this.props.history.back()
            }}>
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

export default connect(mapStateToProps, { selectBadgeIcon })(CoachEditIconPage);
