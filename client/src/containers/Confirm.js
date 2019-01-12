import React from 'react';
import Page from '../layouts/Page';
import withAuth from '../util/withAuth';

class Confirm extends React.Component {
  render() {
    return <Page title="Confirm">Confirm Here</Page>
  }
}

export default withAuth(Confirm);
