/*
Register button component.
*/

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { MDBBtn, MDBIcon } from 'mdbreact'


const RegisterButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <MDBBtn color="elegant" size="sm" onClick={() => loginWithRedirect({ screen_hint: "signup" })}>
            <MDBIcon icon="user-plus" /> Register
        </MDBBtn>
    )
}

export default RegisterButton;