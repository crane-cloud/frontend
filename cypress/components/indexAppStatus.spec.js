import React from 'react'
import AppStatus from '../../src/components/AppStatus/index'

describe('<AppStatus />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AppStatus />)
  })
})