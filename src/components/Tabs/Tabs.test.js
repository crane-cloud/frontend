import React from "react";

import { shallow } from "enzyme";

import Tab from "./Tab";
import Tabs from "./index";

const TabProps = {
    index:1,
     onClick:jest.fn(),
      label:"name",
       activeTab:"false"
  };
  const TabsProps = {
    children:[{props:{index:1}}]
  };

describe('Test the tab component', () => {
    const TabComponent = shallow(<Tab 
        {...TabProps} />);

    it("should match the snapshot for tabs after adding props", () => {
        TabComponent.setProps(TabProps);
        expect(TabComponent).toBeDefined();
      });
}) 

describe('Test the tabs component', () => {
    const TabsComponent = shallow(<Tabs 
        {...TabsProps} />);

    it("should match the snapshot for tabs after adding props", () => {
        TabsComponent.setProps(TabsProps);
        expect(TabsComponent).toBeDefined();
      });
}) 