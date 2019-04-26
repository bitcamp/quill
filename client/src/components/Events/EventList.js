import React from 'react';
import { Item } from 'semantic-ui-react'
import EventItem from "./EventItem"

class EventList extends React.Component {
  render() {
    const events = this.props.events.sort((a, b) => a.startEpoch >= b.endEpoch);

    return (<Item.Group>
        {events.map(event => (
            <EventItem event={event} onEdit={this.props.onEdit} onDelete={this.onDelete}/>
        ))};
    </Item.Group>);
  }
}

export default EventList;