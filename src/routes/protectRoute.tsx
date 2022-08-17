import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AuthInterface } from "../stores/model/auth-interface";
import { StoreState } from "../stores/reducers";

interface CustomRouteInterface {
  user: IUser
  children: JSX.Element,
  path: string
}
const ProtectedRoute = (prop: CustomRouteInterface) => {
  // if (!prop?.user && prop.path !== "login") {
  //   return <Navigate to="/admin/login" replace />;
  // }

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