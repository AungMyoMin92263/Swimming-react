import React, { Fragment } from "react";
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

import AssignStudentPage from "../managerApp/manager/AssignStudent";


//student
import StudentLoginPage from "../studentApp/student/StudentLogin";
import FooterMobile from "../Layouts/footerMobile";
import EventListPage from "../managerApp/manager/EventListPage";
import AddEventPage from "../managerApp/manager/AddEventPage";
import StudentWelcomePage from "../studentApp/student/StudentWelcome";

//coach
import CoachLoginPage from "../coachApp/coach/CoachLogin";
import CoachWelcomePage from "../coachApp/coach/CoachWelcome";



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
				isMobileFooter: false,
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
				isMobileFooter: false,
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
				isMobileFooter: false,
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
				isMobileFooter: false,
			},
			{
				path: "dashboard",
				sideBar: <SideBar {...propsMenu}></SideBar>,
				main: (props: any) => (
					<>
						<AdminDashboardPage {...props} />
					</>
				),
				footer: <></>,
				isSideBar: true,
				isMobileFooter: false,
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
				isMobileFooter: false,
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
				isMobileFooter: false,
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
				isMobileFooter: false,
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
				isMobileFooter: false,
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
				isMobileFooter: false,
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
				isMobileFooter: false,
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
				isMobileFooter: false,
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
				isMobileFooter: false,
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
				isMobileFooter: false,
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
				isMobileFooter: false,
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
				isMobileFooter: false,
			},
			{
				path: "event-list",
				sideBar: (
					<>
						<SideBar {...propsMenuManager}></SideBar>,
					</>
				),
				main: (props: any) => (
					<>
						<EventListPage {...props} />
					</>
				),
				footer: <></>,
				isSideBar: true,
			},
			{
				path: "add-event",
				sideBar: (
					<>
						<SideBar {...propsMenuManager}></SideBar>,
					</>
				),
				main: (props: any) => (
					<>
						<AddEventPage {...props} />
					</>
				),
				footer: <></>,
				isSideBar: true,
			},
			{
				path: "assign-student",
				sideBar: (
					<>
						<SideBar {...propsMenuManager}></SideBar>,
					</>
				),
				main: (props: any) => (
					<>
						<AssignStudentPage {...props} />
					</>
				),
				footer: <></>,
				isSideBar: true,
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
				isMobileFooter: true,
			},
			{
				path: "login",
				sideBar: <></>,
				main: () => (
					<>
						<StudentLoginPage />
					</>
				),
				footer: <></>,
				isSideBar: false,
				isMobileFooter: true,
			},
			{
				path: "welcome",
				sideBar: <></>,
				main: () => (
					<>
						<StudentWelcomePage />
					</>
				),
				footer: <></>,
				isSideBar: false,
				isMobileFooter: true,
			},
			{
				path: "dashboard",
				sideBar: <></>,
				main: () => (
					<>
						<StudentWelcomePage />
					</>
				),
				footer: <FooterMobile></FooterMobile>,
				isSideBar: false,
				isMobileFooter: true,
			},
		],
	},
	{
		path: "/coach",
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
				isMobileFooter: true,
			},
			{
				path: "login",
				sideBar: <></>,
				main: () => (
					<>
						<CoachLoginPage />
					</>
				),
				footer: <></>,
				isSideBar: false,
				isMobileFooter: true,
			},
			{
				path: "welcome",
				sideBar: <></>,
				main: () => (
					<>
						<CoachWelcomePage />
					</>
				),
				footer: <></>,
				isSideBar: false,
				isMobileFooter: true,
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
                {/* <div className="footer-menu">{child.footer}</div> */}
              </div>
            </ProtectedRoute>
          }
        />
      );
    } else {
		if (child.isMobileFooter) {
			return (
				<Route
				  path={child.path}
				  key={index + "no-aside"}
				  element={
					<ProtectedRoute {...prop} path={child.path}>
					  <div className="main-layout">
						<div className="main-body">{<child.main />}</div>
						<div className="footer-menu">{child.footer}</div>
					  </div>
					</ProtectedRoute>
				  }
				/>
			  );
		}else{
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
					  </div>
					</ProtectedRoute>
				  }
				/>
			  );
		}
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
