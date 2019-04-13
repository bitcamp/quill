import React from 'react';
import { observer } from 'mobx-react';

@observer
class AdminEvents extends React.Component {
  render() {
    return (
      <span>
        Events
      </span>
    )
  }
}

export default AdminEvents;