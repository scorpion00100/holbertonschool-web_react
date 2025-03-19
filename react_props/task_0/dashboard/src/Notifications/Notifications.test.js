import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';

describe('Notification Composant', function(){
    it('should Notifications renders without crashing', function(){
        const wrapper = shallow(<Notifications />)
        expect(wrapper.exists()).toBe(true)
    });

    it('should render Notification have list of 3 elements', () => {
        const wrapper = shallow(<Notifications />);
        const lenghList = wrapper.find('li').children().length;
        expect(lenghList + 1).toEqual(3);
    });
    
    it('should renders the text <<Here is the list of notifications>>', () => {
        const wrapper = shallow(<Notifications />);
        expect(wrapper.find('p').text()).toEqual('Here is the list of notifications');
    });
});
