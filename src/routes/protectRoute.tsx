import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AuthInterface } from "../stores/model/auth-interface";
import { StoreState } from "../stores/reducers";
import { useNavigate } from 'react-router-dom';
import { getItem } from "../auth/LocalStorage";
interface CustomRouteInterface {
  authUser: AuthInterface
  children: JSX.Element,
  path: string
  appname: string
}
const allows = ['login','create-password','recover-password','change-password']
const ProtectedRoute = (prop: CustomRouteInterface) => {
  let token = getItem('userToken')
  if (prop.path === '/login' && token) {
    return <Navigate to={prop.appname} replace />;
  }
  if (!token && !allows.includes(prop.path)) {
    return <Navigate to={prop.appname + "/login"} replace />;
  }
  return prop?.children;
};
const mapStateToProps = ({
  authUser
}: StoreState): {
  authUser: AuthInterface;
} => {
  return {
    authUser
  };
};
export default connect(mapStateToProps)(ProtectedRoute)