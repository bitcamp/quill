import * as React from 'react';
import { observer } from 'mobx-react';
import { Grid, Header } from 'semantic-ui-react';
import LoadingDisplay from '../components/LoadingDisplay';

@observer
class UsersLayout extends React.Component {
  render() {
    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header as='h3' content="Search" />
            {this.props.usersSearch}
          </Grid.Column>
          <Grid.Column width={13}>
            <Header as='h3' content="Users" />
            {this.props.loading
              ? <LoadingDisplay />
              : this.props.usersTable}
          </Grid.Column>
        </Grid.Row>
        {this.props.userPopover}
        {this.props.admitModal}
        {this.props.checkinModal}
      </Grid>
    )
  }
}

export default UsersLayout;