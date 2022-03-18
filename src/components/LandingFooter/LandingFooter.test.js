import React from "react";

import { shallow } from 'enzyme';

import LandingFooter from './index'

import NewLogo from "../NewLogo";

import { ReactComponent as TwitterIcon } from "../../assets/images/twitter.svg";

import { ReactComponent as FacebookIcon } from "../../assets/images/facebook.svg";

import { ReactComponent as LinkedinIcon } from "../../assets/images/Linkedin.svg";

import { ReactComponent as MediumIcon } from "../../assets/images/medium.svg";

describe ('Test the LandingFooter component', () => {
    it('checks if landing footer component rendered correctly', () => {
        const FooterComponent = shallow(<LandingFooter />);
        
        expect(FooterComponent).toMatchSnapshot();
        
        expect(FooterComponent.contains(<NewLogo />)).toEqual(true);

        expect(FooterComponent.contains(<TwitterIcon />)).toEqual(true);

        expect(FooterComponent.contains(<FacebookIcon />)).toEqual(true);

        expect(FooterComponent.contains(<LinkedinIcon />)).toEqual(true);

        expect(FooterComponent.contains(<MediumIcon />)).toEqual(true);
    })
})