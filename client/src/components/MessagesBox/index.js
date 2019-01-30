import React from 'react';
import { observer } from 'mobx-react';
import { Message } from 'semantic-ui-react';

const typeToIcon = {
  'error': 'warning',
  'success': 'check', 
}

const typeToColor = {
  'error': 'red',
  'success': 'green',
}

@observer
class Messages extends React.Component {
  render() {
    const { messages } = this.props;

    if (messages.length === 0) {
      return null;
    }

    if (messages.length === 1) {
      const message = messages[0];
      const icon = typeToIcon[message.type];
      const color = typeToColor[message.type];
      const header = message.type.toUpperCase();
      return <Message
        icon={icon}
        color={color}
        header={header}
        content={message.text}
      />;
    }

    const messageTexts = messages.map(message => message.text);

    return (
      <Message
        list={messageTexts}
      />
    );
  }
}

export default Messages;
