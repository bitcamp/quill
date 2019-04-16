import React from 'react';
import { Item, Label, Button } from 'semantic-ui-react'

class EventItem extends React.Component {
  render() {
    const { event} = this.props
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
                <Button floated='right'>Edit</Button>
                {featured}
            </Item.Extra>
        </Item.Content>
        </Item>
    );
  }
}

export default EventItem;