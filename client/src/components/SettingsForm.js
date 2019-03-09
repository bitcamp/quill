import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Registration from '../components/Settings/Registration.js'
import Confirmation from '../components/Settings/Confirmation.js'
import Minors from '../components/Settings/Minors.js'
import WaitText from '../components/Settings/WaitText.js'

@observer
class SettingsForm extends Component {

  render = () => (
    <div>
      {console.log(this.props)}
      <Registration/>
      <Confirmation/>
      <Minors/>
      <WaitText/>
    </div>
  )
}

export default SettingsForm;
