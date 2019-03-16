import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Registration from '../components/Settings/Registration.js'
import Confirmation from '../components/Settings/Confirmation.js'
import Minors from '../components/Settings/Minors.js'
import WaitText from '../components/Settings/WaitText.js'
import AcceptText from './Settings/Acceptance.js';
import ConfirmText from './Settings/ConfirmText.js';

@observer
class SettingsForm extends Component {

  render = () => (
    <div>
      <Registration/>
      <Confirmation/>
      <Minors/>
      <WaitText/>
      <AcceptText/>
      <ConfirmText/>
    </div>
  )
}

export default SettingsForm;
