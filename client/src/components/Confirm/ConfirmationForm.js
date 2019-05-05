import React from 'react';
import { observer } from 'mobx-react';
import { Form } from 'formsy-semantic-ui-react';
import DefaultForm from '../../util/DefaultForm';
import { Header } from 'semantic-ui-react';

@observer
class ConfirmationForm extends React.Component {
  handleValidSubmit = async (formData) => {
    const success = this.props.onSubmit(formData);
    if (success) {

    }
  }

  render = () => (
    <DefaultForm
      onValidSubmit={this.handleValidSubmit}
      defaultValues={this.props.oldConfirmation}
    >
      <Header as='h4'>
      We're glad that you'll be joining us on April 12-14, 2019 at the Xfinity Center!
      Please click the button below to confirm your attendance!
      </Header>

      <Header as='h4' content='Additional Notes' />
      <Form.TextArea name='confirmationAdditional'
        label="If there's anything else you need to let us know, tell us here!"
      />

      <Form.Button content='Submit Confirmation' color='orange' />
    </DefaultForm>
  )
}

export default ConfirmationForm;
