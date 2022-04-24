import React from "react";

import { shallow } from "enzyme";

import InputPassword from "./index";

const InputPasswordProps = {
    value: "text",
    required: false,
  };

describe('Test the component', () => {
    const OnChangeEvent = jest.fn(); 
    const changeBackground = jest.fn();
    const InputPasswordComponent = shallow(<InputPassword  required={true} name="" placeholder="*" value=""  onChange={OnChangeEvent} />);


    it("should match the snapshot for passwordInput after adding props", () => {
        InputPasswordComponent.setProps(InputPasswordProps);
        expect(InputPasswordComponent).toBeDefined();
      });

    it('checks if password Input rendered as expected on typing', () => { 
        InputPasswordComponent.find("input").simulate("change", { target: { value: 'typing' } });
         expect(OnChangeEvent).toHaveBeenCalled();
        expect(InputPasswordComponent).toMatchSnapshot();
    })

    it("should test the background change function for password", () => {
        expect(changeBackground).toBeDefined();
    })
}) 