/*
Navigation bar component.
*/

import React from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from 'mdbreact';
import LoginButton from './loginbutton.component'
import RegisterButton from './registerbutton.component'
import LogoutButton from './logoutbutton.component';
import ProfileButton from './profilebutton.component'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom'

const NavbarPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const loc = useLocation();

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
        return isLoading ? <></> : isAuthenticated ? <MDBNavbarNav right>
            <MDBNavItem style={{ margin: "auto" }}><strong>Welcome back {user.nickname}!</strong></MDBNavItem>
            <MDBNavItem><ProfileButton /></MDBNavItem>
            <MDBNavItem><LogoutButton /></MDBNavItem>
        </MDBNavbarNav> : <MDBNavbarNav right><MDBNavItem><LoginButton /></MDBNavItem><MDBNavItem><RegisterButton /></MDBNavItem></MDBNavbarNav>
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
                    <MDBNavItem active={loc.pathname === "/"}>
                        <MDBNavLink to={{ pathname: "/", fromNav: true }}>Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active={loc.pathname === "/about"}>
                        <MDBNavLink to="/about">About</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                {getNavButtons()}
            </MDBCollapse>
        </MDBNavbar >
    );
}


export default NavbarPage;