import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from './Footer';

// Mock the utility functions
jest.mock('../utils/utils', () => ({
  getFullYear: jest.fn(() => 2024),
  getFooterCopy: jest.fn(() => 'Holberton School'),
}));

describe('<Footer />', () => {
  let wrapper;

  describe('default', () => {
    beforeEach(() => {
      wrapper = shallow(<Footer />);
    });

    it('renders without crashing', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('renders the text "Copyright"', () => {
      expect(wrapper.text()).toContain('Copyright'); // Check for exact text
    });

    it('does not render Contact link', () => {
      expect(wrapper.find('a')).toHaveLength(0);
    });
  });

  describe('with logged in props', () => {
    beforeEach(() => {
      const props = {
        user: {
          email: 'a@a.com',
          password: 'azerty1234',
          isLoggedIn: true,
        },
      };

      wrapper = shallow(<Footer {...props} />);
    });

    it('does render Contact link', () => {
      expect(wrapper.find('a')).toHaveLength(1);
    });

    it('renders the correct copyright year', () => {
      expect(wrapper.text()).toContain('2024');
    });

    it('renders the correct footer copy', () => {
      expect(wrapper.text()).toContain('Holberton School');
    });
  });
});
