import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Form } from 'formsy-semantic-ui-react';
import { Header, Segment } from 'semantic-ui-react';
import Registration from '../components/Settings/Registration.js'
import Confirmation from '../components/Settings/Confirmation.js'

const headerProps = { as: 'h2', color: 'blue', textAlign: 'center' };

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
  }

  render = () => (
    <div>
      {console.log(this.props)}
      <Registration></Registration>
      <Confirmation></Confirmation>
    </div>
  )
}

export default SettingsForm;
