import React from 'react';
import { withRouter } from 'react-router';

const withHooks = (WrappedComponent, onEnter, onLeave) => {
  @withRouter
  class WithHooks extends React.Component {
    constructor(props) {
      super(props);
      onEnter(this.props.history);
    }

    componentWillUnmount() {
      onLeave(this.props.history);
    }

    render() {
      return <WrappedComponent />;
    }
  }

  return WithHooks;
}

export default withHooks;
