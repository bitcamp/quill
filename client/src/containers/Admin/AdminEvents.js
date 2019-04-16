import React from 'react';
import { observer, inject } from 'mobx-react';
import EventList from '../../components/Events/EventList';
import { Item, Container, Header } from 'semantic-ui-react'

@inject('store')
@observer
class AdminEvents extends React.Component {
  constructor (props) {
    super(props);
    props.store.adminStore.getEvents();
  }

  render() {
    return (
      <Container>
        <EventList events = {this.props.store.adminStore.events} />
      </Container>
    )
  }
}

export default AdminEvents;