import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { MDBBtn, MDBIcon } from 'mdbreact'

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <MDBBtn color="elegant" size="sm" onClick={() => logout()}>
            <MDBIcon icon="sign-out-alt" /> Logout
        </MDBBtn>
    )
}

export default LogoutButton;