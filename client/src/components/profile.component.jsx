import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {

    const { user, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            {JSON.stringify(user, null, 2)}
            <h2>{user.user_id}</h2>
            <p>{user.email}</p>
        </div>
    )

}

export default Profile;