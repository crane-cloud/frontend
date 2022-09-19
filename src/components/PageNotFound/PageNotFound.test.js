import React from 'react';

import { shallow } from 'enzyme';

import PageNotFound from '.';

describe('Page not found Component', () => {
  it('Renders a page not found component', () => {
    const PageNotFoundComponent = shallow(<PageNotFound/>);
    expect(PageNotFoundComponent.find('.ErrorPageConent')
    .hasClass('ErrorPageConent')).toBe(true);
   expect(PageNotFoundComponent).toMatchSnapshot();
  });
});