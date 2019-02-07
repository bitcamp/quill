import React from 'react';
import { inject, observer } from 'mobx-react';
import LoadingDisplay from '../components/LoadingDisplay';

@inject('store')
@observer
class Loading extends React.Component {
  render() {
    if (!this.props.store.loading) {
      return null;
    }

    return <LoadingDisplay />;
  }
}

export default Loading;
