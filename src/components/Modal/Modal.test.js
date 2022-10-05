import React from 'react';

import { shallow } from 'enzyme';

import Modal from '.';
import { bool } from 'prop-types';

describe('Test the Model component', () => { 
    const onClickAway = jest.fn();
    const showModal = false;
    const children = <div>Model</div>
    it('checking for proper rendering', () => {
        const ModalComponent = shallow(<Modal onClickAway={onClickAway} 
            children={children}
            showModal={showModal}/>);
        expect(ModalComponent).toMatchSnapshot();
    })
})