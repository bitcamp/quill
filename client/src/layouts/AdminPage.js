import React from 'react';
import { observer } from 'mobx-react';
import BasePage from './Page/BasePage';
import Messages from '../containers/Messages';

@observer
export default class AdminPage extends React.Component {
  render() {
    return (
      <BasePage>
        <Messages />
        {this.props.children}
      </BasePage>
    )
  }
}