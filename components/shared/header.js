import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { Auth0Context } from '../../services/auth0.js';
import ActiveLink from '../ActiveLink.js';

const BsNavLink = props => (
  <ActiveLink route={props.route} activeClassName='active'>
    <a className='nav-link port-navbar-link'>{props.title}</a>
  </ActiveLink>
);

const Login = props => (
  <span
    className='nav-link port-navbar-link clickable'
    onClick={props.login}
  >
    Login
  </span>
);

const Logout = props => (
  <span
    className='nav-link port-navbar-link clickable'
    onClick={props.logout}
  >
    Logout
  </span>
);

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      auth0: null
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  static contextType = Auth0Context;

  render() {
    const { isAuthenticated, loginWithPopup, loginWithRedirect, logout } = this.context;
    const { classNameHeader } = this.props;
    const { isOpen } = this.state;
    const menuOpentClass = isOpen ? 'menu-open' : 'menu-close';

    return (
      <div>
        <Navbar
          className={`port-navbar port-nav-base absolute ${classNameHeader} ${menuOpentClass}`}
          color="transparent"
          dark expand="md"
        >
          <NavbarBrand className='port-navbar-brand' href="/">Yurii Donev</NavbarBrand>
          <img className="avatar" src="/static/images/donev_avatar.jpg" alt='full stack developer' />
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className='port-navbar-item'>
                <BsNavLink route='/' title='Home' />
              </NavItem>
              <NavItem className='port-navbar-item'>
                <BsNavLink route='/about' title='About' />
              </NavItem>
              <NavItem className='port-navbar-item'>
                <BsNavLink route='/portfolios' title='Portfolio' />
              </NavItem>
              <NavItem className='port-navbar-item'>
                <BsNavLink route='/cv' title='CV' />
              </NavItem>
              {
                !isAuthenticated &&
                <NavItem className='port-navbar-item'>
                  <Login login={ loginWithRedirect } />
                </NavItem>
              }
              {
                isAuthenticated &&
                <NavItem className='port-navbar-item'>
                  <Logout logout={ logout } />
                </NavItem>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
