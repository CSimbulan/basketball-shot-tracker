import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBBtnGroup } from "mdbreact";

class ShotListing extends Component {
    state = {}

    getShotPercentClass = (percentage) => {

        if (percentage >= 100) {
            return 'royalblue';
        }
        else if (percentage >= 80) {
            return '#4287f5';
        }
        else if (percentage >= 50) {
            return 'green';
        }
        else if (percentage >= 33) {
            return '#fc7b03';
        }
        else if (percentage < 80) {
            return 'red';
        }
        else {
            return 'black';
        }
    }

    render() {
        const shot = this.props.shot;

        return (
            <div className="shotlist-item" key={"x" + shot.x + ",y" + shot.y}>
                <MDBContainer>
                    <MDBRow size="12" style={{ width: "100%" }}>
                        <MDBCol style={{ justifyContent: "center", alignItems: "center", margin: "auto" }}>
                            <span className="court-mark" style={{ color: shot.markercolor }}>{shot.marker}</span>
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
                                FGM: {shot.makes} FGA: {shot.attemps} FG%: <span style={{ fontWeight: 500, color: this.getShotPercentClass(shot.makes / shot.attemps * 100) }}> {shot.attemps > 0 ? (shot.makes / shot.attemps * 100).toFixed(1) + "%" : "0.0%"}</span>
                            </MDBRow>
                            <MDBRow>
                                <MDBBtnGroup size="sm" >
                                    <MDBBtn color="success" onClick={() => this.props.incrementMakes(shot)}>+M</MDBBtn>
                                </MDBBtnGroup>
                                <MDBBtnGroup size="sm" >
                                    <MDBBtn color="primary" onClick={() => this.props.incrementAttemps(shot)}>+A</MDBBtn>
                                </MDBBtnGroup>
                                <MDBBtnGroup size="sm" >
                                    <MDBBtn color="warning" onClick={() => this.props.decrementMakes(shot)}>-M</MDBBtn>
                                </MDBBtnGroup>
                                <MDBBtnGroup size="sm" >
                                    <MDBBtn color="deep-orange" onClick={() => this.props.decrementAttemps(shot)}>-A</MDBBtn>
                                </MDBBtnGroup>
                                <MDBBtnGroup size="sm" >
                                    <MDBBtn className="deep-purple accent-3" onClick={() => this.props.resetShot(shot)}><i class="fas fa-redo"></i></MDBBtn>
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