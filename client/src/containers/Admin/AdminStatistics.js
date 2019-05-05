import React from 'react';
import { inject, observer } from 'mobx-react';
import UserStatistics from '../../components/UserStatistics';

@inject('store')
@observer
class AdminStatistics extends React.Component {
  componentDidMount() {
    this._fetchStats();
  }

  componentDidUpdate() {
    this._fetchStats();
  }

  _fetchStats() {
    this.props.store.adminStore.loadStats();
  }

  render() {
    return (
      <UserStatistics stats={this.props.store.adminStore.stats} />
    )
  }
}

export default AdminStatistics;