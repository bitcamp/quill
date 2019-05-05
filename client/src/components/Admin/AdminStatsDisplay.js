import * as React from 'react';
import * as _ from 'lodash';

class AdminStatsDisplay extends React.Component {
  render() {
    const { stats } = this.props;

    return (
      <pre>
        {JSON.stringify(stats, null, 2)}
      </pre>
    )
  }
}

export default AdminStatsDisplay;