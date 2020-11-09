/*
Profile component. This component will the all the user's workouts,
with the ability to edit or delete them. 
*/

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from "react-router-dom";

const Profile = () => {

    const { user, isLoading, isAuthenticated } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            {!isAuthenticated ? <Redirect to="/" /> :
                <>{JSON.stringify(user, null, 2)}
                    <h2>{user.user_id}</h2>
                    <p>{user.email}</p></>}
        </div>
    )

}

export default Profile;