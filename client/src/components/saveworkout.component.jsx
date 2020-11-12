/*
Component for saving a workout to the dataebase.
*/

import React from 'react';
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import { useState } from 'react';
import LoginButton from './loginbutton.component'
import RegisterButton from './registerbutton.component'
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { newWorkout } from '../actions/workoutActions'
import { useEffect } from 'react';

const SaveWorkout = (props) => {

    const { user, isAuthenticated } = useAuth0();
    const [modalNoUser, setModalNoUser] = useState(false);
    const [modalSave, setModalSave] = useState(false);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date())

    /*
    Toggle the visibility of the modal for if no user is logged in.
    */
    const toggleNoUser = () => {
        setModalNoUser(!modalNoUser);
    }

    /*
    Toggle the visibility of the modal for saving the workout.
    */
    const toggleSave = () => {
        setModalSave(!modalSave);
    }

    /*
    Update the state when the description field changes.
    */
    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    /*
    Update the state when the date field changes.
    */
    const onChangeDate = (d) => {
        setDate(d);
    }

    /*
    If the user is editing an existing workout, get the workout data from the redux state.
    */
    useEffect(() => {
        if (!props.isNewWorkout) {
            setDescription(props.workout.description);
            setDate(new Date(props.workout.startdate));
        }
    }, [props.isNewWorkout, props.workout.description, props.workout.startdate])

    /*
    When the form is submitted, check if the shot list is not empty.
    Send a post request to the api with a workout object attached.
    */
    const onSubmit = (e) => {
        e.preventDefault();
        const email = user.email;
        const shotList = props.shotList

        if (shotList.length > 0) {

            if (props.isNewWorkout) {
                axios
                    .post(`${process.env.REACT_APP_API_URL}api/workouts/add`, { email, shotList, startdate: date, description })
                    .then(res => { console.log(res.data) })
                    .catch((err) => { console.log(err); })
                props.clearGrid();
                toggleSave();
            }
            else {
                axios
                    .post(`${process.env.REACT_APP_API_URL}workouts/update/` + props.workoutId, { email, shotList, startdate: date, description })
                    .then(res => { console.log(res.data) })
                    .catch((err) => { console.log(err); })
                props.clearGrid();
                toggleSave();
                props.newWorkout();
            }
        }
    }

    return (
        <div>
            <MDBBtn color="success" size="sm" onClick={isAuthenticated ? toggleSave : toggleNoUser}>Save</MDBBtn>
            <MDBModal isOpen={modalNoUser} toggle={toggleNoUser} >
                <MDBModalHeader toggle={toggleNoUser}>Please log in or register.</MDBModalHeader>
                <MDBModalBody>
                    You must be logged in to save a workout. <br />
                    <LoginButton /><br />
                    Need an account?<br />
                    <RegisterButton />
                </MDBModalBody>
            </MDBModal>
            <MDBModal isOpen={modalSave} toggle={toggleSave} >
                <MDBModalHeader toggle={toggleSave}>Additional Details</MDBModalHeader>
                <MDBModalBody style={{ textAlign: "left" }}>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Description: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={onChangeDescription}
                                placeholder="Description"
                            />
                        </div>
                        <div className="form-group">
                            <label>Date: </label><br />
                            <DatePicker
                                selected={date}
                                onChange={onChangeDate}
                                showTimeSelect
                                dateFormat="Pp"
                            />
                        </div>
                        <MDBBtn color="success" size="sm" type="submit">
                            Save
                    </MDBBtn>
                    </form>
                </MDBModalBody>
            </MDBModal>
        </div>
    )
}

SaveWorkout.propTypes = {
    newWorkout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isNewWorkout: state.workout.isNewWorkout,
    workoutId: state.workout.workoutId,
    workout: state.workout.workout
})


export default connect(mapStateToProps, { newWorkout })(SaveWorkout);