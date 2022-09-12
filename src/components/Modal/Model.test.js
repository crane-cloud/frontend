import React from 'react';

import { shallow } from 'enzyme';

import Model from '.';


describe('Test the Model component', () => { 
    it('checking for proper rendering', () => {
        const ModelComponent = shallow(<Model/>);
        expect(ModelComponent).toMatchSnapshot();
        
    })
})