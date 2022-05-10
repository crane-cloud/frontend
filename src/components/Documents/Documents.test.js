import React from 'react';
import { shallow } from "enzyme";
import Privacy from './privacy';
import Terms from './terms';


describe('Test the privacy document', () => {
    it('checks if the privacy document matches the snapshot', () => {
        const PrivacyDoc = shallow(<Privacy />);
        expect(PrivacyDoc).toMatchSnapshot();
    });
});

describe('Test the terms document', () => {
    it('checks if the terms document matches the snapshot', () => {
        const TermsDoc = shallow(<Terms />);
        expect(TermsDoc).toMatchSnapshot();
    });
});