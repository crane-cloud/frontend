import React from "react";
import { shallow } from "enzyme";
import AdminPeriod from "./";

describe('Test the admin period component', () => {
    const onChange = jest.fn();
    const AdminPeriodComponent = shallow(<AdminPeriod onChange={onChange}/>)
    it('checks if the admin period component matches the snapshot', () => {
        expect(AdminPeriodComponent).toMatchSnapshot();
    });
})