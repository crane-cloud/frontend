import React from 'react';
import Tabs from '.';
import BlackInputText from '../BlackInputText';
import { ReactComponent as DockerLogo } from '../../assets/images/docker-logo.svg';

const SampleTabs = () => (
  <div style={{ margin: '5rem', maxWidth: '30rem', position: 'relative' }}>
    <Tabs>
      <div index={1} label={<DockerLogo />}>
        <BlackInputText
          required
          placeholder="Project Name"
        />
      </div>
      <div index={2} label="Tab Two">
        Tab Two
      </div>
      <div index={3} label="Tab Three">
        Tab Three
      </div>
    </Tabs>
  </div>
);

export default SampleTabs;
