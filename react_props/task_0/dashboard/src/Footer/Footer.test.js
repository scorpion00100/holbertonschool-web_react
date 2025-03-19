import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';


describe('Footer Composant', function(){
    it('div class App-footer exist', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find('.App-footer').exists()).toBe(true);
    });
})
