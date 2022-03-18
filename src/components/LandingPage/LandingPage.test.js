import React from 'react';

import { shallow } from 'enzyme';

import LandingPage from './';

const LandingPageProps = {
    user: {
        data: {
            id: ""
        }
    }
}
describe('LandingPage component test', () => { 
    const LandingPageComponent = shallow(<LandingPage.WrappedComponent {...LandingPageProps} />);
    it('matches the existing snapshot', () => {
        expect(LandingPageComponent).toMatchSnapshot();
    })
})
