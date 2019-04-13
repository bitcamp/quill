import React from 'react';
import { observer } from 'mobx-react';
import BasePage from './Page/BasePage';

@observer
export default class AdminPage extends React.Component {
  render() {
    return (
      <BasePage>
        {this.props.children}
      </BasePage>
    )
  }
}