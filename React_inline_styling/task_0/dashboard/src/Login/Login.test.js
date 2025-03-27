import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheet, css, StyleSheetTestUtils } from 'aphrodite';
import Login from './Login';

const styles = StyleSheet.create({
  body: {
    padding: '40px',
    fontSize: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
  },
  form: {
    fontWeight: 'bold',
    display: 'inline-block',
    marginRight: '10px',
  },
  border: {
    border: '1px solid #ccc',
  }
});

const bodyClassName = css(styles.body);
const buttonClassName = css(styles.button);
const formClassName = css(styles.form);
const formBorderClassName = css(styles.form, styles.border);

describe('Login Component', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render without crashing', () => {
    shallow(<Login />);
  });

  it('should render 2 input tags and 2 label tags', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('label').length).toBe(2);
  });

  describe('Style Tests', () => {
    it('should apply the correct style to the body div', () => {
      const wrapper = shallow(<Login />);
      expect(wrapper.find('div').first().hasClass(bodyClassName)).toBe(true);
    });

    it('should apply the correct styles to input tags', () => {
      const wrapper = shallow(<Login />);
      const inputs = wrapper.find('input');
      expect(inputs.at(0).hasClass(formBorderClassName)).toBe(true);
      expect(inputs.at(1).hasClass(formBorderClassName)).toBe(true);
    });

    it('should apply the correct style to label tags', () => {
      const wrapper = shallow(<Login />);
      const labels = wrapper.find('label');
      expect(labels.at(0).hasClass(formClassName)).toBe(true);
      expect(labels.at(1).hasClass(formClassName)).toBe(true);
    });

    it('should apply the correct style to the button', () => {
      const wrapper = shallow(<Login />);
      const button = wrapper.find('button');
      expect(button.hasClass(buttonClassName)).toBe(true);
    });
  });
});
