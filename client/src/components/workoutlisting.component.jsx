/*
Component for an individual workout listing in the profile page.
*/

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { viewWorkout } from '../actions/workoutActions';
import { deleteWorkout } from '../actions/deleteAction';
import { formatDate } from './Utils';
import { withRouter } from 'react-router-dom';


const WorkoutListing = (props) => {

    const selectRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);

        return () => {
            window.removeEventListener('resize', updateWindowDimensions);
        }
    }, [])


    const updateWindowDimensions = () => {
        let w = selectRef.current.clientWidth;
        setWidth(w);
        setHeight(w * (2550 / 2850));
    }


    /*
    Get the makes/attempts for short, mid, and long range shots in the shot list.
    */
    const getRange = (w, range) => {
        var makes = 0;
        var attempts = 0;
        var shot;
        for (shot of w) {
            if (shot.distance === range || range === "all") {
                makes += shot.makes;
                attempts += shot.attempts;
            }
        }
        const percent = attempts > 0 ? (makes / attempts * 100).toFixed(1) : 0.0;
        return makes + "/" + attempts + " (" + percent + "%)";
    }

    /*
    Map shots in the shot list to markers on the court image.
    */
    const mapShots = () => {
        return (
            props.workout.shotList.map((shot) => {
                return (<span key={shot._id} className="court-mark-profile" style={{ color: shot.markercolor, position: "absolute", left: shot.x * 97 / 19 + "%", top: shot.y * 97 / 17 + "%" }}><i className={shot.marker} /></span>)
            })
        )
    }

    const viewWorkout = () => {
        props.viewWorkout(String(props.workout._id), props.workout);
        props.history.push("/view");
    }

    return (
        <div className="shotlist-item">
            <MDBRow size="12" style={{ width: "100%" }}>
                <MDBCol size="4" lg="4" style={{ justifyContent: "center", alignItems: "center", margin: "auto" }}>
                    <div ref={selectRef} style={{ width: "100%" }}></div>
                    <div style={{ width: width, height: height, backgroundImage: 'url("/assets/court2.png")', backgroundSize: "cover", position: "relative", overflow: "hidden" }}>
                        {mapShots()}
                    </div>
                </MDBCol>
                <MDBCol size="8" md="8" style={{ alignItems: "center", margin: "auto", padding: 0 }}>
                    <div style={{ textAlign: "left", justifyContent: "left" }}>
                        <strong>Workout Date:</strong> {formatDate(props.workout.startdate)}<br />
                        <strong>Description:</strong> {props.workout.description}<br />
                        <strong>Close Range:</strong> {getRange(props.workout.shotList, "Close Range")}<br />
                        <strong>Mid Range:</strong> {getRange(props.workout.shotList, "Mid Range")}<br />
                        <strong>Long Range:</strong> {getRange(props.workout.shotList, "Long Range")}<br />
                        <strong>Total:</strong> {getRange(props.workout.shotList, "all")}<br />
                        <MDBBtn size="sm" color="success" onClick={viewWorkout}>View</MDBBtn>
                        <MDBBtn size="sm" color="danger" onClick={() => props.deleteWorkout(String(props.workout._id))}>Delete</MDBBtn>
                    </div>
                </MDBCol>
            </MDBRow>
        </div >
    )
}
WorkoutListing.propTypes = {
    viewWorkout: PropTypes.func.isRequired,
    deleteWorkout: PropTypes.func.isRequired
}

export default withRouter(connect(null, { deleteWorkout, viewWorkout })(WorkoutListing));