import React from 'react';

import { shallow } from 'enzyme';

import NewHeader from "./";

const props = {
  removeUser: jest.fn(),
  user: {
    data: {}
  },
  match: {
      path: ""
  }
};

describe('NewHeader Component', () => {
    const NewHeaderComponent = shallow(<NewHeader.WrappedComponent {...props} />);
    it('Matches snapshot', () => {
        expect(NewHeaderComponent).toMatchSnapshot();
    })
})