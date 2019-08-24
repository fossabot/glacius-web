import React from 'react';
import { AppSidebarToggler } from '@coreui/react';
import {
  Nav, NavItem, NavLink as NormalNavLink, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import logoImg from 'images/logo.png';
import logoMinImg from 'images/logo_min.png';
import avatarImg from 'images/avatar.png';
import { ConfirmModal } from 'components/Modals';

const propTypes = {
  currentModule: PropTypes.string,
  logout: PropTypes.func
};

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      logoutModalState: false
    };
  }

  toggleLogoutModal = () => {
    this.setState((prevState) => ({
      logoutModalState: !prevState.logoutModalState
    }));
  };

  render() {
    const { currentModule, logout } = this.props;
    const { logoutModalState } = this.state;

    return (
      <>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <NavLink className="navbar-brand" to="/portal">
          <img className="navbar-brand-full" src={logoImg} alt="Glacius Logo" width="89" height="25" />
          <img className="navbar-brand-minimized" src={logoMinImg} alt="Glacius Logo" width="30" height="30" />
        </NavLink>
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NormalNavLink>{currentModule}</NormalNavLink>
          </NavItem>
        </Nav>

        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={avatarImg} className="img-avatar" alt="admin@glacius.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user" /> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench" /> Settings</DropdownItem>
              <DropdownItem onClick={this.toggleLogoutModal}><i className="fa fa-lock" /> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>

        <ConfirmModal
          title="Logout"
          onConfirm={logout}
          isOpen={logoutModalState}
          toggle={this.toggleLogoutModal}
          size="sm"
          confirmBtnTxt="Logout"
          cancelBtnTxt="Cancel"
        >
          You will be returned to the login screen.
        </ConfirmModal>
      </>
    );
  }
}

Header.propTypes = propTypes;

export default Header;
