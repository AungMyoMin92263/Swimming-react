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
const roleByUrl: any = {
  "coache": '/coach',
  "parent": '/parent',
  "manager": "/manager",
  "admin": "/admin",
  "student": "/student"
}
const allows = ['login', 'create-password', 'recover-password', 'change-password']
const ProtectedRoute = (prop: CustomRouteInterface) => {
  let token = getItem('userToken')
  let userObj = JSON.parse(getItem('authUser') || "null")
  let appName =  prop?.appname === "/coach" ? "/coache" : prop?.appname
  if (prop.path === '/login' && token) {
    return <Navigate to={prop.appname} replace />;
  }
  if(userObj && userObj.userInfo){
    if(userObj.userInfo.role !== 'parent'){
      if ("/"+userObj.userInfo.role !== appName) {
        let redUrl = roleByUrl[userObj.userInfo.role]
        return <Navigate to={redUrl} replace />;
      }
    }else if (appName !== '/student' && appName !== '/parent'){
        let redUrl = roleByUrl[userObj.userInfo.role]
        return <Navigate to={redUrl} replace />;
    }
  }
  if (!token && !allows.includes(prop.path)) {
    return <Navigate to={"/login"} replace />;
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