/*
Profile component. This component will the all the user's workouts,
with the ability to edit or delete them. 
*/

import React from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBModal, MDBModalBody, MDBModalHeader, MDBBtn } from 'mdbreact'
import WorkoutListing from './workoutlisting.component'
import { connect } from 'react-redux';
import { deleteWorkout, notDeleteWorkout } from '../actions/deleteAction';
import { set } from 'mongoose';

const Profile = (props) => {
    const { user, isLoading, isAuthenticated } = useAuth0();

    const [workoutList, setWorkoutList] = useState([]);

    /*
    Retrieve workouts that are tied to the logged in user's email.
    Only send the get request after auth0 is done loading.
    */
    useEffect(() => {
        if (!isLoading && user) {
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
    }, [isLoading, user]);


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

    /*
    Toggle the modal for confirming deletion of a workout.
    */
    const toggleDelete = () => {
        props.isDeleting ? props.notDeleteWorkout() : props.deleteWorkout();
    }

    /*
    Delete the workout with the workout id saved in the redux state.
    */
    const confirmDelete = () => {
        axios
            .delete('http://localhost:5000/api/workouts/' + props.deleteId)
            .then((response) => {
                console.log(response.data);
            });

        toggleDelete();
        setWorkoutList(workoutList.filter((el) => el._id !== props.deleteId));
    }

    return (
        <div>
            {!isAuthenticated ? <Redirect to="/" /> :
                <>
                    <MDBRow style={{ padding: 10, justifyContent: "center" }}>
                        <MDBCol sm="12" md="12" lg="6">
                            <div className="list-container" style={{ height: "80vh" }}>
                                <div className="list-header  d-flex">
                                    <h1>My Workouts</h1>
                                </div>
                                <div className="list-list">
                                    {mapWorkoutList()}
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBModal isOpen={props.isDeleting} toggle={toggleDelete} >
                        <MDBModalHeader toggle={toggleDelete}>Confirm Delete</MDBModalHeader>
                        <MDBModalBody >
                            Are you sure you want to delete workout?<br /><br />
                            <MDBBtn size="sm" color="danger" onClick={confirmDelete}>Delete</MDBBtn>
                            <MDBBtn size="sm" color="primary" onClick={toggleDelete}>Cancel</MDBBtn>
                        </MDBModalBody>
                    </MDBModal>
                </>}
        </div>
    )

}

Profile.propTypes = {
    deleteWorkout: PropTypes.func.isRequired,
    notDeleteWorkout: PropTypes.func.isRequired,
    isDeleting: PropTypes.bool,
    deleteId: PropTypes.string
}

const mapStateToProps = state => ({
    isDeleting: state.deleting.isDeleting,
    deleteId: state.deleting.deleteId
})

export default connect(mapStateToProps, { deleteWorkout, notDeleteWorkout })(Profile);