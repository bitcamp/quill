import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import queryString from 'query-string';
import UsersLayout from '../../layouts/UsersLayout';
import UsersSearch from '../../components/AdminUsers/UsersSearch';
import UsersTable from '../../components/AdminUsers/UsersTable';
import UserModal from '../../components/AdminUsers/UserModal';
import ActionModal from '../../components/ActionModal';

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_QUERY = "";

const DEFAULT_STATE = { openModal: "" };

@withRouter
@inject('store')
@observer
class AdminUsers extends React.Component {
  state = DEFAULT_STATE;

  componentDidMount() {
    this._fetchUsers();
  }

  componentDidUpdate(prevProps) {
    const prevParams = this._getUrlParams(prevProps);
    const nextParams = this._getUrlParams(this.props);
    if (!_.isEqual(prevParams, nextParams)) {
      this._fetchUsers();
    }
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
    } = this._getUrlParams(this.props);

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
            onSelectUser={this._handleOpenModal('user')}
            onAdmitUser={this._handleOpenModal('admit')}
            onCheckinUser={this._handleOpenModal('checkin')}
            onChangePageSize={this.handleChangePageSize}
            onChangePage={this.handleChangePage}
          />
        }
        userModal={
          <UserModal
            open={this.state.openModal === 'user'}
            user={activeUser}
            onClose={this._handleCloseModal}
          />
        }
        admitModal={
          <ActionModal
            as='span'
            header='Admit User'
            open={this.state.openModal === 'admit'}
            action={this._handleAdmitUser}
            close={this._handleCloseModal}
          />
        }
        checkinModal={
          <ActionModal
            as='span'
            header='Checkin User'
            open={this.state.openModal === 'checkin'}
            action={this._handleCheckinUser}
            close={this._handleCloseModal}
          />
        }
      />
    );
  }

  _handleOpenModal = (popoverName) => (userId) => {
    this.props.store.adminStore.selectUser(userId);
    this.setState({ openModal: popoverName });
  }

  _handleCloseModal = () => {
    this.props.store.adminStore.selectUser(null);
    this.setState({ openModal: '' });
  }

  _handleAdmitUser = () => {
    this.props.store.adminStore.admitUser(this.props.store.adminStore.activeUser.id);
    this._handleCloseModal();
  }

  _handleCheckinUser = () => {
    this.props.store.adminStore.checkinUser(this.props.store.adminStore.activeUser.id);
    this._handleCloseModal();
  }

  _handleChangePage = (newPage) => {
    const page = Math.min(
      Math.max(newPage, 0),
      this.props.store.adminStore.numPages - 1);
    this._updateUrlParams({page});
  }

  _handleChangePageSize = (pageSize) => {
    this._updateUrlParams({
      page: DEFAULT_PAGE,
      pageSize
    });
  }

  _handleChangeQuery = (query) => {
    this._updateUrlParams({query});
  }

  _getUrlParams = (props) => {
    const params = queryString.parse(props.location.search);
    const {
      page = DEFAULT_PAGE,
      pageSize = DEFAULT_PAGE_SIZE,
      query = DEFAULT_QUERY,
    } = params;
    return { page, pageSize, query };
  }

  _updateUrlParams = (updateDocument) => {
    const currentParams = this._getUrlParams(this.props);
    const nextParams = {...currentParams, ...updateDocument};

    const query = queryString.stringify(nextParams);
    this.props.history.push(`/admin/users?${query}`);
  }

  _fetchUsers = () => {
    const { page, pageSize, query } = this._getUrlParams(this.props);

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
}

export default AdminUsers;