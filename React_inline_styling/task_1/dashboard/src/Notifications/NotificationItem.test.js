import React from 'react'
import { shallow } from 'enzyme'
import NotificationItem from './NotificationItem'

describe('NotificationItem Component', () => {
  it('renders without crashing', () => {
    shallow(<NotificationItem type="default" value="test" />)
  })

  it('renders correct HTML with type and value props', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />)
    const li = wrapper.find('li')
    expect(li.prop('data-notification-type')).toEqual('default')
    expect(li.text()).toEqual('test')
  })

  it('renders correct HTML with html prop', () => {
    const htmlProp = { __html: '<p>test</p>' }
    const wrapper = shallow(<NotificationItem html={htmlProp} />)
    expect(wrapper.find('li').prop('dangerouslySetInnerHTML')).toEqual(htmlProp)
  })

  describe('<NotificationItem /> interaction', () => {
    it('calls markAsRead with the correct ID when clicked', () => {
      const markAsReadSpy = jest.fn()
      const wrapper = shallow(
        <NotificationItem
          type="default"
          value="Test notification"
          markAsRead={markAsReadSpy}
          id={1}
        />
      )

      // Simulate click event
      wrapper.find('li').simulate('click')

      // Check if markAsRead was called with the correct ID
      expect(markAsReadSpy).toHaveBeenCalledWith(1)
    })
  })
})
