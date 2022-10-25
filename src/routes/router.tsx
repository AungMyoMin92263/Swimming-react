import React, { Fragment } from "react";
import {
	Navigate,
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
import AdminRecoverPasswordPage from "../managerApp/admin/AdminRecoverPasswordPage";
import AdminChangePasswordPage from "../managerApp/admin/AdminChangePasswordPage";
import AdminPeopleListPage from "../managerApp/admin/PeopleListPage";
import InvitedManagerSummaryPage from "../managerApp/admin/InvitedManagerSummary";
import AllClassesPage from "../managerApp/admin/AllClasses";
import AdminInviteCoachPage from "../managerApp/admin/AdminInviteCoach";
import AdminEditProfilePage from "../managerApp/admin/AdminEditProfile";
import AllPeoplePage from "../managerApp/admin/AllPeople";
import AdminCoachDetailPage from "../managerApp/admin/AdminCoachDetailPage";
import AdminStudentDetailPage from "../managerApp/admin/AdminStudentDetailPage";
import AdminAllCommentClass from "../managerApp/admin/AdminAllCommentClass";
import AdminAllAttendancesClasses from "../managerApp/admin/AdminAllAttendancesClasses";

import ManagerSideBar from "../Layouts/ManagerMenuSideBar";
import InviteStudentEvent from "../managerApp/manager/InviteStudentEvent";
import ManagerChangePassword from "../managerApp/manager/ManagerChangePassword";
import ManagerRecoverPasswordPage from "../managerApp/manager/ManagerRecoverPasswordPage";
import ManagerDashboardPage from "../managerApp/manager/ManagerDashboard";
import ProtectedRoute from "./protectRoute";
import AddClass from "../managerApp/manager/AddClass";
import SetDateTime from "../managerApp/manager/SetDateTime";
import InviteCoachPage from "../managerApp/manager/InviteCoach";
import InviteStudentPage from "../managerApp/manager/InviteStudent";
import ManagerCreatePasswordPage from "../managerApp/manager/ManagerCreatePasswordPage";
import AddManagerNamePage from "../managerApp/manager/AddManagerName";
import ManagerEditProfilePage from "../managerApp/manager/ManagerEditProfile";
import ManagerInviteCoachSummaryPage from "../managerApp/manager/ManagerInviteCoachSummaryPage";
import ManagerInviteStudentSummaryPage from "../managerApp/manager/ManagerInviteStudentSummaryPage";
import ManagerAddOldCoach from "../managerApp/manager/ManagerAddOldCoach";
import ManagerAddOldStudents from "../managerApp/manager/ManagerAddOldStudents";


import LoginPage from "../managerApp/manager/Login";
import AssignStudentPage from "../managerApp/manager/AssignStudent";
import EventList from "../managerApp/manager/EventList";
import PeopleListPage from "../managerApp/manager/PeopleListPage";
import ManagerLoginPage from "../managerApp/manager/ManagerLogin";
import ManagerClassDetailPage from "../managerApp/manager/ManagerClassDetailPage";
import ManagerWelcomePage from "../managerApp/manager/ManagerWelcome";

//student
import StudentLoginPage from "../studentApp/student/StudentLogin";
import AddEvent from "../managerApp/manager/AddEvent";
import StudentWelcomePage from "../studentApp/student/StudentWelcome";
import StudentDashboardPage from "../studentApp/student/StudentDashboardPage";
import StudentClassesPage from "../studentApp/student/StudentClasses";
import StudentEventsPage from "../studentApp/student/StudentEvents";
import StudentEventDetailsPage from "../studentApp/student/StudentEventDetails";
import StudentClassDetailsPage from "../studentApp/student/StudentClassDetails";
import StudentProfileDetailsPage from "../studentApp/student/StudentProfileDetails";
import StudentMePage from "../studentApp/student/StudentMe";
import StudentEditProfilePage from "../studentApp/student/StudentEditProfile";
import StudentRecoverPasswordPage from "../studentApp/student/StudentRecoverPasswordPage";
import StudentChangePasswordPage from "../studentApp/student/StudentChangePasswordPage";
import StudentCreatePasswordPage from "../studentApp/student/StudentCreatePasswordPage";
import StudentDailyProgramPage from "../studentApp/student/StudentDailyProgramme";
import StudentCommentsPage from "../studentApp/student/StudentComments";
import StudentEnterCommentsPage from "../studentApp/student/StudentEnterCommentsPage";
import StudentViewProfile from "../studentApp/student/StudentMeProfileDetails";
import StudentEventsDetailPage from "../studentApp/student/StudentEventsDetailPage";
import StudentAddInfoPage from "../studentApp/student/StudentAddInfo";

//coach
import CoachLoginPage from "../coachApp/coach/CoachLogin";
import CoachWelcomePage from "../coachApp/coach/CoachWelcome";
import FooterMobileMenu from "../Layouts/footerMobile";
import CoachCreatePasswordPage from "../coachApp/coach/CoachCreatePasswordPage";
import CoachDailyProgramPage from "../coachApp/coach/CoachDailyProgramme";
import CoachViewStudent from "../coachApp/coach/CoachProfileDetails";
import CoachBadgesListPage from "../coachApp/coach/CoachBadgesList";
import CoachCreateBadgePage from "../coachApp/coach/CoachCreateBadge";
import CoachEditIconPage from "../coachApp/coach/CoachEditIcon";
import CoachBadgeSentPage from "../coachApp/coach/CoachBadgeSent";
import CoachEventsPage from "../coachApp/coach/CoachEvents";
import CoachCommentsPage from "../coachApp/coach/CoachComments";
import CoachClassesPage from "../coachApp/coach/CoachClasses";
import CoachEnterCommentsPage from "../coachApp/coach/CoachEnterCommentsPage";
import CoachEditProfilePage from "../coachApp/coach/CoachEditProfile";
import CoacheDashboardPage from "../coachApp/coach/CoacheDashboardPage";
import CoachRecoverPasswordPage from "../coachApp/coach/CoachRecoverPasswordPage";
import CoachChangePasswordPage from "../coachApp/coach/CoachChangePasswordPage";
import CoachAddInfoPage from "../coachApp/coach/CoachAddInfo";
import CoachReplyCommentsPage from "../coachApp/coach/CoachReplyCommentsPage";

//parent
import ParentCreatePasswordPage from "../studentApp/parent/ParentCreatePasswordPage";
import ParentLoginPage from "../studentApp/parent/ParentLoginPage";
import ParentRecoverPasswordPage from "../studentApp/parent/ParentRecoverPasswordPage";
import ParentChangePasswordPage from "../studentApp/parent/ParentChangePasswordPage";
import ParentWelcomePage from "../studentApp/parent/ParentWelcome";
import ParentConfirmBooking from "../studentApp/parent/ParentConfirmBooking";
import ParentCancelBooking from "../studentApp/parent/ParentCancelBooking";
import ParentBookingAlert from "../studentApp/parent/ParentBookingAlert";

//testing
import TestingComponent from "./TestingComponent";
import CocahGiveBadgePage from "../coachApp/coach/CoachGiveBadge";
import CoachEventsDetailPage from "../coachApp/coach/CoachEventsDetailPage";
import CoachStudentRecordPage from "../coachApp/coach/CoachStudentRecord";
import CoachCreateStudentRecordPage from "../coachApp/coach/CoachCreateStudentRecord";
import CoachStudentAttandPage from "../coachApp/coach/CoachStudentAttandPage";
import CoacheProfile from "../coachApp/coach/CoacheProfile";
import CoachStudentsList from "../coachApp/coach/CoachStudentsList";
import ManagerCoachDetailPage from "../managerApp/manager/ManagerCoachDetailPage";
import ManagerStudentDetailPage from "../managerApp/manager/ManagerStudentDetailPage";
import CoachStudentAttendanceList from "../coachApp/coach/CoachStudentAttendanceList";
import ManagerStudentEditProfile from "../managerApp/manager/ManagerStudentEditProfile";
import ManagerCoachEditProfile from "../managerApp/manager/ManagerCoachEditProfile";
import EditClass from "../managerApp/manager/EditClass";
import EditSetDateTime from "../managerApp/manager/EditSetDateTime";
import EditSchoolPage from "../managerApp/admin/EditSchoolPage";
import ManagerAllCommentStudent from "../managerApp/manager/ManagerAllCommentStudent";
import ManagerAllCommentClass from "../managerApp/manager/ManagerAllCommentClass";
import ManagerAllBadgetsStudent from "../managerApp/manager/ManagerAllBadgetsStudent";
import ManagerAllAttendancesStudent from "../managerApp/manager/ManagerAllAttendancesStudent";
import ManagerAllEventsStudent from "../managerApp/manager/ManagerAllEventsStudent";
import StudentAttendanceList from "../studentApp/student/StudentAttendanceList";
import StudentCoacheProfile from "../studentApp/student/StudentCoacheProfile";
import ManagerEventDetailPage from "../managerApp/manager/ManagerEventDetailPage";
import ManagerEditEventPage from "../managerApp/manager/ManagerEditEventPage";
import ManagerEventSummaryPage from "../managerApp/manager/ManagerEventSummaryPage";
import ManagerEventEditInvitePage from "../managerApp/manager/ManagerEventEditInvitePage";
import ManagerClassCommentDetail from "../managerApp/manager/ManagerClassCommentDetail";
import ManagerStudentCommentDetail from "../managerApp/manager/ManagerStudentCommentDetail";
import ManagerAllAttendancesClasses from "../managerApp/manager/ManagerAllAttendancesClasses";
import AdminStudentEditProfile from "../managerApp/admin/AdminStudentEditProfile";
import AdminCoachEditProfile from "../managerApp/admin/AdminCoachEditProfile";
import AdminClassDetailPage from "../managerApp/admin/AdminClassDetailPage";
import AdminAddClass from "../managerApp/admin/AdminAddClass";
import AdminSetDateTime from "../managerApp/admin/AdminSetDateTime";
import AdminSchoolDetailPage from "../managerApp/admin/AdminSchoolDetailPage";
import AdminInviteCoachSummaryPage from "../managerApp/admin/AdminInviteCoachSummaryPage";
import AdminInviteStudent from "../managerApp/admin/AdminInviteStudent";
import AdminInviteStudentSummaryPage from "../managerApp/admin/AdminInviteStudentSummaryPage";
import AdminEditClass from "../managerApp/admin/AdminEditClass";
import AdminEditSetDateTime from "../managerApp/admin/AdminEditSetDateTime";
import AdminClassCommentDetail from "../managerApp/admin/AdminClassCommentDetail";
import AdminAllCommentStudent from "../managerApp/admin/AdminAllCommentStudent";
import AdminStudentCommentDetail from "../managerApp/admin/AdminStudentCommentDetail";
import AdminAllEventsStudentPage from "../managerApp/admin/AdminAllEventsStudentPage";
import AdminAllBadgetsStudent from "../managerApp/admin/AdminAllBadgetsStudent";
import AdminAllAttendancesStudent from "../managerApp/admin/AdminAllAttendancesStudent";
import AdminAddOldStudents from "../managerApp/admin/AdminAddOldStudents";
import AdminAddOldCoach from "../managerApp/admin/AdminAddOldCoach";


const windowHistory = createBrowserHistory({ window });

const routes = [
	{
		path: "",
		child: [
			{
				path: "",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<Navigate to={"/login"} replace={true}></Navigate>
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
						<LoginPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
		],
	},
	{
		path: "/admin",
		child: [
			{
				path: "",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<Navigate to={"/admin/login"} replace={true}></Navigate>
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
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
						<AdminChangePasswordPage {...props} />
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
				path: "school/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminSchoolDetailPage {...props} />
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
				path: "edit-school/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<EditSchoolPage {...props} />
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
				path: "invite-manager/:id",
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
				path: "invite-manager-summary/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<InvitedManagerSummaryPage {...props} />
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
			{
				path: "all-people/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AllPeoplePage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
			},

			{
				path: "student-edit-profile/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminStudentEditProfile {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "coach-edit-profile/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminCoachEditProfile {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "all-class/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AllClassesPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/class/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminClassDetailPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/invite-old-students/:classId",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AdminAddOldStudents {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/invite-old-coaches/:classId",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AdminAddOldCoach {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			
			{
				path: "add-class",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminAddClass {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "add-class/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminAddClass {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/set-date-time/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminSetDateTime {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/invite-coach/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminInviteCoachPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/invite-coach-summary/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminInviteCoachSummaryPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/invite-coach-summary/new/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminInviteCoachSummaryPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/invite-student",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminInviteStudent {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},

			{
				path: "manager-edit-profile/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AdminEditProfilePage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "manager-edit-profile/school/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AdminEditProfilePage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "manager-edit-profile/all-people/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AdminEditProfilePage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},

			{
				path: "school/:schoolId/invite-student/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminInviteStudent {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/invite-student-summary/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminInviteStudentSummaryPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/invite-student-summary/new/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminInviteStudentSummaryPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/edit-class/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminEditClass {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "edit-class/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminEditClass {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/edit-set-date-time/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminEditSetDateTime {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "school-detail/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminSchoolDetailPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},

			{
				path: "school/:schoolId/coach-detail/:id/class/:classId",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminCoachDetailPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/student-detail/:id/class/:classId",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminStudentDetailPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},

			{
				path: "all-comments/school/:schoolId/class/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminAllCommentClass {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "all-comments/school/:schoolId/class/:classId/user/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminAllCommentStudent {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},

			{
				path: "school/:schoolId/class/:classId/comment-detail/:commentId",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminClassCommentDetail {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/class/:classId/user/:userId/comment-detail/:commentId",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminStudentCommentDetail {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "all-attendances/school/:schoolId/class/:classId",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminAllAttendancesClasses {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "all-badgets/school/:schoolId/class/:classId/user/:userId",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminAllBadgetsStudent {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "all-attendances/school/:schoolId/class/:classId/user/:userId",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminAllAttendancesStudent {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "all-events/school/:schoolId/user/:userId/class/:classId",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminAllEventsStudentPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},

			{
				path: "class/:id",
				sideBar: (props: any) => (
					<>
						<SideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<AdminClassDetailPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
		],
	},
	{
		path: "/manager",
		child: [
			{
				path: "",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<Navigate to={"/manager/login"} replace={true}></Navigate>
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
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
				path: "recover-password",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerRecoverPasswordPage {...props} />
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
				path: "welcome",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerWelcomePage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},

			{
				path: "add-name",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<AddManagerNamePage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},

			{
				path: "edit-profile",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerEditProfilePage {...props} />
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
						<ManagerLoginPage {...props} />
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
				path: "edit-class/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<EditClass {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "edit-set-date-time/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<EditSetDateTime {...props} />
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
				path: "invite-coach/:id",
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
				path: "invite-student/:id",
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
			{
				path: "class/:id",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<ManagerClassDetailPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "coach-detail/:id/class/:classId",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<ManagerCoachDetailPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "student-detail/:id/class/:classId",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<ManagerStudentDetailPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "student-detail/:id",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<ManagerStudentDetailPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "invite-coach-summary/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerInviteCoachSummaryPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "invite-coach-summary/new/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerInviteCoachSummaryPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "invite-student-summary/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerInviteStudentSummaryPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "invite-student-summary/new/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerInviteStudentSummaryPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "student-edit-profile/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerStudentEditProfile {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "coach-edit-profile/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerCoachEditProfile {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "all-comments/user/:id/class/:classId",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<ManagerAllCommentStudent {...props} />
					</>
				),
				footer: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "all-comments/class/:id",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<ManagerAllCommentClass {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "class/:classId/comment-detail/:id",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<ManagerClassCommentDetail {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "user/:userId/comment-detail/:id",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<ManagerStudentCommentDetail {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "all-badgets/user/:id/class/:classId",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<ManagerAllBadgetsStudent {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "all-attendances/user/:id/class/:classId",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<ManagerAllAttendancesStudent {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "all-attendances/class/:classId",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<ManagerAllAttendancesClasses {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "all-events/user/:id/class/:classId",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<ManagerAllEventsStudent {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "event-detail/:id",
				sideBar: (props: any) => (
					<>
						<ManagerSideBar {...props} />
					</>
				),
				main: (props: any) => (
					<>
						<ManagerEventDetailPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: true,
				isMobileFooter: false,
			},
			{
				path: "edit-event/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerEditEventPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "event-summary/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerEventSummaryPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "edit-invite-student-event/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerEventEditInvitePage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/invite-old-coaches/:classId",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerAddOldCoach {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "school/:schoolId/invite-old-students/:classId",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ManagerAddOldStudents {...props} />
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
				path: "",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<Navigate to={"/student/login"} replace={true}></Navigate>{" "}
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "create-password",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentCreatePasswordPage {...props} />
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
						<StudentLoginPage />
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
						<StudentChangePasswordPage {...props} />
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
						<StudentRecoverPasswordPage {...props} />
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
						<StudentWelcomePage />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "dashboard",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentDashboardPage {...props} />
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
				path: "class-list",
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
				path: "event-list",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentEventsPage {...props} />
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
				path: "event-detail",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentEventDetailsPage />
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
				path: "class-detail",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentClassDetailsPage />
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
				path: "dashboard/daily-program",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentDailyProgramPage {...props} />
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
				path: "dashboard/daily-program/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentDailyProgramPage {...props} />
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
				path: "class-list/daily-program/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentDailyProgramPage {...props} />
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
				path: "dashboard/profile-detail",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentProfileDetailsPage />
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
				path: "me",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentMePage />
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
				path: "me/edit-profile",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentEditProfilePage {...props} />
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
				path: "dashboard/all-comments/:id/class",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentCommentsPage {...props} />
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
				path: "dashboard/enter-comments/:id/class/:comment_id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentEnterCommentsPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "dashboard/enter-comments/:id/user/:comment_id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentEnterCommentsPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "me/profile-detail/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentViewProfile {...props} />
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
				path: "event/detail/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentEventsDetailPage {...props} />
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
				path: "me/attendance/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachStudentAttendanceList {...props} />
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
				path: "dashboard/all-comments/:id/user",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentCommentsPage {...props} />
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
				path: "student/attendance/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentAttendanceList {...props} />
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
				path: "coach/profile/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentCoacheProfile {...props} />
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
				path: "booking-confirm/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ParentConfirmBooking {...props} />
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
				path: "booking-cancel/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ParentCancelBooking {...props} />
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
				path: "booking-alert/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ParentBookingAlert {...props} />
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
				path: "add-info",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachAddInfoPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
		],
	},
	{
		path: "/coach",
		child: [
			{
				path: "",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<Navigate to={"/coach/login"} replace={true}></Navigate>
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "create-password",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachCreatePasswordPage {...props} />
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
						<CoachLoginPage />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},

			{
				path: "add-info",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachAddInfoPage {...props} />
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
						<CoachRecoverPasswordPage {...props} />
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
						<CoachChangePasswordPage {...props} />
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
						<CoachWelcomePage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "dashboard",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoacheDashboardPage {...props} />
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
				path: "me",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoacheProfile {...props} />
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
				path: "dashboard/daily-program",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachDailyProgramPage {...props} />
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
				path: "dashboard/daily-program/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachDailyProgramPage {...props} />
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
				path: "class-list/daily-program",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachDailyProgramPage {...props} />
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
				path: "class-list/daily-program/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachDailyProgramPage {...props} />
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
				path: "dashboard/all-comments/:id/class",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachCommentsPage {...props} />
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
				path: "dashboard/enter-comments/:id/class",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachEnterCommentsPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "dashboard/all-comments/:id/user",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachCommentsPage {...props} />
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
				path: "dashboard/enter-comments/:id/user",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachEnterCommentsPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},

			{
				path: "dashboard/reply-comments/:id/class/:comment_id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachReplyCommentsPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "dashboard/reply-comments/:id/user/:comment_id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachReplyCommentsPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},

			{
				path: "class-list/all-comments/:id/class",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachCommentsPage {...props} />
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
				path: "class-list/enter-comments/:id/class",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachEnterCommentsPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "class-list/all-comments/:id/user",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachCommentsPage {...props} />
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
				path: "class-list/enter-comments/:id/user",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachEnterCommentsPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},

			{
				path: "class-list/reply-comments/:id/class/:comment_id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachReplyCommentsPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "class-list/reply-comments/:id/user/:comment_id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachReplyCommentsPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "dashboard/profile-detail",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachViewStudent {...props} />
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
				path: "dashboard/students",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachStudentsList {...props} />
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
				path: "dashboard/profile-detail/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachViewStudent {...props} />
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
				path: "student/attendance/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachStudentAttendanceList {...props} />
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
				path: "coach/profile/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<StudentCoacheProfile {...props} />
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
				path: "dashboard/badge-list/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachBadgesListPage />
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
				path: "dashboard/give-badges/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CocahGiveBadgePage {...props} />
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
				path: "create-badge",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachCreateBadgePage {...props} />
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
				path: "edit-icon",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachEditIconPage {...props} />
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
				path: "icon-confirm",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachBadgeSentPage {...props} />
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
				path: "class-list",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachClassesPage />
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
				path: "event-list",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachEventsPage {...props} />
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
				path: "event/detail/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachEventsDetailPage {...props} />
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
				path: "student/record/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachStudentRecordPage {...props} />
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
				path: "class/attendance/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachStudentAttandPage {...props} />
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
				path: "create/record/:id",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachCreateStudentRecordPage {...props} />
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
			// {
			// 	path: "me",
			// 	sideBar: (props: any) => <></>,
			// 	main: (props: any) => (
			// 		<>
			// 			<CoachMePage {...props} />
			// 		</>
			// 	),
			// 	footer: (props: any) => (
			// 		<>
			// 			<FooterMobileMenu {...props} />
			// 		</>
			// 	),
			// 	isSideBar: false,
			// 	isMobileFooter: true,
			// },
			{
				path: "me/edit-profile",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<CoachEditProfilePage {...props} />
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
		path: "/parent",
		child: [
			{
				path: "",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<Navigate to={"/parent/login"} replace={true}></Navigate>
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
			{
				path: "create-password",
				sideBar: (props: any) => <></>,
				main: (props: any) => (
					<>
						<ParentCreatePasswordPage {...props} />
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
						<ParentLoginPage />
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
						<ParentWelcomePage {...props} />
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
						<ParentRecoverPasswordPage {...props} />
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
						<ParentChangePasswordPage {...props} />
					</>
				),
				footer: (props: any) => <></>,
				isSideBar: false,
				isMobileFooter: false,
			},
		],
	},
];

class RouteList extends React.Component {
	componentDidMount() {
		console.log("Router");
	}
	renderPage = (child: any, index: any, porps: any, appname: string) => {
		let prop: any = { history: porps };
		if (child.isSideBar) {
			return (
				<Route
					path={child.path}
					key={index + "child-aside"}
					element={
						<ProtectedRoute {...prop} path={child.path} appname={appname}>
							<div className='main-layout'>
								<div>
									<div className='shadow-box'></div>
									{<child.sideBar {...prop} />}
								</div>
								<div className='main-body'>{<child.main {...prop} />}</div>
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
							<ProtectedRoute {...prop} path={child.path} appname={appname}>
								<div className='main-layout'>
									<div className='main-body'>{<child.main {...prop} />}</div>
									<div className='footer-menu'>
										{<child.footer {...prop} />}
									</div>
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
							<ProtectedRoute {...prop} path={child.path} appname={appname}>
								<div className='main-layout'>
									<div>
										<div className='banner-box'></div>
										<img
											src='../../../assets/images/banner.png'
											alt='banner'
											className='banner-image'
										/>
									</div>
									<div className='main-body'>{<child.main {...prop} />}</div>
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
						{routes &&
							routes.length > 0 &&
							routes.map((route, index) => (
								<Route
									key={index + "app-aside"}
									path={route.path}
									element={
										<div className='app-layout'>
											<Outlet key={index + "child-layout"} />
										</div>
									}
								>
									{route.child &&
										route.child.length > 0 &&
										route.child.map((child, index) => (
											<React.Fragment key={index + "child-" + index}>
												{this.renderPage(
													child,
													index,
													windowHistory,
													route.path
												)}
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
