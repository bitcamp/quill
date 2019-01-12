import React from 'react';
import Page from '../layouts/Page';
import withAuth from '../util/withAuth';

class Apply extends React.Component {
  render() {
    return <Page title="Apply">Apply Here</Page>
  }
}

export default withAuth(Apply);
