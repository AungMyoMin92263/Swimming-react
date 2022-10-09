import React from 'react';
import './App.css';
import { getItem } from './auth/LocalStorage';
import RouteList from './routes/router';
import { AuthInterface } from './stores/model/auth-interface';
import { StoreState } from './stores/reducers';
import { connect } from "react-redux";
import { setUpdateObj, LoadingActionFunc } from "./stores/actions";
// interface IProps {
//   path: string;
// }

// type AppProps = IProps;

interface AppStates {
  isBusy: boolean;
  isAuth: boolean;
  password: string;
  user: string;
  error: boolean;
}
interface UserSignInPage {
  setUpdateObj: Function;
  authUser?: AuthInterface;
  response?: any;
  LoadingActionFunc: Function;
  loading: any;
}


type IProps = UserSignInPage;
class App extends React.Component<IProps, AppStates> {
  constructor(props: IProps) {
    super(props);
    this.state = { isBusy: false, isAuth: true, user: '', password: '', error: false };
  }
  appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }
  componentWillMount(): void {
    window.addEventListener('resize', this.appHeight)
    this.appHeight()
  }
  componentDidMount() {
    const authUser = getItem('authUser');
    if (authUser) {
      let authOb = JSON.parse(authUser)
      this.props.setUpdateObj(authOb.userInfo)
    }
  }

  render() {
    return <div className={`${this.props.loading.loading > 0 ? "loading" : "no-loading"}`}><div className='loader-ajax'></div><RouteList></RouteList></div>;
  }


}

const mapStateToProps = ({
  authUser, loading

}: StoreState): {
  authUser: AuthInterface; loading: any;
} => {
  return {
    authUser, loading
  };
};

export default connect(mapStateToProps, { setUpdateObj, LoadingActionFunc })(App);

// export default connect({}, { setUpdateObj })(App);;
