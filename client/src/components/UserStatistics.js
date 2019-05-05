import * as React from 'react';
import * as _ from 'lodash';
import { toJS } from 'mobx';

class UserStatistics extends React.Component {
  render() {
    const { stats } = this.props;
    const statsToDisplay = toJS(stats);
    delete statsToDisplay.demo;

    return (
      <pre>
        {JSON.stringify(statsToDisplay, null, 2)}
      </pre>
    )
  }
}

export default UserStatistics;