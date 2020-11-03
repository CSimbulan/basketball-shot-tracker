import React, { Component, useState, useEffect, useRef } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import CourtCell from "./courtcell.component";
import { useSelector } from 'react-redux';

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

    componentDidMount() {

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

    }

    updateWindowDimensions = () => {
        let w = window.innerWidth >= 992 ? this.selectRef.current.clientWidth : this.selectRef.current.clientWidth
        this.setState({ width: w * 0.995, height: w * (2550 / 2850), DIMENSION: w * (1 / 19) });
    }

    getCols = (row) => {
        var cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        return cols.map((col) => {
            return <CourtCell key={col + "," + row} x={col} y={row} size={this.state.DIMENSION} onClick={this.clickCell} shotList={this.state.shotList} />
        })
    }

    getRows = () => {
        var rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        return rows.map((row) => {
            return <div className="court-row" key={row}>{this.getCols(row)}</div>
        })
    }

    clickCell = (x, y) => {
        if (this.state.addingShot && !this.state.shotList.some(e => (e.x === x && e.y === y))) {
            var sL = [...this.state.shotList];
            sL.push({ x: x, y: y, makes: 0, attemps: 0 });
            this.setState({ shotList: sL });
            this.toggleAddingShot()
        }
    }

    toggleAddingShot = () => {
        this.setState({ addingShot: !this.state.addingShot })
    }

    clearGrid = () => {
        this.setState({ shotList: [] })
    }


    render() {
        return (
            <>

                <div className="container">
                    <h1>Hello Worlds</h1>
                    <MDBRow style={{ padding: 10, justifyContent: "center" }}>
                        <MDBCol sm="12" md="12" lg="9" xl="9" style={{ padding: 10 }}>
                            <div ref={this.selectRef} style={{ width: "100%" }}></div>
                            <div className="court" style={{ width: this.state.width + "px", height: this.state.height + "px", display: "flex" }}>
                                {this.getRows()}
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ padding: 10, justifyContent: "center" }}>
                        <MDBBtn color="primary" onClick={this.toggleAddingShot}>Adding Shot: {String(this.state.addingShot)}</MDBBtn><MDBBtn color="red" onClick={this.clearGrid}>Clear</MDBBtn>
                    </MDBRow>
                </div>
            </>
        );
    }
}


export default Main;