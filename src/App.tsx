import React from 'react';
import './App.css';
import RouteList from './routes/router';
// interface IProps {
//   path: string;
// }

// type AppProps = IProps;

// interface AppStates {
//   isBusy: boolean;
//   isAuth: boolean;
//   password: string;
//   user: string;
//   error: boolean;
// }

class App extends React.Component {
  constructor(props?: any) {
    super(props);
    this.state = { isBusy: false, isAuth: true, user: '', password: '', error: false };
  }

  componentDidMount() {
    // if (getItem('isAuth') === 'true') {
    //   this.setState({ isAuth: false })
    // }
  }

  render() {
    return <RouteList></RouteList>
  }


}
export default App;
