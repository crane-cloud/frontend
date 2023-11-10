import React from 'react';
import {  shallow } from "enzyme";
import AttentionComponent from './index';

test('renders AttentionComponent correctly', () => {
  const AttentionComponentWrapper = shallow(<AttentionComponent />);
  expect(AttentionComponentWrapper.find('.attentionNotice').hasClass('attentionNotice')).toBe(true);
});

