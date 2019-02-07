import React from 'react';
import { Modal } from 'semantic-ui-react';

const ActionModal = ({ action, ...rest }) => (
  <Modal
    size='small'
    actions={[{ key: 'ok', content: 'OK', positive: true, onClick: action }]}
    {...rest}
  />
);

export default ActionModal;