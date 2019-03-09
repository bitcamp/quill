import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form } from 'formsy-semantic-ui-react';
import { Header, Segment} from 'semantic-ui-react';
import { DateTimeInput} from 'semantic-ui-calendar-react';

import DefaultForm from '../../util/DefaultForm';
import ActionModal from '../../components/ActionModal';

@inject('store')
@observer
class Confirmation extends Component {

  constructor(props){
    super(props);
    this.state = {
      confirmDateTime: '',
      showModal: false
    };
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)){
      this.setState({ [name]: value});
    }
  }

  handleSubmit = async () => {
    const confirmTime = new Date(this.state.confirmDateTime).getTime();
    const success = await this.props.store.updateConfirmationTime(confirmTime);

    if (success) {
      this.setState({ showModal: true });
    }
  }

  goToDashboard = () => this.props.history.push('/');

  render = () => (
    <div style={{marginBottom: 15}}>
      <ActionModal
        as='span'
        open={this.state.showModal}
        header='Awesome!'
        content='Confirmation date/time has been updated!'
        action={this.goToDashboard}
      />
 
      <DefaultForm
        onValidSubmit={this.handleSubmit}
        >
        <Segment>
            <Header content = 'Confirmation Date' />
            <div style={{marginBottom: 5}}>
              Any users that are accepted will have to confirm by the date selected.
            </div>

            <Header as="h5">Confirm By:</Header>
            <DateTimeInput
                name="confirmDateTime"
                placeholder="Confirmation Date/Time"
                value={this.state.confirmDateTime}
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

export default Confirmation;

