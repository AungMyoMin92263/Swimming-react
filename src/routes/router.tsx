import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import MenuBarTag from '../Layouts/menuBar';
import SideBar from '../Layouts/menuSideBar';

const routes = [
  {
    path: "/admin",
    child: [
      {
        path: "login",
        sideBar: <SideBar></SideBar>,
        main: <h1>Hello World Main</h1>,
        footer: <MenuBarTag></MenuBarTag>
      },
      {
        path: "signup",
        sideBar: <SideBar></SideBar>,
        main: <h1>Hello World Sign Up</h1>,
        footer: <MenuBarTag></MenuBarTag>
      }
    ]
  },

]

class RouteList extends React.Component {

  render() {
    return (<div>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index + 'app-aside'}
              path={route.path}
              element={
                <div className='app-layout'>
                  <Outlet />
                </div>
              } >
              {route.child.map((child, index) => (
                // <div>
                <Route path={child.path} key={index + 'child-aside'}
                  element={
                    <div className='main-layout'>
                      <div>
                        <div className='shadow-box'></div>
                        {child.sideBar}
                      </div>
                      <div className='main-body'>{child.main}</div>
                      <div className='footer-menu'>{child.footer}</div>
                    </div>
                  }
                />
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

            </Route>))
          }
        </Routes>
      </BrowserRouter>
    </div>)
  }

}
export default RouteList;