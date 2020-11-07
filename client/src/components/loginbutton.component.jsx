import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { MDBBtn, MDBIcon } from 'mdbreact'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <MDBBtn color="elegant" size="sm" onClick={() => loginWithRedirect()}>
            <MDBIcon icon="sign-in-alt" /> Login
        </MDBBtn>
    )
}

export default LoginButton;