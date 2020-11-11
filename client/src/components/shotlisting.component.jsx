/*
Component for shot listing in the shot list user interface.
*/

import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBBtnGroup } from "mdbreact";
import { getShotPercentClass } from './Utils'

class ShotListing extends Component {

    render() {
        const shot = this.props.shot;

        return (
            <div className="shotlist-item" key={"x" + shot.x + ",y" + shot.y}>
                <MDBContainer>
                    <MDBRow size="12" style={{ width: "100%" }}>
                        <MDBCol style={{ justifyContent: "center", alignItems: "center", margin: "auto" }}>
                            <span className="court-mark" style={{ color: shot.markercolor }}><i className={shot.marker} /></span>
                        </MDBCol>
                        <MDBCol size="9" lg="9">
                            <MDBRow style={{ padding: "5px", alignItems: "center" }}>
                                <span className="shotlist-title">{shot.location} {shot.points}</span>
                                <MDBBtnGroup size="sm" >
                                    <MDBBtn color="danger" onClick={() => this.props.deleteShot(shot)}><i className="fas fa-trash-alt"></i></MDBBtn>
                                </MDBBtnGroup>
                            </MDBRow>
                            <MDBRow style={{ padding: "5px", alignItems: "center" }}>
                                {shot.distance}
                            </MDBRow>
                            <MDBRow style={{ padding: "5px" }}>
                                FGM: {shot.makes} FGA: {shot.attempts} FG%: <span style={{ fontWeight: 500, color: getShotPercentClass(shot.makes / shot.attempts * 100) }}> {shot.attempts > 0 ? (shot.makes / shot.attempts * 100).toFixed(1) + "%" : "0.0%"}</span>
                            </MDBRow>
                            <MDBRow>
                                <MDBBtnGroup size="sm" >
                                    <MDBBtn color="success" onClick={() => this.props.incrementMakes(shot)}>+M</MDBBtn>
                                </MDBBtnGroup>
                                <MDBBtnGroup size="sm" >
                                    <MDBBtn color="primary" onClick={() => this.props.incrementAttempts(shot)}>+A</MDBBtn>
                                </MDBBtnGroup>
                                <MDBBtnGroup size="sm" >
                                    <MDBBtn color="warning" onClick={() => this.props.decrementMakes(shot)}>-M</MDBBtn>
                                </MDBBtnGroup>
                                <MDBBtnGroup size="sm" >
                                    <MDBBtn color="deep-orange" onClick={() => this.props.decrementAttempts(shot)}>-A</MDBBtn>
                                </MDBBtnGroup>
                                <MDBBtnGroup size="sm" >
                                    <MDBBtn className="deep-purple accent-3" onClick={() => this.props.resetShot(shot)}><i className="fas fa-redo"></i></MDBBtn>
                                </MDBBtnGroup>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default ShotListing;