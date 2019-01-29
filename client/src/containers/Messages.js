import React from 'react';
import { inject, observer } from 'mobx-react';
import MessagesBox from '../components/MessagesBox';

@inject('store')
@observer
class Messages extends React.Component {
  render() {
    return (
      <MessagesBox messages={this.props.store.messages} />
    );
  }
}

export default Messages;
