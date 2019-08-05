import React from 'react';
import Link from 'next/link';
import { Link as NextLink } from '../../routes.js';
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

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar className='port-navbar port-default absolute' color="transparent" dark expand="md">
          <NavbarBrand className='port-navbar-brand' href="/">Yurii Donev</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className='port-navbar-item'>
                <Link href='/'>
                  <a className='nav-link port-navbar-link'>Home</a>
                </Link>
              </NavItem>
              <NavItem className='port-navbar-item'>
                <Link href='/about'>
                  <a className='nav-link port-navbar-link'>About</a>
                </Link>
              </NavItem>
              <NavItem className='port-navbar-item'>
                <Link href='/portfolios'>
                  <a className='nav-link port-navbar-link'>Home</a>
                </Link>
              </NavItem>
              <NavItem className='port-navbar-item'>
                <Link href='/cv'>
                  <a className='nav-link port-navbar-link'>CV</a>
                </Link>
              </NavItem>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                Option 1
                  </DropdownItem>
                  <DropdownItem>
                Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}



// import { Fragment } from 'react';
// import Link from 'next/link';
// import { Link as NextLink } from '../../routes.js';
//
// const Index = () => {
//   return (
//     <Fragment>
//       <Link href='/'>
//         <span>Home</span>
//       </Link>
//       <Link href='/about'>
//         <span>About</span>
//       </Link>
//       <Link href='/portfolios'>
//         <span>Portfolios</span>
//       </Link>
//       <Link href='/cv'>
//         <span>CV</span>
//       </Link>
//
//       {/* <NextLink route='test' params={{id: '2'}}><a>Test 2</a></NextLink>
//       <NextLink route='/test/5'><a>Test 5</a></NextLink> */}
//
//     </Fragment>
//   );
// }
//
// export default Index;
