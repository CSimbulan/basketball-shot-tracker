/*
This is the component for an inidividual cell in the court grid.
*/

import React, { Component } from 'react';
import { MDBTooltip } from 'mdbreact';
import { getShotPercentClass } from './Utils'

class CourtCell extends Component {

    render() {
        const thisShot = this.props.shotList.find(e => (e.x === this.props.x && e.y === this.props.y))
        return (
            <div className="court-cell"
                onClick={() => this.props.onClick(this.props.x, this.props.y)}
                style={{ width: this.props.size + "px", height: this.props.size + "px", border: "1px dotted black", display: "flex" }}>
                {this.props.shotList.some(e => (e.x === this.props.x && e.y === this.props.y)) ? <MDBTooltip clickable domElement placement="top">
                    <span className="court-mark" style={{ color: thisShot.markercolor }}>
                        <i className={thisShot.marker} />
                    </span>
                    <div className="t2a">
                        {thisShot.makes} / {thisShot.attempts}<br></br>
                        <span style={{ fontWeight: 500, color: getShotPercentClass(thisShot.makes / thisShot.attempts * 100, "white") }}>
                            {thisShot.attempts > 0 ? (thisShot.makes / thisShot.attempts * 100).toFixed(1) + "%" : "0.0%"}
                        </span>
                    </div>
                </MDBTooltip> : ""}
            </div>
        );
    }
}

export default CourtCell;