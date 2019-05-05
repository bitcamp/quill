import React from 'react';
import { observer } from 'mobx-react';
import { Button, Icon, Table } from 'semantic-ui-react';

const checkIcon     = <Icon color='green' name='checkmark'/>
const xIcon         = <Icon color='red' name='times' />

@observer
class UserRow extends React.Component {

  render () {
    const { user } = this.props;

    let rowStatus = {};
    switch (user.status.name) {
      case 'confirmed':
        rowStatus = { positive: true };
        break;
      case 'admitted':
        rowStatus = { warning: true };
        break;
      case 'declined':
        rowStatus = { error: true };
        break;
      default:
        break;
    };

    const name = user.status.completedProfile 
      ? `${user.profile.firstName} ${user.profile.lastName}`
      : user.email;
    const email = user.email;
    const school = user.status.completedProfile ? user.profile.school.trim() : "";
    const year = user.status.completedProfile ? user.profile.schoolYear.trim() : "";

    const verified = user.verified;
    const submitted = user.status.completedProfile;
    const admitted = user.status.admitted;
    const confirmed = user.status.confirmed;

    const admitButton = (
      <Button size='mini' circular icon='add user'
        onClick={(e) => { e.stopPropagation(); this.props.onAdmitUser(user.id)}}
      />
    )

    const checkinButton = (
      <Button size='mini' circular icon='flag checkered' 
        onClick={(e) => { e.stopPropagation(); this.props.onCheckinUser(user.id)}}
      />
    )

    return (
      <Table.Row
        {...rowStatus}
        onClick={() => this.props.onSelectUser(user.id)}
      >
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{email}</Table.Cell>
        <Table.Cell>{school}</Table.Cell>
        <Table.Cell>{year}</Table.Cell>

        <Table.Cell textAlign='center'>{verified ? checkIcon : xIcon}</Table.Cell>
        <Table.Cell textAlign='center'>{submitted ? checkIcon : xIcon}</Table.Cell>
        <Table.Cell textAlign='center'>{admitted ? checkIcon : xIcon}</Table.Cell>
        <Table.Cell textAlign='center'>{confirmed ? checkIcon : xIcon}</Table.Cell>

        <Table.Cell textAlign='center'>{admitButton}</Table.Cell>
        <Table.Cell textAlign='center'>{checkinButton}</Table.Cell>
      </Table.Row>
    )
  }
}

@observer
class UsersTable extends React.Component {
  render () {
    return (
      <Table celled structured compact='very' selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell rowSpan='2' textAlign='center'>Name</Table.HeaderCell>
            <Table.HeaderCell rowSpan='2' textAlign='center'>Email</Table.HeaderCell>
            <Table.HeaderCell rowSpan='2' textAlign='center'>School</Table.HeaderCell>
            <Table.HeaderCell rowSpan='2' textAlign='center'>Year</Table.HeaderCell>
            <Table.HeaderCell colSpan='4' textAlign='center'>Status</Table.HeaderCell>
            <Table.HeaderCell colSpan='2' textAlign='center'>Admission</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>V</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>S</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>A</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>C</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Admit</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Check-in</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.users.map(user => 
            <UserRow key={user.id}
              user={user}
              onSelectUser={this.props.onSelectUser}
              onAdmitUser={this.props.onAdmitUser}
              onCheckinUser={this.props.onCheckinUser}
            />
          )}
        </Table.Body>
      </Table>
    );
  }
}

export default UsersTable;