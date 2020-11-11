/*
Profile component. This component will the all the user's workouts,
with the ability to edit or delete them. 
*/

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { MDBRow, MDBCol } from 'mdbreact'
import WorkoutListing from './workoutlisting.component'

const Profile = (props) => {
    const { user, isLoading, isAuthenticated } = useAuth0();

    const [workoutList, setWorkoutList] = useState([]);

    /*
    Retrieve workouts that are tied to the logged in user's email.
    Only send the get request after auth0 is done loading.
    */
    useEffect(() => {
        if (!isLoading) {
            axios
                .get(`http://localhost:5000/api/workouts/query`, {
                    params: {
                        userEmail: user.email,
                    },
                })
                .then((response) => {
                    setWorkoutList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [isLoading]);


    /*
    If auth0 is still loading, render a loading screen.
    */
    if (isLoading) {
        return <div>Loading ...</div>;
    }

    /*
    Map the workouts in the workout list to a workout listing component.
    */
    const mapWorkoutList = () => {
        return workoutList.map((w) => {
            return (<WorkoutListing workout={w} />)
        })
    }

    return (
        <div>
            {!isAuthenticated ? <Redirect to="/" /> :
                <>

                    <br />
                    <MDBRow style={{ padding: 10, justifyContent: "center" }}>
                        <MDBCol sm="12" md="12" lg="6">
                            <div className="list-container" style={{ height: "100vh" }}>
                                <div className="list-header  d-flex">
                                    <h1>My Workouts</h1>
                                </div>
                                <div className="list-list">
                                    {mapWorkoutList()}
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </>}
        </div>
    )

}

export default Profile;