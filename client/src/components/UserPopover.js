import React from 'react';
import { observer } from 'mobx-react';
import { Modal } from 'semantic-ui-react';

const UserPopover = (props) => {
  return (
    <Modal
      closeIcon
      open={props.open}
      onClose={props.onClose}

      content={<pre>
        {JSON.stringify(props.user, null, '\t')}
      </pre>}
    />
  );
}

export default observer(UserPopover);