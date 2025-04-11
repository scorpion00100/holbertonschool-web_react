import React from 'react';
import { shallow, mount } from 'enzyme';
import App from "./App";

describe('Tests the App component', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = shallow(<App />);
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('Tests that App renders without crashing', () => {
        expect(wrapper.exists()).toBe(true);
    });
    it('should contain the Notifications component', () => {
        expect(wrapper.find('Notifications')).toHaveLength(1);
    });
    it('should contain the Header component', () => {
        expect(wrapper.find('Header')).toHaveLength(1);
    });
    it('should contain the Login component', () => {
        expect(wrapper.find('Login')).toHaveLength(1);
    });
    it('should contain the Footer component', () => {
        expect(wrapper.find('Footer')).toHaveLength(1);
    });
    it('checks that CourseList is not displayed', () => {
        expect(wrapper.find('CourseList')).toHaveLength(0);
    });
    it('checks that the logOut function and the alert function is called with the good string', () => {
        window.alert = jest.fn();
        const wrapper = mount(<App />);
        wrapper.setState({user: {isLoggedIn: true}});
        expect(wrapper.state().user.isLoggedIn).toBe(true);
        const event = new KeyboardEvent('keydown', { key: 'h', ctrlKey: true });
        window.dispatchEvent(event);
        expect(window.alert).toHaveBeenCalledWith('Logging you out');
        expect(wrapper.state().user.isLoggedIn).toBe(false);
        jest.restoreAllMocks();
    });
    it('checks that default state for displayDrawer is false', () => {
        expect(wrapper.state().displayDrawer).toBe(false);
    });
    it('checks that after calling handleDisplayDrawer, the state should now be true', () => {
        wrapper.setState({displayDrawer: false});
        expect(wrapper.state().displayDrawer).toBe(false);
        wrapper.instance().handleDisplayDrawer();
        expect(wrapper.state().displayDrawer).toBe(true);
    });
    it('checks that after calling handleHideDrawer, the state should now be true', () => {
        wrapper.setState({displayDrawer: true});
        expect(wrapper.state().displayDrawer).toBe(true);
        wrapper.instance().handleHideDrawer();
        expect(wrapper.state().displayDrawer).toBe(false);
    });
    it('checks that the logIn function updates the state correctly', () => {
        wrapper.instance().logIn();
        expect(wrapper.state().user.isLoggedIn).toBe(true);
    });
});

describe('Tests the App component when isLoggedIn is true', () => {
    let user;
    let listNotifications
    beforeAll(() => {
        user = {
            email: 'hello@world.com',
            password: 'test123!',
            isLoggedIn: true
        };
        listNotifications = [
            { id: 1, type: 'default', value: 'New course available' },
            { id: 2, type: 'urgent', value: 'New resume available' },
            { id: 3, type: 'urgent', html: {__html: <strong>hello</strong>} }
        ];
    });
    it('Tests that the Login component is not included.', () => {
        const wrapper = shallow(<App/>);
        wrapper.setState({user});
        expect(wrapper.find('Login')).toHaveLength(0);
    });
    it('should contain the Notifications component', () => {
        const wrapper = shallow(<App/>);
        wrapper.setState({user});
        expect(wrapper.find('CourseList')).toHaveLength(1);
    });
    it('checks that the logOut function updates the state correctly', () => {
        const wrapper = shallow(<App/>);
        wrapper.setState({user});
        wrapper.instance().logOut();
        expect(wrapper.state().user.isLoggedIn).toBe(false);
    });
    it('checks that markNotificationAsRead works as intended', () => {
        const wrapper = shallow(<App/>);
        wrapper.setState({user});
        expect(wrapper.state().listNotifications.length).toEqual(3);
        wrapper.instance().markNotificationAsRead(1);
        expect(wrapper.state().listNotifications.length).toEqual(2);
    });
});
