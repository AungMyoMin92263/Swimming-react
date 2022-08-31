import React, { Fragment } from "react";
import {
	Outlet,
	Route,
	Routes,
	unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import SideBar from "../Layouts/AdminSideMenu";
import { createBrowserHistory } from "history";
//import pages
import AdminDashboardPage from "../managerApp/admin/AdminDashboard";
import AdminLoginPage from "../managerApp/admin/AdminLogin";
import AdminWelcomePage from "../managerApp/admin/AdminWelcome";
import AddSchoolPage from "../managerApp/admin/AddSchool";
import InviteManagerPage from "../managerApp/admin/InviteManager";
import AddMoreSchoolPage from "../managerApp/admin/AddMoreSchool";
import AdminEventListPage from "../managerApp/admin/EventListPage";

import ManagerDashboardPage from "../managerApp/manager/ManagerDashboard";
import ProtectedRoute from "./protectRoute";
import AddClass from "../managerApp/manager/AddClass";
import SetDateTime from "../managerApp/manager/SetDateTime";
import InviteCoachPage from "../managerApp/manager/InviteCoach";
import InviteStudentPage from "../managerApp/manager/InviteStudent";
import InvitedStudentSummaryPage from "../managerApp/manager/InvitedStudentSummary";
import ManagerCreatePasswordPage from "../managerApp/manager/ManagerCreatePasswordPage";
import AdminRecoverPasswordPage from "../managerApp/admin/AdminRecoverPasswordPage";
import AdminChangePasswordPage from "../managerApp/admin/AdminChangePasswordPage";
import AdminPeopleListPage from "../managerApp/admin/PeopleListPage";

import AssignStudentPage from "../managerApp/manager/AssignStudent";
import EventList from "../managerApp/manager/EventList";
import PeopleListPage from "../managerApp/manager/PeopleListPage";
import ManagerLoginPage from "../managerApp/manager/ManagerLogin";

//student
import StudentLoginPage from "../studentApp/student/StudentLogin";
import AddEvent from "../managerApp/manager/AddEvent";
import StudentWelcomePage from "../studentApp/student/StudentWelcome";
import StudentDashboardPage from "../studentApp/student/StudentDashboard";
import StudentClassesPage from "../studentApp/student/StudentClasses";
import StudentEventsPage from "../studentApp/student/StudentEvents";

//coach
import CoachLoginPage from "../coachApp/coach/CoachLogin";
import CoachWelcomePage from "../coachApp/coach/CoachWelcome";
import ManagerSideBar from "../Layouts/ManagerMenuSideBar";
import FooterMobileMenu from "../Layouts/footerMobile";
import TestingComponent from "./TestingComponent";
import InviteStudentEvent from "../managerApp/manager/InviteStudentEvent";
import ManagerChangePassword from "../managerApp/manager/ManagerChangePassword";

const windowHistory = createBrowserHistory({ window });

const routes = [
	{
		path: "/admin",
		child: [
			{
				path: "testing-layout",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<TestingComponent />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "recover-password",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AdminRecoverPasswordPage />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "change-password",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AdminChangePasswordPage {...props}/>
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "login",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AdminLoginPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "welcome",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AdminWelcomePage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "dashboard",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminDashboardPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},

			{
				path: "add-school",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AddSchoolPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},

			{
				path: "invite-manager",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<InviteManagerPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "add-more-school",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AddMoreSchoolPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},

			{
				path: "event-list",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminEventListPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
			},
			{
				path: "people-list",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminPeopleListPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
			},
		],
	},
	{
		path: "/manager",
		child: [
			{
				path: "create-password",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerCreatePasswordPage />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "change-password",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerChangePassword {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "login",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerLoginPage />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "dashboard",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<ManagerDashboardPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "add-class",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AddClass {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "set-date-time",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<SetDateTime {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "invite-coach",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<InviteCoachPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "invite-student",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<InviteStudentPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "invite-student-summary",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<InvitedStudentSummaryPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "event-list",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<EventList {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
			},
			{
				path: "add-event",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AddEvent {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
			},
			{
				path: "assign-student",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AssignStudentPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
			},
			{
				path: "people-list",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<PeopleListPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
			},
			{
				path: "invite-student-event",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<InviteStudentEvent {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
		],
	},
	{
		path: "/student",
		child: [
			{
				path: "create-password",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerCreatePasswordPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: true,
			},
			{
				path: "login",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentLoginPage />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: true,
			},
			{
				path: "welcome",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentWelcomePage />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: true,
			},
			{
				path: "dashboard",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentDashboardPage />
					</>
				),
				footer: (props: any) => (
					<>
						<FooterMobileMenu {...props} />
					</>
				),
				isSideBar: false,
				isMobileFooter: true,
			},
			{
				path: "classes",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentClassesPage />
					</>
				),
				footer: (props: any) => (
					<>
						<FooterMobileMenu {...props} />
					</>
				),
				isSideBar: false,
				isMobileFooter: true,
			},
			{
				path: "events",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentEventsPage />
					</>
				),
				footer: (props: any) => (
					<>
						<FooterMobileMenu {...props} />
					</>
				),
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
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerCreatePasswordPage />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: true,
			},
			{
				path: "login",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachLoginPage />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: true,
			},
			{
				path: "welcome",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachWelcomePage />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: true,
			},
		],
	},
];

class RouteList extends React.Component {
	renderPage = (child: any, index: any, porps: any) => {
		let prop: any = { history: porps };
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
									{<child.sideBar {...prop} />}
								</div>
								<div className="main-body">{<child.main {...prop} />}</div>
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
									<div className="footer-menu">{<child.footer {...prop} />}</div>
									{/* <div className="footer-menu">AAAAAAAAAAAAAAAAAAAAAAAAAAA</div> */}
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
										<img
											src="../../../assets/images/banner.png"
											alt="banner"
											className="banner-image"
										/>
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
									<React.Fragment key={index + "child-" + index}>
										{this.renderPage(child, index, windowHistory)}
									</React.Fragment>
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
