import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Form } from 'formsy-semantic-ui-react';
import DefaultForm from '../../util/DefaultForm';
import { Header, Segment } from 'semantic-ui-react';
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
    const success = SettingsService.updateRegistrationTimes(this.state.openDateTime, this.state.closeDateTime)
  }

  render = () => (
    <div>
      <DefaultForm
        onValidSubmit={this.handleRegistrationTimes}
        >
        <Segment>
            <Header content = 'Open/Close Registration' />
            <div style={{marginBottom: 5}}>
                Users will be able to register new accounts within the time period specified.
            </div>

                <DateTimeInput
                name="opendateTime"
                placeholder="Open Date/Time"
                value={this.state.openDateTime}
                iconPosition="left"
                onChange={this.handleChange}
                />
            <Form.Input name='Closes' label='Opens:'/>

            <Form.Button content="Update" color="orange"/>
        </Segment>
        <DateTimeInput
          name="dateTime"
          placeholder="Date/Time"
          value={this.state.dateTime}
          iconPosition="left"
          onChange={this.handleChange}
        /> 
        <Form.Button content="Update" color="orange"/>

      </DefaultForm>
      <Registration>
      </Registration>

      {/* <DefaultForm
        onValidSubmit={this.handleValidSubmit} 
        >
        {confirmation}
      </DefaultForm> */}

        {/* {additional} */}
        {/* {waitlist} */}
    </div>
  )
}

export default Registration;

