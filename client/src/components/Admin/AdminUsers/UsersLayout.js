import * as React from 'react';
import { observer } from 'mobx-react';
import { Grid, Header } from 'semantic-ui-react';
import LoadingDisplay from '../../LoadingDisplay';

@observer
class UsersLayout extends React.Component {
  render() {
    const {
      usersSearch,
      usersTable,
      loading,
      userModal,
      admitModal,
      checkinModal,
    } = this.props;

    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header as='h3' content="Search" />
            {usersSearch}
          </Grid.Column>
          <Grid.Column width={13}>
            <Header as='h3' content="Users" />
            {loading
              ? <LoadingDisplay />
              : usersTable}
          </Grid.Column>
        </Grid.Row>
        {userModal}
        {admitModal}
        {checkinModal}
      </Grid>
    )
  }
}

export default UsersLayout;