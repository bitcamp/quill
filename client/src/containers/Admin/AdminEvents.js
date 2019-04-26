import React from 'react';
import { observer, inject } from 'mobx-react';
import EventList from '../../components/Events/EventList';
import { Icon, Container, Button, Divider } from 'semantic-ui-react'
import EventCreate from '../../components/Events/EventCreate';

@inject('store')
@observer
class AdminEvents extends React.Component {
  state = {
    isCreating: false,
    isEditing: false,
    eventInfo: {}
  };

  constructor (props) {
    super(props);
    props.store.adminStore.getEvents();
  }

  toggleCreate = () => {
    this.setState({
      isCreating: !this.state.isCreating,
      isEditing: false
    });
  }

  onSubmit = (state) => {
    if(this.state.isEditing) {
      this.props.store.adminStore.updateEvent(state);
    } else {
      this.props.store.adminStore.createEvent(state);
    }

    this.toggleCreate();
  }

  onEventEdit = (event) => {
    this.setState({
      isCreating: true,
      isEditing: true,
      eventInfo: event
    });
  }

  onEventDelete = (state) => {
    this.props.store.adminStore.deleteEvent(state.id);
    this.toggleCreate();
  }

  render() {
    if(this.state.isCreating) {
      return <Container>
        <EventCreate onSubmit={this.onSubmit} onCancel={this.toggleCreate} edit={this.state.isEditing} onDelete={this.onEventDelete} eventInfo={this.state.eventInfo}/>
      </Container>
    }

    return (
      <Container>
        <Button icon positive labelPosition='left' onClick={this.toggleCreate}>
          <Icon name='add'/>
          Create
        </Button>
        <Divider />
        <EventList events={this.props.store.adminStore.events} onEdit={this.onEventEdit}/>
      </Container>
    )
  }
}

export default AdminEvents;