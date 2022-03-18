import React from "react";

import { shallow } from "enzyme";

import Tooltip from "./index";

describe('Tooltip Component', () => {
    it('Renders correctly', () => {
        const TooltipComponent = shallow(<Tooltip showIcon={true} keyword="" position="top" message="" />);
        
        expect(TooltipComponent).toMatchSnapshot();
        
        // There are two nested divs
        const TooltipPlaceholder = TooltipComponent.find('div div').first();
        
        // Has the placeholder div
        expect(TooltipPlaceholder.hasClass("TooltipPlaceholder")).toBe(true);
    })
})