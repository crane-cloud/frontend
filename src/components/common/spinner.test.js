import React from 'react';
import { shallow } from 'enzyme';

import Spinner from './Spinner';

it('renders without crashing', () => {
  shallow(<Spinner />);
});
