import React from 'react';
import { observer } from 'mobx-react';
import { Container, Header, Segment } from 'semantic-ui-react';
import Messages from '../../containers/Messages';
import Loading from '../../containers/Loading';
import BasePage from './BasePage';
import './index.css';

@observer
export default class PageLayout extends React.Component {
  render() {
    return (
      <BasePage>
        <Container>
          <Loading />
          <Segment basic padded='very' style={{paddingTop: 16, paddingBottom: 2}}>
            <Header as='h1' dividing textAlign='center' content={this.props.title} />
          </Segment>
          <Segment basic padded='very'>
            <Messages />
            {this.props.children}
          </Segment>
        </Container>
      </BasePage>
    )
  }
}
