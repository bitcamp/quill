import React from 'react';
import { Item, Label, Button } from 'semantic-ui-react'

class EventItem extends React.Component {
  onEdit = () => {
    const event = {
      id: this.props.event.id,
      title: this.props.event.title,
      description: this.props.event.description,
      startEpoch: this.props.event.startEpoch,
      endEpoch: this.props.event.endEpoch,
      location: this.props.event.location,
      beginner: this.props.event.beginner,
      category: this.props.event.category
    };

    this.props.onEdit(event);
  }

  render() {
    const { event} = this.props;
    if(event.img === "") {
        // TODO: replace w/ local asset
        event.img = "http://semantic-ui.com/images/wireframe/image.png";
    }

    let labels = [];
    for(const cat of event.category) {
        labels.push(<Label>{cat}</Label>)
    }

    const st = (new Date(event.startTime)).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})
    const et = (new Date(event.endTime)).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})

    const featured = event.featuredEvent ? <Label>Featured</Label> : null;

    return (
        <Item>
        <Item.Image size='tiny' src={event.img} />
        <Item.Content>
            <Item.Header>{event.title}</Item.Header>
            <Item.Meta>
              <span className='location'>{event.location}</span><br/>
                <span className='startTime'>{st}</span> - <span className='endTime'>{et}</span>
            </Item.Meta>
            <Item.Description>
                {event.description}
            </Item.Description>
            <Item.Extra>
                {labels}
                <Button floated='right' onClick={this.onEdit}>Edit</Button>
                {featured}
            </Item.Extra>
        </Item.Content>
        </Item>
    );
  }
}

export default EventItem;