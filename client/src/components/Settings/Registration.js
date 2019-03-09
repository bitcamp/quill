import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Form } from 'formsy-semantic-ui-react';
import DefaultForm from '../../util/DefaultForm';
import { Header, Segment} from 'semantic-ui-react';
import { DateTimeInput} from 'semantic-ui-calendar-react';
import * as SettingsService from '../../services/SettingsService';


@observer
class Registration extends Component {

  constructor(props){
    super(props);
    this.state = {
      openDateTime: '',
      closeDateTime: ''
    };
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)){
      this.setState({ [name]: value});
    }
  }

  handleRegistrationTimes = async () => {
    console.log(this.state);

    const openTime = new Date(this.state.openDateTime);
    const closeTime = new Date(this.state.closeDateTime);


    if (closeTime < openTime){
        console.log("Start cannot be after end");
        return;
    }
    // Date open = new Date

    const success = SettingsService.updateRegistrationTimes(this.state.openDateTime, this.state.closeDateTime)
  }

  render = () => (
      <DefaultForm
        onValidSubmit={this.handleRegistrationTimes}
        >
        <Segment>
            <Header content = 'Open/Close Registration' />
            <div style={{marginBottom: 5}}>
                Users will be able to register new accounts within the time period specified.
            </div>

            <Header as="h5">Opens:</Header>
            <DateTimeInput
                name="openDateTime"
                placeholder="Open Date/Time"
                value={this.state.openDateTime}
                iconPosition="left"
                onChange={this.handleChange}
            />

            <Header as="h5">Closes:</Header>
            <DateTimeInput
                name="closeDateTime"
                placeholder="Close Date/Time"
                value={this.state.closeDateTime}
                iconPosition="left"
                onChange={this.handleChange}
            />

            <Form.Button content="Update" color="orange"/>
        </Segment>
        {/* <DateTimeInput
          name="openDateTime"
          placeholder="Date/Time"
          value={this.state.dateTime}
          iconPosition="left"
          onChange={this.handleChange}
        /> 
        <DateTimeInput
          name="closeDateTime"
          placeholder="Date/Time"
          value={this.state.dateTime}
          iconPosition="left"
          onChange={this.handleChange}
        />  */}

      </DefaultForm>

  )
}

export default Registration;

