import React from "react";

import { shallow } from "enzyme";

import Tooltip from "./index";

describe('Test the component', () => {
    it('checks if tooltip matches snapshot', () => {
        const TooltipIcon = shallow(<Tooltip showIcon={true} keyword="" position="top" message="" />);
        const TooltipNoIcon = shallow(<Tooltip showIcon={false} keyword="" position="top" message="" />);
        expect(TooltipIcon).toMatchSnapshot();
    })
})