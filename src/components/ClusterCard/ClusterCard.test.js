import React from 'react';
import { shallow } from "enzyme";
import ClusterCard from './index';

describe('Test the cluster card component', () => {
    const ClusterCardComponent = shallow(<ClusterCard description="" icon="" name="" />);
    it('checks if the cluster card component matches the snapshot', () => {
        expect(ClusterCardComponent).toMatchSnapshot();
    });
});