import React from 'react';
import { Form } from 'semantic-ui-react'

class EventCreate extends React.Component {
  state = {id: 0, title: '', description: '', startEpoch: 0, endEpoch: 0, location: '', beginner: false, tags: ''}

  constructor (props) {
    super(props);

    if(this.props.edit) {
      const eventInfo = this.props.eventInfo;
      if(!eventInfo) { return; }

      this.state = {
        id: eventInfo.id,
        title: eventInfo.title,
        description: eventInfo.description,
        startEpoch: eventInfo.startEpoch,
        endEpoch: eventInfo.endEpoch,
        location: eventInfo.location,
        beginner: eventInfo.beginner,
        tags: eventInfo.category.join(", ")
      };
    }
  }

  handleChange = (_, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  }

  handleDelete = () => {
    this.props.onDelete(this.state);
  }

  render() {
    const buttonText = this.props.edit ? "Edit Event" : "Create Event"
    let deleteButton;
    if(this.props.edit) {
      deleteButton = <Form.Button onClick={this.handleDelete} negative>Delete</Form.Button>
    }

    return (
      <Form>
        <Form.Input fluid label='Title' placeholder='Hackathon 101' name='title' value={this.state.title} onChange={this.handleChange} required/>
        <Form.TextArea label='Description' placeholder='meet your team!' name='description' value={this.state.description} onChange={this.handleChange} required/>

        <Form.Group widths='equal'>
          <Form.Input fluid label='Start Time (ms)' placeholder='1555370912878' name='startEpoch' value={this.state.startEpoch} onChange={this.handleChange} required/>
          <Form.Input fluid label='End Time (ms)' placeholder='1555370912878' name='endEpoch' value={this.state.endEpoch} onChange={this.handleChange} required/>
        </Form.Group>
        <Form.Input fluid label='Location' placeholder='The Cabin' name='location' value={this.state.location} onChange={this.handleChange} required/>

        <Form.Checkbox label='Beginner Friendly' name='beginner' value={this.state.beginner} onChange={this.handleChange}/>
        <Form.Input fluid label='Categories' placeholder='Main' name='tags' value={this.state.category} onChange={this.handleChange}/>

        <Form.Group inline>
          <Form.Button onClick={this.props.onCancel}>Cancel</Form.Button>
          {deleteButton}
          <Form.Button onClick={this.handleSubmit} positive>{buttonText}</Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

export default EventCreate;