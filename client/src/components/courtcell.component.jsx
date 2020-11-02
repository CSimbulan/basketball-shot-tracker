import React, { Component } from 'react';

class CourtCell extends Component {
    state = {}

    onCellClick = () => {
        console.log(this.props.y, this.props.x)
    }

    render() {
        return (
            <div className="court-cell" onClick={this.onCellClick} style={{ width: this.props.size + "px", height: this.props.size + "px", border: "1px dashed black", display: "flex" }}></div>
        );
    }
}

export default CourtCell;