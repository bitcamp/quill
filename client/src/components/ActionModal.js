import React from 'react';
import { Modal } from 'semantic-ui-react';

const ActionModal = ({ action, close, ...rest }) => {
  let actions = [
    { key: 'ok', content: 'OK', positive: true, onClick: action },
  ];
  
  // TODO: Refactor this mess
  if (close) {
    actions.push({
      key: 'cancel', content: 'Cancel', onClick: close
    });
  }

  return (
    <Modal
      size='small'
      actions={actions}
      {...rest}
    />
  );
}

export default ActionModal;