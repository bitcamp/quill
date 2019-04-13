import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class AdminStatistics extends React.Component {
  render() {
    return (
      <span>
        Stats<br />
        {JSON.stringify(this.props.store.adminStore.stats)}
      </span>
    )
  }
}

export default AdminStatistics;