import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('adminStore')
@observer
class AdminStatistics extends React.Component {
  render() {
    return (
      <span>
        Stats<br />
        {JSON.stringify(this.props.adminStore.stats)}
      </span>
    )
  }
}

export default AdminStatistics;