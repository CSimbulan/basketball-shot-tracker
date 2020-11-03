import React, { Component } from 'react';
import { MDBTooltip } from 'mdbreact';

class CourtCell extends Component {
    state = {}

    onCellClick = () => {

        console.log(this.props.y, this.props.x)
    }

    check = () => {
        console.log(this.props.shotList.includes([this.props.x, this.props.y]) ? "X" : null)
    }

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
            return 'white';
        }
    }


    render() {
        const thisShot = this.props.shotList.find(e => (e.x === this.props.x && e.y === this.props.y))
        return (
            <div className="court-cell"
                onClick={() => this.props.onClick(this.props.x, this.props.y)}
                style={{ width: this.props.size + "px", height: this.props.size + "px", border: "1px dotted black", display: "flex" }}>
                {this.props.shotList.some(e => (e.x === this.props.x && e.y === this.props.y)) ? <MDBTooltip clickable domElement placement="top">
                    <span className="court-mark" style={{ color: thisShot.markercolor }}>
                        {thisShot.marker}
                    </span>
                    <div className="t2a">
                        {thisShot.makes} / {thisShot.attemps}<br></br>
                        <span style={{ fontWeight: 500, color: this.getShotPercentClass(thisShot.makes / thisShot.attemps * 100) }}>
                            {thisShot.attemps > 0 ? (thisShot.makes / thisShot.attemps * 100).toFixed(1) + "%" : "0.0%"}
                        </span>
                    </div>
                </MDBTooltip> : ""}
            </div>
        );
    }
}

export default CourtCell;