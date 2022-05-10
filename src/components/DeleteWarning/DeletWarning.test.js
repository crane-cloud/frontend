import React from 'react';
import { shallow } from "enzyme";
import DeletWarning from '.';

describe('Test the delete warning component', () => {
    const AlignedDeletWarningComponent = shallow(<DeletWarning textAlignment="center" />);
    const UnalignedDeletWarningComponent = shallow(<DeletWarning textAlignment={false} />);

    it('checks if the delete warning component matches the snapshot', () => {
        expect(AlignedDeletWarningComponent).toMatchSnapshot();
    });
});