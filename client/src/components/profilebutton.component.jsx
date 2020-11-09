import React from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact'

const ProfileButton = () => {

    return (
        <MDBBtn color="elegant" size="sm" href="/profile">
            <MDBIcon icon="user" /> Profile
        </MDBBtn>
    )
}

export default ProfileButton;