import React from 'react';
import { shallow } from "enzyme";
import ConnectionComponent from '.';

describe('Connection component test', () => {
    const handleClose = jest.fn();
    const ConnComponentFalse = shallow(<ConnectionComponent handleClose={handleClose} show={false} />);
    const ConnComponentTrue = shallow(<ConnectionComponent handleClose={handleClose} show={true} />);
    it('checks if the connection component matches the snapshot', () => {
        expect(ConnComponentFalse).toMatchSnapshot();
    })
})