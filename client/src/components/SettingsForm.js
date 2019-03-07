import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Form } from 'formsy-semantic-ui-react';
import DefaultForm from '../util/DefaultForm';
import { Header, Segment } from 'semantic-ui-react';
import { DateTimeInput} from 'semantic-ui-calendar-react';

const headerProps = { as: 'h2', color: 'blue', textAlign: 'center' };

const openClose = [
    <Segment>
      <Header content = 'Open/Close Registration' />
      <div style={{marginBottom: 5}}>
        Users will be able to register new accounts within the time period specified.
      </div>
      <Form.Input name='Opens' label='Opens:'/>
        <DateTimeInput
          name="dateTime"
          placeholder="Date/Time"
          // value={this.state.dateTime}
          iconPosition="left"
          // onChange={this.handleChange}
        />
      <Form.Input name='Closes' label='Opens:'/>

      <Form.Button content="Update" color="orange"/>
    </Segment>
]

const confirmation = [
    <Segment>
        <Header content = 'Confirmation Date' />
      <div style={{marginBottom: 5}}>
        Any users that are accepted will have to confirm by the date selected.
      </div>

      <Form.Input name='Confirm' label='Confirm By:'/>
      <Form.Button content="Update" color="orange"/>
    </Segment>
]

const additional = [
    <Segment>
        <Header content = 'Additional Options' />  
        <Form.Checkbox name='minors'
          label='Allow Minors?'
        />
    </Segment>
]

const waitlist = [
    <Segment>
        <Header content = 'Waitlist Text'/>  
        <Form.TextArea name ='waitlist'/>

      <Form.Button content="Update" color="orange"/>
    </Segment>
]

@observer
class SettingsForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      dateTime: ''
    };
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)){
      this.setState({ [name]: value});
    }
  }

  handleValidSubmit = async (formData) => {
    console.log(this.props);
    const success = this.props.onSubmit(formData);
    if (success) {
      
    }
  }

  updateOpenTime = async (times) => {
    console.log('trying to update profile');
    const success = await this.props.store.updateRegistrationTimes(times);

    if (success) {
      this.setState({ showModal: true });
    }
  }
  
  render = () => (
    <div>
      <DefaultForm
        onValidSubmit={this.updateOpenTime} 
        >
        {openClose}
        <DateTimeInput
          name="dateTime"
          placeholder="Date/Time"
          value={this.state.dateTime}
          iconPosition="left"
          onChange={this.handleChange}
        />
      </DefaultForm>


      <DefaultForm
        onValidSubmit={this.handleValidSubmit} 
        >
        {confirmation}
      </DefaultForm>

        {/* {additional} */}
        {/* {waitlist} */}
    </div>
  )
}

export default SettingsForm;
