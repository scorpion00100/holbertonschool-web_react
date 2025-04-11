import React from 'react';
import { shallow } from 'enzyme';
import Footer from "./Footer";

describe('Tests the Footer component', () => {
    it('Tests that Footer renders without crashing', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.exists()).toBe(true);
    });
    it('Tests that the component at the very least renders the text “Copyright”', () => {
        const wrapper = shallow(<Footer text='Copyright'/>);
        const p = wrapper.find('p');
        expect(p.text()).toBe(`Copyright`);
    });
});
import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from "./Footer";
import AppContext from '../App/AppContext';

describe('Tests the Footer component', () => {
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
    it('Tests that Footer renders without crashing', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.exists()).toBe(true);
    });
    it('Tests that the component at the very least renders the text “Copyright”', () => {
        const wrapper = mount(<AppContext.Provider value={defaultContextValue}><Footer text='Copyright'/></AppContext.Provider>);
        const p = wrapper.find('p');
        expect(p.text()).toBe(`Copyright`);
    });
    it('Tests that the link is not displayed when the user is logged out within the context', () => {
        const wrapper = mount(<AppContext.Provider value={defaultContextValue}><Footer text='Copyright'/></AppContext.Provider>);
        expect(wrapper.find('a')).toHaveLength(0);
    });
    it('Tests that the link is displayed when the user is logged in within the context', () => {
        const wrapper = mount(<AppContext.Provider value={userDefinedValue}><Footer text='Copyright'/></AppContext.Provider>);
        expect(wrapper.find('a')).toHaveLength(1);
    });
});
