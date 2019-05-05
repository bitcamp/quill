import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import queryString from 'query-string';
import UsersLayout from '../../layouts/UsersLayout';
import UsersSearch from '../../components/UsersSearch';
import UsersTable from '../../components/UsersTable';
import UserPopover from '../../components/UserPopover';
import ActionModal from '../../components/ActionModal';

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_QUERY = "";

const DEFAULT_STATE = {
  openModal: "",
};

@withRouter
@inject('store')
@observer
class AdminUsers extends React.Component {
  state = DEFAULT_STATE;

  componentDidMount() {
    this._fetchUsers();
  }

  componentDidUpdate(prevProps) {
    const prevQuery = this._getQueryParams(prevProps);
    const nextQuery = this._getQueryParams(this.props);
    if (!_.isEqual(prevQuery, nextQuery)) {
      this._fetchUsers();
    }
  }

  _fetchUsers = () => {
    const { page, pageSize, query } = this._getQueryParams(this.props);

    if (_.isEmpty(query)) {
      this.props.store.adminStore.loadUsers(
        page, pageSize, query
      );
      return;
    }

    this.props.store.adminStore.loadUsers(
      DEFAULT_PAGE, DEFAULT_PAGE_SIZE, query
    );
  }

  _getQueryParams = (props) => {
    const params = queryString.parse(props.location.search);
    const {
      page = DEFAULT_PAGE,
      pageSize = DEFAULT_PAGE_SIZE,
      query = DEFAULT_QUERY,
    } = params;
    return { page, pageSize, query };
  }

  render() {
    const {
      activeUser,
      activeUsers,
      numPages,
    } = this.props.store.adminStore;
    const {
      page = DEFAULT_PAGE,
      pageSize = DEFAULT_PAGE_SIZE,
      query = DEFAULT_QUERY,
    } = this._getQueryParams(this.props);

    return (
      <UsersLayout
        loading={this.props.store.adminStore.loadingUsers}
        usersSearch={
          <UsersSearch
            numPages={numPages}
            page={page}
            pageSize={pageSize}
            query={query}

            onChangePage={this._handleChangePage}
            onChangePageSize={this._handleChangePageSize}
            onChangeQuery={this._handleChangeQuery}
          />
        }
        usersTable={
          <UsersTable
            users={activeUsers}
            onSelectUser={this.handleOpenPopover('user')}
            onAdmitUser={this.handleOpenPopover('admit')}
            onCheckinUser={this.handleOpenPopover('checkin')}
            onChangePageSize={this.handleChangePageSize}
            onChangePage={this.handleChangePage}
          />
        }
        userPopover={
          <UserPopover
            open={this.state.openModal === 'user'}
            user={activeUser}
            onClose={this.handleClosePopover}
          />
        }
        admitModal={
          <ActionModal
            as='span'
            header='Admit User'
            open={this.state.openModal === 'admit'}
            action={this._handleAdmitUser}
            close={this.handleClosePopover}
          />
        }
        checkinModal={
          <ActionModal
            as='span'
            header='Checkin User'
            open={this.state.openModal === 'checkin'}
            action={this._handleCheckinUser}
            close={this.handleClosePopover}
          />
        }
      />
    );
  }

  handleOpenPopover = (popoverName) => (userId) => {
    this.props.store.adminStore.selectUser(userId);
    this.setState({ openModal: popoverName });
  }

  handleClosePopover = () => {
    this.props.store.adminStore.selectUser(null);
    this.setState({ openModal: '' });
  }

  _handleAdmitUser = () => {
    this.props.store.adminStore.admitUser(this.props.store.adminStore.activeUser.id);
    this.handleClosePopover();
  }

  _handleCheckinUser = () => {
    this.props.store.adminStore.checkinUser(this.props.store.adminStore.activeUser.id);
    this.handleClosePopover();
  }

  _handleChangePage = (newPage) => {
    const page = Math.min(
      Math.max(newPage, 0),
      this.props.store.adminStore.numPages - 1);
    this._updateQueryParams({page});
  }

  _handleChangePageSize = (pageSize) => {
    this._updateQueryParams({
      page: DEFAULT_PAGE,
      pageSize
    });
  }

  _handleChangeQuery = (query) => {
    this._updateQueryParams({query});
  }

  _updateQueryParams = (updateDocument) => {
    const currentParams = this._getQueryParams(this.props);
    const nextParams = {...currentParams, ...updateDocument};

    const query = queryString.stringify(nextParams);
    this.props.history.push(`/admin/users?${query}`);
  }
}

export default AdminUsers;