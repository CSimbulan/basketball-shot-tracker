/*
This is the main component where users create a workout.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import CourtCell from "./courtcell.component";
import ShotListing from "./shotlisting.component"
import SaveWorkout from "./saveworkout.component"
import { generateRandomMarker, getShotClassifications } from "./Utils"
import { connect } from 'react-redux';
import { viewWorkout } from '../actions/workoutActions';

class Main extends Component {
    constructor(props) {
        super(props);

        this.selectRef = React.createRef();
        this.state = {
            addingShot: false,
            height: 0,
            width: 0,
            shotList: [],
            pixel: []
        }
    }

    /*
    When the component mounts, add an event listener to check for window resizing.
    The resizing is used to calculate the size of the court.
    */
    componentDidMount() {
        this.props.workoutId ? this.setState({ shotList: this.props.workout.shotList }) : void (0);
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    /*
    Remove the event listener when component unmounts.
    */
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    /*
    Resize the court based on the size of the window.
    Use the breakpoints for MDBReact's "large" size.
    The court image has a 10:9 width:height ratio.
    Divide the width into 19 equal squares.
    */
    updateWindowDimensions = () => {
        let w = window.innerWidth >= 992 ? this.selectRef.current.clientWidth : this.selectRef.current.clientWidth
        this.setState({ width: w * 0.995, height: w * (2550 / 2850), DIMENSION: w * (1 / 19) });
    }

    /*
    Divide the width of the court into 19 equal columns.
    Each cell in the grid is mapped to a CourtCell component.
    */
    getCols = (row) => {
        let cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        return cols.map((col) => {
            return <CourtCell key={col + "," + row} x={col} y={row} size={this.state.DIMENSION} onClick={this.clickCell} shotList={this.state.shotList} />
        })
    }

    /*
    Divide the height of the court into 17 equal rows.
    */
    getRows = () => {
        let rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        return rows.map((row) => {
            return <div className="court-row" key={row}>{this.getCols(row)}</div>
        })
    }

    /*
    If the user is adding a shot to the workout and clicks on a cell,
    create a new shot object, assign it the x and y values of the cell,
    a random marker and color combination, then determine the classification of the shot.
    Add the shot object to the shot list in the state.
    */
    clickCell = (x, y) => {
        if (this.state.addingShot && !this.state.shotList.some(e => (e.x === x && e.y === y))) {
            let sL = [...this.state.shotList];
            const [marker, markercolor] = generateRandomMarker();
            const [distance, location, points] = getShotClassifications(x, y);
            sL.push({ x, y, makes: 0, attempts: 0, marker, markercolor, distance, location, points });
            this.setState({ shotList: sL });
            this.toggleAddingShot()
        }
    }



    /*
    Toggle the state based on whether the user wants to add a shot or not
    when clicking on the grid.
    */
    toggleAddingShot = () => {
        this.setState({ addingShot: !this.state.addingShot })
    }

    /*
    Clear all shots off the grid.
    */
    clearGrid = () => {
        this.setState({ shotList: [] })
    }

    /*
    Increment amount of makes and for a given shot.
    Number of attempts is also incremented.
    */
    incrementMakes = (shot) => {
        const newSL = this.state.shotList.map(s =>
            (s.x === shot.x && s.y === shot.y)
                ? { ...s, attempts: shot.attempts + 1, makes: shot.makes + 1 }
                : s
        );
        this.setState({ shotList: newSL })
    }


    /*
    Increment amount of attempts for a given shot.
    */
    incrementAttempts = (shot) => {
        const newSL = this.state.shotList.map(s =>
            (s.x === shot.x && s.y === shot.y)
                ? { ...s, attempts: shot.attempts + 1 }
                : s
        );
        this.setState({ shotList: newSL })
    }

    /*
    Decrement amount of makes and for a given shot.
    Number of attempts is also decremented.
    */
    decrementMakes = (shot) => {
        const newSL = this.state.shotList.map(s =>
            (s.x === shot.x && s.y === shot.y)
                ? { ...s, attempts: shot.attempts > 0 ? shot.attempts - 1 : 0, makes: shot.makes > 0 ? shot.makes - 1 : 0 }
                : s
        );
        this.setState({ shotList: newSL })
    }

    /*
    Decrement amount of attempts for a given shot.
    */
    decrementAttempts = (shot) => {
        const newSL = this.state.shotList.map(s =>
            (s.x === shot.x && s.y === shot.y)
                ? { ...s, attempts: shot.attempts > 0 ? shot.attempts > shot.makes ? shot.attempts - 1 : shot.attempts : 0 }
                : s
        );
        this.setState({ shotList: newSL })
    }

    /*
    Reset the number of makes and attempts for a given shot.
    */
    resetShot = (shot) => {
        const newSL = this.state.shotList.map(s =>
            (s.x === shot.x && s.y === shot.y)
                ? { ...s, attempts: 0, makes: 0 }
                : s
        );
        this.setState({ shotList: newSL })
    }

    /*
    Remove a specific shot from the grid.
    */
    deleteShot = (shot) => {
        const newSL = this.state.shotList.filter(function (el) {
            if (el.x === shot.x && el.y === shot.y) {
                return void (0);
            }
            else {
                return el;
            }
        });
        this.setState({ shotList: newSL });
    }

    /*
    Map the shots in the shot list to a ShotListing component.
    */
    getShots = () => {
        return this.state.shotList.map((shot) => {
            return (
                <ShotListing shot={shot}
                    key={shot.x + "," + shot.y}
                    incrementAttempts={this.incrementAttempts}
                    decrementAttempts={this.decrementAttempts}
                    incrementMakes={this.incrementMakes}
                    decrementMakes={this.decrementMakes}
                    deleteShot={this.deleteShot}
                    resetShot={this.resetShot}
                />
            )
        })
    }

    render() {
        return (
            <>
                <div className="container">
                    <MDBRow style={{ padding: 10, justifyContent: "center" }}>
                        <MDBCol sm="12" md="12" lg="8" xl="8" style={{ padding: 10 }}>
                            <div ref={this.selectRef} style={{ width: "100%" }}></div>
                            <div className="court" style={{ width: this.state.width + "px", height: this.state.height + "px", display: "flex" }}>
                                {this.getRows()}
                            </div>
                        </MDBCol>
                        <MDBCol sm="12" md="12" lg="4" xl="4" style={{ padding: 10, alignItems: "center", margin: "auto" }}>
                            <div className="list-container" style={{ height: this.state.height }}>
                                <div className="list-header  d-flex">
                                    <MDBRow style={{ padding: "1px", justifyContent: "center", alignItems: "center" }}>
                                        <MDBBtn color="primary" size="sm" onClick={this.toggleAddingShot}>{this.state.addingShot ? "Cancel" : "Add Shot"}</MDBBtn>
                                        <MDBBtn color="red" size="sm" onClick={this.clearGrid}>Clear</MDBBtn>
                                        <SaveWorkout shotList={this.state.shotList} clearGrid={this.clearGrid} />
                                    </MDBRow>
                                </div>
                                <div className="list-list">
                                    {this.getShots()}
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow >
                    <MDBRow style={{ padding: 10, justifyContent: "center" }}>
                    </MDBRow>
                </div>
            </>
        );
    }
}

Main.propTypes = {
    viewWorkout: PropTypes.func.isRequired,
    workoutId: PropTypes.string
}

const mapStateToProps = state => ({
    isNewWorkout: state.workout.isNewWorkout,
    workoutId: state.workout.workoutId,
    workout: state.workout.workout
})

export default connect(mapStateToProps, { viewWorkout })(Main);