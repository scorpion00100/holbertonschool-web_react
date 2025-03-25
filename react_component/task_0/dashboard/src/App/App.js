import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import logo from '../assets/holberton_logo.jpg';
import { getFullYear, getFooterCopy } from '../utils/utils';
import Notifications from '../Notifications/Notifications';
import { getLatestNotification } from '../utils/utils';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import './App.css';

class App extends React.Component {
  render() {
    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2,name: 'Webpack',credit: 20},
      {id: 3,name: 'React',credit: 40}
    ];
    
    const listNotifications = [
      { id: 1,type: 'default',value: 'New course available' },
      { id: 2,type: 'urgent',value: 'New resume available' },
      { id: 3,type: 'urgent',html: {__html: getLatestNotification()}}
    ];
    const footerText = `Copyright ${getFullYear()} - ${getFooterCopy(true)}`
    let body;

    if (this.props.isLoggedIn) {
      body = <CourseList listCourses={listCourses}/>;
    } else {
      body = <Login text='Login to access the full dashboard' />
    }
    return (
      <Fragment>
        <Notifications listNotifications={listNotifications}/>
        <div className="App">
          <Header text='School dashboard' src={logo} alt='Holberton logo'/>
          <div className="App-body">
            {body}
          </div>
          <Footer text={footerText} />
        </div>
      </Fragment>

    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool
};

App.defaultProps = {
  isLoggedIn: false
};

export default App;
