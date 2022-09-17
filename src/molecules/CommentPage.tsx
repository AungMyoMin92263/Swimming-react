import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import CommentItem from "../atoms/Comment";
import { InitialIcon } from "../atoms/InitialIcon";
import ListBoxUI from "./ListBox";
import { getAllComment } from "../stores/actions";
import { AuthInterface } from "../stores/model/auth-interface";
import { StoreState } from "../stores/reducers";

interface IStates {
  comments: any[]
}
interface IProps {
  getAllComment: Function;
  receiverId: any;
  isClass: boolean
  comments?: any
}

class CommentListPage extends React.Component<IProps, IStates> {

  constructor(props: any) {
    super(props);
    this.state = {
      comments: []
    }
  }

  componentDidMount(): void {
    this.getComments()
  }

  getComments = async () => {
    let url = this.props.isClass ? "comment/by-class/" : "comment/by-student/"
    await this.props.getAllComment(url + this.props.receiverId)
    this.setState({
      comments: this.props.comments.result,
    });
    // {class_id}
  }

  createProfile = (image_url: string, name: string) => {
    if (image_url) {
      return <img src={"/assets/icons/logo.png"} className="logo-icon" />
    } else {
      return <InitialIcon
        initials={name.substr(0, 1).toUpperCase()}
        isFooterMenu={true}
      />
    }
  }

  render() {
    const { comments } = this.state
    return (
      <div>

        <div className='page-tile pt-24 pb-40'>All Comments</div>
        {comments.length > 0 ?
          <ListBoxUI
            title=""
            callback={() => { }}
            callback2={() => { }}
            noBtn={true}
            noTitle={true}
          // more2={true}
          >
            <>
              {comments.map((cmd: any, index: number) =>
                <CommentItem
                  profile={this.createProfile(cmd.user_info.avatar, cmd.user_info.name)}
                  message={cmd.message}
                  callback={() => { }}
                  timeString={cmd.user_info.name + " at " + moment(cmd.created_at).format("DD MMM, h:mm a")}
                  key={`cmd-item-${index}`} />
              )}
            </>
            {/*  */}

          </ListBoxUI>
          : <></>}
      </div>
    )
  }
}

const mapStateToProps = ({
  comments
}: StoreState): {
  comments: any;
} => {
  return {
    comments
  };
};

export default connect(mapStateToProps, { getAllComment })(CommentListPage)