import React from 'react'
import { shallow } from 'enzyme'
import Header from '../Header/Header'
import logo from '../assets/holberton-logo.jpg' // Importation du logo pour les tests

describe('<Header />', () => {
  it('renders without crashing', () => {
    shallow(<Header />)
  })

  it('renders an <img> tag with correct src and alt attributes', () => {
    const wrapper = shallow(<Header />)
    const img = wrapper.find('img')
    expect(img).toHaveLength(1)
    expect(img.prop('src')).toEqual(logo) // Vérifie que la source de l'image est correcte
    expect(img.prop('alt')).toEqual('logo') // Vérifie que le texte alternatif est correct
  })

  it('renders an <h1> tag with correct text', () => {
    const wrapper = shallow(<Header />)
    const h1 = wrapper.find('h1')
    expect(h1).toHaveLength(1)
    expect(h1.text()).toEqual('School dashboard') // Vérifie que le texte est correct
  })
})
