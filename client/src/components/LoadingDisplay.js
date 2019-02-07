import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export default () => (
  <Dimmer active inverted>
    <Loader inverted size='large' />
  </Dimmer>
);
