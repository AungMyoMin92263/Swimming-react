import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { InitialIcon } from "../atoms/InitialIcon";
import { StoreState } from "../stores/reducers";
import { getAllBadges, getMyBadges, giveBadgeToStudent, selectGiveBadge } from "../stores/actions/badge-action";
import ListItem from "../atoms/ListItem";
import AddIcon from '@mui/icons-material/Add';
import BadgeItem from "../atoms/BadgeItem";

interface IStates {
}
interface IProps {
  getMyBadges: Function;
  getAllBadges: Function;
  selectGiveBadge: Function;
  receiverId: any;
  badges?: any
  isOwn?: boolean
  defaultPath: string
  history: any
  schoolId?: any
}

class BadgesListPage extends React.Component<IProps, IStates> {

  constructor(props: any) {
    super(props);

  }

  componentDidMount(): void {
    this.getAllBadge();
    if (this.props.isOwn) {
      this.getMyBadge()
    } else {
      this.getAllBadge()
    }
  }

  getMyBadge = async () => {
    // {class_id}
    await this.props.getMyBadges(this.props.receiverId)
  }

  getAllBadge = async () => {
    await this.props.getAllBadges(this.props.schoolId)
  }

  createProfile = (image_url: string, name: string) => {
    if (image_url) {
      return (
				<img
					src={
						image_url
							? process.env.REACT_APP_API_ENDPOINT + "/" + image_url
							: ""
					}
					className='logo-icon'
					alt=''
				/>
			);
    } else {
      return <InitialIcon
        initials={name.substr(0, 1).toUpperCase()}
        isFooterMenu={true}
      />
    }
  }

  createIcon = () => {
    return (
      <div className="create-icon">
        <AddIcon></AddIcon>
      </div>
    )
  }

  goCreateBadge = () => {
    this.props.history.push(this.props.defaultPath + "/create-badge")
  }

  sendBadge = async (badge: any) => {
    this.props.selectGiveBadge(badge)
    this.props.history.push(this.props.defaultPath +"/icon-confirm")
  }

  render() {
    let badgesList = this.props.isOwn ? this.props.badges.my_list.map((res: any) => {
      return {
        ...res.badge,
        own_id: res.id
      }
    }) : this.props.badges.badges_list
    // const badges = (badgesList || []).map((badge: any) => {
    //   return {
    //     text: badge.badge.name,
    //     icon: badge.badge.icon,
    //     callback: () => { },
    //     isActive: true,
    //   }
    // })
    console.log(badgesList);

    return (
      <>
        <ListItem
          text={"Create a new badge"}
          smallText={"Reward your students."}
          callback={() => this.goCreateBadge()} isBigIcon={true}
          icon={this.createIcon()}
          arrowRight={true}
        />
        {badgesList.length > 0 ?
          <>
            {badgesList.map((badge: any) => {
              return <ListItem
                text={badge.name}
                key={`badgeList${badge.id}`}
                callback={() => { this.sendBadge(badge) }}
                icon={<BadgeItem icon={badge.logo} color={badge.color} callback={() => { this.sendBadge(badge) }}></BadgeItem>}
                arrowRight={true}
                smallText={badge.description}
                isBigIcon={true} />
            })}
          </>
          :
          <></>
        }
      </>
    )
  }
}

const mapStateToProps = ({
  badges
}: StoreState): {
  badges: any;
} => {
  return {
    badges
  };
};

export default connect(mapStateToProps, { getMyBadges, getAllBadges, selectGiveBadge })(BadgesListPage)