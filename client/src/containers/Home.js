import React from 'react';
import { inject, observer } from 'mobx-react';
import Page from '../layouts/Page';
import Dashboard from '../components/Dashboard';

@inject('store')
@observer
class Home extends React.Component {
  render() {
    return (
      <Page title="Dashboard">
        <Dashboard user={this.props.store.user} />
      </Page>
    );
  }
}

export default Home;