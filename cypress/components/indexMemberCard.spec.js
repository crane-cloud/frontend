import React from 'react'
import MemberCard from '../../src/components/MemberCard/index'

describe('<MemberCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MemberCard />)
  })
})