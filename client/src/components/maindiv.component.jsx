import React, { Component, useState, useEffect, useRef } from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CourtCell from "./courtcell.component";

class Main extends Component {
    constructor(props) {
        super(props);

        this.selectRef = React.createRef();
        this.state = {

            DIMENSION: 25,
            selectedBox: null,
            height: 0,
            width: 0,
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


        let w = window.innerWidth >= 992 ? this.selectRef.current.clientWidth : this.selectRef.current.clientWidth


        this.setState({ width: w, height: w * 0.9, DIMENSION: w * 0.05 });
    }

    mouseMove = ({ nativeEvent }) => {
    }

    mouseClick = () => {
        console.log(this.state.pixel);
    }

    getCols = (row) => {
        var cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        return cols.map((col) => {
            return <CourtCell key={col + "," + row} x={col} y={row} size={this.state.DIMENSION} />
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
                <MDBRow style={{ padding: 10, justifyContent: "center" }}>
                    <MDBCol sm="12" md="12" lg="9" xl="9" style={{ padding: 10 }}>
                        <div ref={this.selectRef} style={{ width: "100%" }}></div>
                        <div className="court" style={{ width: this.state.width + "px", height: this.state.height + "px", display: "flex" }}>
                            {this.getRows()}
                        </div>
                    </MDBCol>

                </MDBRow>
            </div>
        );
    }
}


export default Main;