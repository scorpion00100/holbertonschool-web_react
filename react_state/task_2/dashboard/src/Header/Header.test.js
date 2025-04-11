import React from 'react';
import { mount } from 'enzyme';
import Header from "./Header";
import AppContext from '../App/AppContext';

describe('Tests the Header component', () => {
    let defaultUser;
    let loggedUser;
    let logOut;
    let defaultContextValue;
    let userDefinedValue;
    beforeAll(() => {
        defaultUser = {
            email: "",
            password: "",
            isLoggedIn: false
        };
        loggedUser = {
            email: "hello@world.com",
            password: "test123!",
            isLoggedIn: true
        }
        logOut = jest.fn();
        defaultContextValue = {user: defaultUser, logOut};
        userDefinedValue = {user: loggedUser, logOut};
    });
    afterEach(() => {
        logOut.mockClear();
    });
    it('Tests that Headers renders without crashing', () => {
        const wrapper = mount(<AppContext.Provider value={defaultContextValue}><Header /></AppContext.Provider>);
        expect(wrapper.exists()).toBe(true);
    });
    it('Tests that the component render img and h1 tags', () => {
        const wrapper = mount(<AppContext.Provider value={defaultContextValue}><Header /></AppContext.Provider>);
        expect(wrapper.find('h1')).toHaveLength(1);
        expect(wrapper.find('img')).toHaveLength(1);
    });
    it('Tests that the logoutSection is not created', () => {
        const wrapper = mount(<AppContext.Provider value={defaultContextValue}><Header /></AppContext.Provider>);
        expect(wrapper.find('#logoutSection')).toHaveLength(0);
    });
    it('Tests that the logoutSection is created', () => {
        const wrapper = mount(<AppContext.Provider value={userDefinedValue}><Header /></AppContext.Provider>);
        expect(wrapper.find('#logoutSection')).toHaveLength(1);
    });
    it('Tests that clicking on the link is calling the spy', () => {
        const wrapper = mount(<AppContext.Provider value={userDefinedValue}><Header /></AppContext.Provider>);
        const link = wrapper.find('a');
        link.simulate('click');
        expect(userDefinedValue.logOut).toHaveBeenCalledTimes(1);
    });
});
