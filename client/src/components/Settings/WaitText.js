import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Form } from 'formsy-semantic-ui-react';
import { Header, Segment, Grid, Container} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

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
      waitlist: '',
    };
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)){
      this.setState({ [name]: value});
    }
  }

  handleSubmit = async (data) => {
    const success = await this.props.store.updateWaitlistText(data.waitlist);

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
        content='Waitlist text has been updated!'
        action={this.toggleModal}
      />
 
      <DefaultForm onValidSubmit={this.handleSubmit}>
        <Segment>
          <Header content = 'Waitlist Text' />
          <Grid columns={2} divided>
            <Grid.Column>
              <Form.TextArea name ='waitlist' onChange = {this.handleChange}
                style = {{ minHeight: 150}}/>
            </Grid.Column>
            <Grid.Column>
              <Segment>
              <Container text>
                <ReactMarkdown source={this.state.waitlist}
                  escapeHtml = {false}/>
              </Container>
              </Segment>
            </Grid.Column>
          </Grid>
          <Form.Button content="Update" color="orange" style = {{ marginTop: 15 }}/>
        </Segment>
      </DefaultForm>
    </div>
  )
}

export default WaitText;

