import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Form } from 'formsy-semantic-ui-react';
import DefaultForm from '../util/DefaultForm';
import { Header, Segment } from 'semantic-ui-react';
import * as SettingsService from '../services/SettingsService';
import Registration from '../components/Settings/Registration.js'

const headerProps = { as: 'h2', color: 'blue', textAlign: 'center' };

// const openClose = [
//     <Segment>
//       <Header content = 'Open/Close Registration' />
//       <div style={{marginBottom: 5}}>
//         Users will be able to register new accounts within the time period specified.
//       </div>
//       <Form.Input name='Opens' label='Opens:'/>
//         <DateTimeInput
//           name="dateTime"
//           placeholder="Date/Time"
//           // value={this.state.dateTime}
//           iconPosition="left"
//           // onChange={this.handleChange}
//         />
//       <Form.Input name='Closes' label='Opens:'/>

//       <Form.Button content="Update" color="orange"/>
//     </Segment>
// ]

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

  render = () => (
    <div>
      <Registration>
      </Registration>

    </div>
  )
}

export default SettingsForm;
