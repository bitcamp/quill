import React from 'react';
import { observer } from 'mobx-react';
import { Modal } from 'semantic-ui-react';

const UserModal = ({ user, ...rest}) => {
  return (
    <Modal
      {...rest}
      closeIcon
      content={<pre>
        {JSON.stringify(user, null, '\t')}
      </pre>}
    />
  );
}

export default observer(UserModal);