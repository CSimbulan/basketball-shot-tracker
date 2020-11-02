import React, { Component } from 'react';

class CourtCell extends Component {
    state = {}

    onCellClick = () => {
        console.log(this.props.y, this.props.x)
    }

    render() {
        return (
            <div className="court-cell" onClick={this.onCellClick} style={{ width: "50px", height: "50px", border: "1px dashed black", display: "flex" }}></div>
        );
    }
}

export default CourtCell;