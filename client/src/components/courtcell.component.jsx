import React, { Component } from 'react';
import { useSelector } from 'react-redux';

class CourtCell extends Component {
    state = {}

    onCellClick = () => {

        console.log(this.props.y, this.props.x)
    }

    check = () => {
        console.log(this.props.shotList.includes([this.props.x, this.props.y]) ? "X" : null)
    }


    render() {
        return (
            <div className="court-cell"
                onClick={() => this.props.onClick(this.props.x, this.props.y)}
                style={{ width: this.props.size + "px", height: this.props.size + "px", border: "1px dotted black", display: "flex" }}>
                {this.props.shotList.some(e => (e.x === this.props.x && e.y === this.props.y)) ? <span className="court-mark-x">X</span> : ""}
            </div>
        );
    }
}

export default CourtCell;