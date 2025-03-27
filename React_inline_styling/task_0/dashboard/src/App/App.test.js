import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('contains the Notifications component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Notifications)).toHaveLength(1);
  });

  it('contains the Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('contains the Login component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  it('contains the Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it('should not display CourseList when isLoggedIn is false', () => {
    const wrapper = shallow(<App isLoggedIn={false} />);
    expect(wrapper.find(CourseList).length).toBe(0);
  });

  describe('when isLoggedIn is true', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<App isLoggedIn={true} />);
    });

    it('should not include the Login component', () => {
      expect(wrapper.find(Login).length).toBe(0);
    });

    it('should include the CourseList component', () => {
      expect(wrapper.find(CourseList).length).toBe(1);
    });
  });

  describe('Keyboard event tests', () => {
    it('calls logOut function and displays alert when Ctrl+H is pressed', () => {
      const mockLogOut = jest.fn()
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {})

      // Simuler l'événement keydown
      const wrapper = shallow(<App logOut={mockLogOut} />)
      const instance = wrapper.instance()

      // Simuler l'ajout de l'événement
      instance.componentDidMount() // Ajoute l'écouteur d'événements

      // Créer un événement simulé
      const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' })
      document.dispatchEvent(event)

      // Vérifier que alert et logOut ont été appelés
      expect(alertMock).toHaveBeenCalled()
      expect(mockLogOut).toHaveBeenCalled()

      // Restaurer les mocks
      alertMock.mockRestore()
    })
  })


});
