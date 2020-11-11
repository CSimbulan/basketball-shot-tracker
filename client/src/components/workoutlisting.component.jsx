/*
Component for an individual workout listing in the profile page.
*/

import React, { useRef } from 'react';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { useEffect } from 'react';
import { useState } from 'react';

const WorkoutListing = (props) => {

    const selectRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);
    }, [])


    const updateWindowDimensions = () => {
        if (selectRef.current) {
            let w = selectRef.current.clientWidth;
            setWidth(w);
            setHeight(w * (2550 / 2850));
            console.log(w);
        }

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
    This function formats dates from a Date object to "Month Day, Year TT:TT".
    */
    const formatDate = (rawDate) => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        /*
        Add a zero to the time if it's only a single digit.
        Example: 9:10 becomes 09:10.
        */
        function appendLeadingZeroes(n) {
            if (n <= 9) {
                return "0" + n;
            }
            return n;
        }

        /*
        Covert 24 hour time to 12 hour time and add AM or PM.
        */
        function formatHour(n) {
            let c = n >= 12 ? "PM" : "AM";
            let x = n % 12;
            if (x === 0) {
                x += 12;
            }
            return [x, c];
        }

        let d = new Date(rawDate);
        let hour = formatHour(d.getHours());

        /*
        Create string for formatted date.
        */
        let formatted_date =
            months[d.getMonth()] +
            " " +
            d.getDate() +
            ", " +
            d.getFullYear() +
            " " +
            appendLeadingZeroes(hour[0]) +
            ":" +
            appendLeadingZeroes(d.getMinutes()) +
            " " +
            hour[1];
        return formatted_date;
    };

    /*
    Map shots in the shot list to markers on the court image.
    */
    const mapShots = () => {
        return (
            props.workout.shotList.map((shot) => {
                return (<span className="court-mark-profile" style={{ color: shot.markercolor, position: "absolute", left: shot.x * 97 / 19 + "%", top: shot.y * 97 / 17 + "%" }}><i className={shot.marker} /></span>)
            })
        )
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
                <MDBCol size="8" md="8" lg="8" lg="8" style={{ alignItems: "center", margin: "auto", padding: 0 }}>
                    <div style={{ textAlign: "left", justifyContent: "left" }}>
                        <strong>Workout Date:</strong> {formatDate(props.workout.startdate)}<br />
                        <strong>Description:</strong> {props.workout.description}<br />
                        <strong>Close Range:</strong> {getRange(props.workout.shotList, "Close Range")}<br />
                        <strong>Mid Range:</strong> {getRange(props.workout.shotList, "Mid Range")}<br />
                        <strong>Long Range:</strong> {getRange(props.workout.shotList, "Long Range")}<br />
                        <strong>Total:</strong> {getRange(props.workout.shotList, "all")}<br />
                        <MDBBtn size="sm" color="success">View</MDBBtn>
                        <MDBBtn size="sm" color="danger">Delete</MDBBtn>
                    </div>
                </MDBCol>
            </MDBRow>
        </div >
    )
}

export default WorkoutListing;