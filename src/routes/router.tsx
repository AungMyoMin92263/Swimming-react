import React from "react";
import { Outlet, Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import SideBar from "../Layouts/menuSideBar";

//import pages
import AdminDashboardPage from "../managerApp/admin/AdminDashboard";
import AdminLoginPage from "../managerApp/admin/AdminLogin";
import AdminWelcomePage from "../managerApp/admin/AdminWelcome";
import AddSchoolPage from "../managerApp/admin/AddSchool";
import InviteManagerPage from "../managerApp/admin/InviteManager";
import AddMoreSchoolPage from "../managerApp/admin/AddMoreSchool";

import ManagerDashboardPage from "../managerApp/manager/ManagerDashboard";
import ProtectedRoute from "./protectRoute";
import { createBrowserHistory } from "history";
import AddClass from "../managerApp/manager/AddClass";
import SetDateTime from "../managerApp/manager/SetDateTime";
import InviteCoachPage from "../managerApp/manager/InviteCoach";
import InviteStudentPage from "../managerApp/manager/InviteStudent";
import InvitedStudentSummaryPage from "../managerApp/manager/InvitedStudentSummary";
import ManagerCreatePasswordPage from "../managerApp/manager/ManagerCreatePasswordPage";
import AdminRecoverPasswordPage from "../managerApp/admin/AdminRecoverPasswordPage";
import AdminChangePasswordPage from "../managerApp/admin/AdminChangePasswordPage";

const windowHistory = createBrowserHistory({ window });

const propsMenu = { isAdmin : true};
const propsMenuManager = { isAdmin : false};
const routes = [
	{
		path: "/admin",
		child: [
			{
				path: "recover-password",
				sideBar: <></>,
				main: () => (
					<>
						<AdminRecoverPasswordPage />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
			{
				path: "change-password",
				sideBar: <></>,
				main: () => (
					<>
						<AdminChangePasswordPage />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
			{
				path: "login",
				sideBar: <></>,
				main: () => (
					<>
						<AdminLoginPage />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
			{
				path: "welcome",
				sideBar: <></>,
				main: (props: any) => (
					<>
						<AdminWelcomePage {...props} />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
			{
				path: "dashboard",
				sideBar: <SideBar {...propsMenu}></SideBar>,
				main: () => (
					<>
						<AdminDashboardPage />
					</>
				),
				footer: <></>,
				isSideBar: true,
			},

			{
				path: "add-school",
				sideBar: <></>,
				main: (props: any) => (
					<>
						<AddSchoolPage {...props} />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},

			{
				path: "invite-manager",
				sideBar: <></>,
				main: (props: any) => (
					<>
						<InviteManagerPage {...props} />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
			{
				path: "add-more-school",
				sideBar: <></>,
				main: (props: any) => (
					<>
						<AddMoreSchoolPage {...props} />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
		],
	},
	{
		path: "/manager",
		child: [
			{
				path: "create-password",
				sideBar: <></>,
				main: () => (
					<>
						<ManagerCreatePasswordPage />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
			{
				path: "login",
				sideBar: <></>,
				main: () => (
					<>
						<AdminLoginPage />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
			{
				path: "dashboard",
				sideBar: <SideBar {...propsMenuManager}></SideBar>,
				main: () => (
					<>
						<ManagerDashboardPage />
					</>
				),
				footer: <></>,
				isSideBar: true,
			},
			{
				path: "add-class",
				sideBar: <SideBar {...propsMenuManager}></SideBar>,
				main: (props: any) => (
					<>
						<AddClass {...props} />
					</>
				),
				footer: <></>,
				isSideBar: true,
			},
			{
				path: "set-date-time",
				sideBar: <SideBar {...propsMenuManager}></SideBar>,
				main: (props: any) => (
					<>
						<SetDateTime {...props} />
					</>
				),
				footer: <></>,
				isSideBar: true,
			},
			{
				path: "invite-coach",
				sideBar: <></>,
				main: (props: any) => (
					<>
						<InviteCoachPage {...props} />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
			{
				path: "invite-student",
				sideBar: <></>,
				main: (props: any) => (
					<>
						<InviteStudentPage {...props} />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
			{
				path: "invite-student-summary",
				sideBar: <></>,
				main: (props: any) => (
					<>
						<InvitedStudentSummaryPage {...props} />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
		],
	},
	{
		path: "/student",
		child: [
			{
				path: "create-password",
				sideBar: <></>,
				main: () => (
					<>
						<ManagerCreatePasswordPage />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
			{
				path: "login",
				sideBar: <></>,
				main: () => (
					<>
						<AdminLoginPage />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
			{
				path: "dashboard",
				sideBar: <SideBar {...propsMenuManager}></SideBar>,
				main: () => (
					<>
						<ManagerDashboardPage />
					</>
				),
				footer: <></>,
				isSideBar: true,
			},
			{
				path: "add-class",
				sideBar: <SideBar {...propsMenuManager}></SideBar>,
				main: (props: any) => (
					<>
						<AddClass {...props} />
					</>
				),
				footer: <></>,
				isSideBar: true,
			},
			{
				path: "set-date-time",
				sideBar: <SideBar {...propsMenuManager}></SideBar>,
				main: (props: any) => (
					<>
						<SetDateTime {...props} />
					</>
				),
				footer: <></>,
				isSideBar: true,
			},
			{
				path: "invite-coach",
				sideBar: <></>,
				main: (props: any) => (
					<>
						<InviteCoachPage {...props} />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
			{
				path: "invite-student",
				sideBar: <></>,
				main: (props: any) => (
					<>
						<InviteStudentPage {...props} />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
			{
				path: "invite-student-summary",
				sideBar: <></>,
				main: (props: any) => (
					<>
						<InvitedStudentSummaryPage {...props} />
					</>
				),
				footer: <></>,
				isSideBar: false,
			},
		],
	},
];

class RouteList extends React.Component {
  renderPage = (child: any, index: any, porps: any) => {
    let prop: any
    if (child.isSideBar) {
      return (
        <Route
          path={child.path}
          key={index + "child-aside"}
          element={
            <ProtectedRoute {...prop} path={child.path}>
              <div className="main-layout">
                <div>
                  <div className="shadow-box"></div>
                  {child.sideBar}
                </div>
                <div className="main-body">{<child.main {...porps} />}</div>
                <div className="footer-menu">{child.footer}</div>
              </div>
            </ProtectedRoute>
          }
        />
      );
    } else {
      return (
        <Route
          path={child.path}
          key={index + "no-aside"}
          element={
            <ProtectedRoute {...prop} path={child.path}>
              <div className="main-layout">
                <div>
                  <div className="banner-box"></div>
                  <img src="../../../assets/images/banner.png" alt="banner" className="banner-image" />
                </div>
                <div className="main-body">{<child.main />}</div>
                <div className="footer-menu">{child.footer}</div>
              </div>
            </ProtectedRoute>
          }
        />
      );
    }
  };

  render() {
    return (
      <div>
        <HistoryRouter history={windowHistory}>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index + "app-aside"}
                path={route.path}
                element={
                  <div className="app-layout">
                    <Outlet key={index + "child-layout"} />
                  </div>
                }
              >
                {route.child.map((child, index) => (
                  <React.Fragment key={index + "child-" + index}>{this.renderPage(child, index, windowHistory)}</React.Fragment>
                ))}
                {/* <Route index element={<Home />} /> */}
                {/* {route.child.map((child, index) => (
                // <div>
                <Route path={child.path} key={index + 'child-aside'}
                  element={
                    <div className='side-bar'>{child.sideBar}</div>
                  }
                />
              ))}
              {route.child.map((child, index) => (
                // <div>
                <Route path={child.path} key={index + 'child-main'}
                  element={
                    <div className='main-body'>{child.main}</div>
                  }
                />
              ))}
              {route.child.map((child, index) => (
                // <div>
                <Route path={child.path} key={index + 'child-footer'}
                  element={
                    <div className='footer-menu'>{child.footer}</div>
                  }
                />
              ))} */}
              </Route>
            ))}
          </Routes>
        </HistoryRouter>
      </div>
    );
  }
}
export default RouteList;
