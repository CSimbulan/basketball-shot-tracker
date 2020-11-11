/*
Navigation bar component.
*/

import React from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from 'mdbreact';
import LoginButton from './loginbutton.component'
import RegisterButton from './registerbutton.component'
import LogoutButton from './logoutbutton.component';
import ProfileButton from './profilebutton.component'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react';

const NavbarPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, isLoading } = useAuth0();

    /*
    Toggle the collapsing/dropdown when the nav bar resizes for smaller screens.
    */
    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    }

    /*
    Render different buttons depending on whether a user is logged in or not.
    If there is no user, render login and register buttons.
    If a user is logged in, render profile and logout buttons.
    */
    const getNavButtons = () => {
        return isLoading ? <></> : isAuthenticated ? <div><ProfileButton /><LogoutButton /></div> : <div><LoginButton /><RegisterButton /></div>
    }

    return (
        <MDBNavbar className="peach-gradient" light expand="md">
            <MDBNavbarBrand>
                <img
                    src={process.env.PUBLIC_URL + "favicon.ico"}
                    alt="logo"
                    height="45px"
                    width="45px"
                ></img>{" "}
                <strong className="black-text">Basketball Shot Tracker</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem active>
                        <MDBNavLink to="/">Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="/">Features</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="/">Pricing</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                                <div className="d-none d-md-inline">Dropdown</div>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className="dropdown-default">
                                <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                                <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        {getNavButtons()}
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    );
}


export default NavbarPage;