import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Form } from 'formsy-semantic-ui-react';
import { Header, Segment} from 'semantic-ui-react';
import { DateTimeInput} from 'semantic-ui-calendar-react';

import DefaultForm from '../../util/DefaultForm';
import ActionModal from '../../components/ActionModal';

@withRouter
@inject('store')
@observer
class Registration extends Component {

  constructor(props){
    super(props);
    this.state = {
      openDateTime: '',
      closeDateTime: '',
      showModal: false
    };
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)){
      this.setState({ [name]: value});
    }
  }

  handleSubmit = async () => {
    const openTime = new Date(this.state.openDateTime).getTime();
    const closeTime = new Date(this.state.closeDateTime).getTime();

    const success = await this.props.store.updateRegistrationTimes(openTime, closeTime);

    if (success) {
      this.setState({ showModal: true });
    }
  }

  toggleModal = () =>{
    if (this.state.showModal){
      this.setState({showModal: false});
    } else {
      this.setState({showModal: true})
    }
  }
  
  render = () => (
    <div style={{marginBottom: 15}}>
      <ActionModal
        as='span'
        open={this.state.showModal}
        header='Awesome!'
        content='Registration times have been updated!'
        action={this.toggleModal}
      />
 
      <DefaultForm
        onValidSubmit={this.handleSubmit}
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
                dateFormat="MM-DD-YYYY"
            />

            <Header as="h5">Closes:</Header>
            <DateTimeInput
                name="closeDateTime"
                placeholder="Close Date/Time"
                value={this.state.closeDateTime}
                iconPosition="left"
                onChange={this.handleChange}
                dateFormat="MM-DD-YYYY"
            />

            <Form.Button content="Update" color="orange"/>
        </Segment>
      </DefaultForm>
    </div>
  )
}

export default Registration;

