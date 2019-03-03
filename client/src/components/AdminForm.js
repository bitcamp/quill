import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Form } from 'formsy-semantic-ui-react';
import DefaultForm from '../util/DefaultForm';
import { Header } from 'semantic-ui-react';

const headerProps = { as: 'h2', color: 'blue', textAlign: 'center' };

const stats = [
  <Header {...headerProps} content='Settings Form!' />,
];

const openClose = [
    <Header content = 'Open/Close Registration' />,
]



@observer
class SettingsForm extends Component {
  handleValidSubmit = async (formData) => {
    const success = this.props.onSubmit(formData);
    if (success) {

    }
  }

  render = () => (
    <DefaultForm 
      onValidSubmit={this.handleValidSubmit} 
    >
      {stats}
      {openClose}
      <Form.Button content="Update" color="orange" />
    </DefaultForm>
  )
}

export default SettingsForm;
