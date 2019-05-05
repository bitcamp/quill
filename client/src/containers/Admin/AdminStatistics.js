import React from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import UserStatistics from '../../components/UserStatistics';

@inject('store')
@observer
class AdminStatistics extends React.Component {
  componentDidMount() {
    this._fetchStats();
  }

  render() {
    const { stats } = this.props.store.adminStore;
    const statsToDisplay = toJS(stats);

    return (
      <UserStatistics stats={statsToDisplay} />
    );
  }

  _fetchStats() {
    this.props.store.adminStore.loadStats();
  }
}

export default AdminStatistics;