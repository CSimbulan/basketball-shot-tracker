import React, { Component, useState, useEffect, useRef } from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CourtCell from "./courtcell.component";

class Main extends Component {
    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();
        this.state = {
            PIXELSIZE: 2,
            DIMENSION: 25,
            REPEATSX: 20,
            REPEATSY: 15,
            selectedBox: null,
            width: 5,
            height: 5,
            pixel: []
        }
    }

    componentDidMount() {

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

    }

    componentDidUpdate() {


    }

    updateWindowDimensions = () => {

        const dim = 25

        this.setState({ width: window.innerWidth, height: window.innerHeight, DIMENSION: dim });
    }

    mouseMove = ({ nativeEvent }) => {
    }

    mouseClick = () => {
        console.log(this.state.pixel);
    }

    getCols = (row) => {
        var cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        return cols.map((col) => {
            return <CourtCell key={col + "," + row} x={col} y={row} />
        })
    }

    getRows = () => {
        var rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        return rows.map((row) => {
            return <div className="court-row" key={row}>{this.getCols(row)}</div>
        })
    }


    render() {
        return (
            <div className="container">
                <h1>Hello Worlds</h1>
                <div className="court" style={{ width: "1000px", height: "900px", display: "flex" }}>
                    {this.getRows()}
                </div>
            </div>
        );
    }
}


export default Main;