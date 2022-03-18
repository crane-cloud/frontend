import React from 'react';

import { shallow } from 'enzyme';

import LandingPage from './';

const props = {
    user: {
        data: {
            id: ""
        }
    }
}
describe('LandingPage Component', () => { 
    const LandingPageComponent = shallow(<LandingPage.WrappedComponent {...props} />);
    it('Matches snapshot', () => {
        expect(LandingPageComponent).toMatchSnapshot();
    })
})
