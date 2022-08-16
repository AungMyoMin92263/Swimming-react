import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import MenuBarTag from "../Layouts/menuBar";
import SideBar from "../Layouts/menuSideBar";

//import pages
import AdminDashboardPage from "../pages/admin/AdminDashboard";
import AdminLoginPage from "../pages/admin/AdminLogin";
import AdminWelcomePage from "../pages/admin/AdminWelcome";

const routes = [
  {
    path: "/admin",
    child: [
      {
        path: "login",
        sideBar: <></>,
        main: <AdminLoginPage />,
        footer: <></>,
        isSideBar: false,
      },
      {
        path: "welcome",
        sideBar: <></>,
        main: <AdminLoginPage />,
        footer: <></>,
        isSideBar: false,
      },
      {
        path: "dashboard",
        sideBar: <SideBar></SideBar>,
        main: <AdminDashboardPage />,
        footer: <></>,
        isSideBar: true,
      },
    ],
  },
];

class RouteList extends React.Component {
  renderPage = (child: any, index: any) => {
    if (child.isSideBar) {
      return (
        <Route
          path={child.path}
          key={index + "child-aside"}
          element={
            <div className="main-layout">
              <div>
                <div className="shadow-box"></div>
                {child.sideBar}
              </div>
              <div className="main-body">{child.main}</div>
              <div className="footer-menu">{child.footer}</div>
            </div>
          }
        />
      );
    } else {
      return (
        <Route
          path={child.path}
          key={index + "child-aside"}
          element={
            <div className="main-layout">
              <div>
                <div className="banner-box"></div>
                <img src="../../../assets/images/banner.png" alt="banner" className="banner-image" />
              </div>
              <div className="main-body">{child.main}</div>
              <div className="footer-menu">{child.footer}</div>
            </div>
          }
        />
      );
    }
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index + "app-aside"}
                path={route.path}
                element={
                  <div className="app-layout">
                    <Outlet />
                  </div>
                }
              >
                {route.child.map((child, index) => (
                  <>{this.renderPage(child, index)}</>
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
        </BrowserRouter>
      </div>
    );
  }
}
export default RouteList;
