import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Checkbox } from 'formsy-semantic-ui-react';
import { Header, Segment} from 'semantic-ui-react';

import DefaultForm from '../../util/DefaultForm';
import ActionModal from '../../components/ActionModal';

@withRouter
@inject('store')
@observer
class WaitText extends Component {

  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      minors: false
    };
  }

  handleSubmit = async () => {
    this.setState({ minors: !this.state.minors})
    const success = await this.props.store.updateAllowMinors(!this.state.minors);
    if (success) {
      this.setState({ showModal: true });
    }
  }

  toggleModal = () =>{
    if (this.state.showModal){
      this.setState({showModal: false});
    } else {
      this.setState({showModal: true})
    }
  }

  render = () => (
    <div style={{marginBottom: 15}}>
        <ActionModal
            as='span'
            open={this.state.showModal}
            header='Awesome!'
            content={this.state.minors ? 'Minors are now allowed to register!' : 'Minors are no longer allowed to register!'}
            action={this.toggleModal}
        />
 
        <DefaultForm>
            <Segment>
                <Header content = 'Additional Options' />  
                <Checkbox toggle name='minors'
                label='Allow Minors?'
                checked={this.state.minors}
                onChange={this.handleSubmit} />
            </Segment>
        </DefaultForm>
    </div>
  )
}

export default WaitText;

