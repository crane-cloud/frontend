import React from 'react';

import { shallow } from 'enzyme';

import NewHeader from "./";

const NewHeaderProps = {
  removeUser: jest.fn(),
  user: {
    data: {}
  },
  match: {
      path: ""
  }
};

describe('NewHeader component test', () => {
    const NewHeaderComponent = shallow(<NewHeader.WrappedComponent {...NewHeaderProps} />);
    it('checks the snapshot', () => {
        expect(NewHeaderComponent).toMatchSnapshot();
    })
})