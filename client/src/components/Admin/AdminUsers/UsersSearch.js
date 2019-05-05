import React from 'react';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import { Button, Input, Label } from 'semantic-ui-react';

@observer
class UsersSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { intermediatePageSize: props.pageSize };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pageSize !== this.props.pageSize) {
      this.setState({ intermediatePageSize: this.props.pageSize });
    }
  }

  render() {
    return (
      <div>
        <div style={{textAlign: 'center', margin: '10px 0'}}>
          <Button circular icon='angle double left'
            onClick={() => this.props.onChangePage(0)} />
          <Button circular icon='angle left'
            onClick={() => this.props.onChangePage(this.props.page - 1)} />
          <Label size='large' content={this.props.page} />
          <Button circular icon='angle right'
            onClick={() => this.props.onChangePage(Number(this.props.page) + 1)} />
          <Button circular icon='angle double right'
            onClick={() => this.props.onChangePage(this.props.numPages - 1)} />
        </div>

        <Input fluid style={{margin: '10px 0'}}
          type='number'
          label='Size'
          action={{
            color:'teal',
            content: 'Update',
            onClick: this.handlePageSizeSubmit,
          }}
          value={this.state.intermediatePageSize}
          onChange={this.handlePageSizeChange}
        />

        <Input fluid style={{margin: '10px 0'}}
          icon='search'
          placeholder='Search'
          onChange={_.debounce(this.handleSearchChange, 250)}
        />
      </div>
    );
  }

  handleSearchChange = (e, { value }) => {
    this.props.onChangeQuery(value);
  }

  handlePageSizeChange = (e, { value }) => {
    this.setState({ intermediatePageSize: value });
  }

  handlePageSizeSubmit = () => {
    this.props.onChangePageSize(Number(this.state.intermediatePageSize));
  }
}

export default UsersSearch;