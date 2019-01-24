import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from "react-router";

const withAuth = (WrappedComponent, requirement = (user) => true) => {
  @inject('store')
  @observer
  @withRouter
  class WithAuth extends React.Component {
    constructor(props) {
      super(props);

      if (!this.props.store.loggedIn || !requirement(this.props.store.user)) {
        this.props.history.replace("/login");
      }
    }

    render() {
      return <WrappedComponent />;
    }
  }
  
  return WithAuth;
};

export default withAuth;
