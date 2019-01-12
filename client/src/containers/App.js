import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { inject, observer } from 'mobx-react';
import Login from './Login';
import Home from './Home';
import Apply from './Apply';
import Confirm from './Confirm';
import Admin from './Admin';

@inject('store')
@observer
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/apply" component={Apply} />
          <Route path="/confirm" component={Confirm} />
          <Route path="/admin" component={Admin} />
        </div>
      </Router>
    );
  }
}

export default App;
