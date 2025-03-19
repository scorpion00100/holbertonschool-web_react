import React from 'react';
import { shallow } from 'enzyme';
import App from './App.js';

describe('App Composant', function(){
    it('should App renders without crashing', function(){
        const wrapper = shallow(<App />)
        expect(wrapper.exists()).toBe(true)
    })

    it('div class App-body exist', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('.App-body').exists()).toBe(true);
    });

    it('div class App-footer exist', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('.App-footer').exists()).toBe(true);
    });
})