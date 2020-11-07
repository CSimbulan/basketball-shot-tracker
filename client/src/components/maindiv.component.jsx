import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBBtnGroup, MDBTooltip } from "mdbreact";
import CourtCell from "./courtcell.component";

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
        let cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        return cols.map((col) => {
            return <CourtCell key={col + "," + row} x={col} y={row} size={this.state.DIMENSION} onClick={this.clickCell} shotList={this.state.shotList} />
        })
    }

    getRows = () => {
        let rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        return rows.map((row) => {
            return <div className="court-row" key={row}>{this.getCols(row)}</div>
        })
    }

    clickCell = (x, y) => {
        if (this.state.addingShot && !this.state.shotList.some(e => (e.x === x && e.y === y))) {
            let sL = [...this.state.shotList];
            const [marker, markercolor] = this.generateRandomMarker()
            sL.push({ x: x, y: y, makes: 0, attemps: 0, marker: marker, markercolor: markercolor });
            this.setState({ shotList: sL });
            this.toggleAddingShot()
        }
    }

    generateRandomMarker = () => {

        let symbols = [<i class="fab fa-canadian-maple-leaf"></i>,
        <i class="fas fa-apple-alt"></i>, <i class="fas fa-star"></i>, <i class="far fa-star"></i>, <i class="fas fa-circle"></i>,
        <i class="fas fa-square"></i>, <i class="fas fa-moon"></i>, <i class="fas fa-basketball-ball"></i>, <i class="fas fa-crown"></i>,
        <i class="fas fa-times"></i>, <i class="far fa-gem"></i>];
        let colors = ["red", "royalblue", "gold", "black", "#22ff00", "#32a852", "#f27500", "#640af5", "#0ad2f5", "white", "#f78cff"];
        let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return [randomSymbol, randomColor];
    }

    toggleAddingShot = () => {
        this.setState({ addingShot: !this.state.addingShot })
    }

    clearGrid = () => {
        this.setState({ shotList: [] })
    }

    incrementMakes = (shot) => {
        const newSL = this.state.shotList.map(s =>
            (s.x === shot.x && s.y === shot.y)
                ? { ...s, attemps: shot.attemps + 1, makes: shot.makes + 1 }
                : s
        );
        this.setState({ shotList: newSL })
    }

    incrementAttemps = (shot) => {
        const newSL = this.state.shotList.map(s =>
            (s.x === shot.x && s.y === shot.y)
                ? { ...s, attemps: shot.attemps + 1 }
                : s
        );
        this.setState({ shotList: newSL })
    }

    decrementMakes = (shot) => {
        const newSL = this.state.shotList.map(s =>
            (s.x === shot.x && s.y === shot.y)
                ? { ...s, attemps: shot.attemps > 0 ? shot.attemps - 1 : 0, makes: shot.makes > 0 ? shot.makes - 1 : 0 }
                : s
        );
        this.setState({ shotList: newSL })
    }

    decrementAttemps = (shot) => {
        const newSL = this.state.shotList.map(s =>
            (s.x === shot.x && s.y === shot.y)
                ? { ...s, attemps: shot.attemps > 0 ? shot.attemps > shot.makes ? shot.attemps - 1 : shot.attemps : 0 }
                : s
        );
        this.setState({ shotList: newSL })
    }

    resetShot = (shot) => {
        const newSL = this.state.shotList.map(s =>
            (s.x === shot.x && s.y === shot.y)
                ? { ...s, attemps: 0, makes: 0 }
                : s
        );
        this.setState({ shotList: newSL })
    }

    deleteShot = (shot) => {
        const newSL = this.state.shotList.filter(function (el) {
            if (el.x === shot.x && el.y === shot.y) {
                return;
            }
            else {
                return el;
            }
        });
        this.setState({ shotList: newSL });
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
            return 'black';
        }
    }

    getShots = () => {
        return this.state.shotList.map((shot) => {
            return (
                <div className="shotlist-item" key={"x" + shot.x + ",y" + shot.y}>
                    <MDBContainer>
                        <MDBRow size="12" style={{ width: "100%" }}>
                            <MDBCol style={{ justifyContent: "center", alignItems: "center", margin: "auto" }}>
                                <span className="court-mark" style={{ color: shot.markercolor }}>{shot.marker}</span>
                            </MDBCol>
                            <MDBCol size="9" lg="9">
                                <MDBRow style={{ padding: "5px", alignItems: "center" }}>
                                    x: {shot.x}, y: {shot.y}
                                    <MDBBtnGroup size="sm" >
                                        <MDBBtn color="danger" onClick={() => this.deleteShot(shot)}><i className="fas fa-trash-alt"></i></MDBBtn>
                                    </MDBBtnGroup>
                                </MDBRow>
                                <MDBRow style={{ padding: "5px" }}>
                                    FGM: {shot.makes} FGA: {shot.attemps} FG%: <span style={{ fontWeight: 500, color: this.getShotPercentClass(shot.makes / shot.attemps * 100) }}> {shot.attemps > 0 ? (shot.makes / shot.attemps * 100).toFixed(1) + "%" : "0.0%"}</span>
                                </MDBRow>
                                <MDBRow>
                                    <MDBBtnGroup size="sm" >
                                        <MDBBtn color="success" onClick={() => this.incrementMakes(shot)}>+M</MDBBtn>
                                    </MDBBtnGroup>
                                    <MDBBtnGroup size="sm" >
                                        <MDBBtn color="primary" onClick={() => this.incrementAttemps(shot)}>+A</MDBBtn>
                                    </MDBBtnGroup>
                                    <MDBBtnGroup size="sm" >
                                        <MDBBtn color="warning" onClick={() => this.decrementMakes(shot)}>-M</MDBBtn>
                                    </MDBBtnGroup>
                                    <MDBBtnGroup size="sm" >
                                        <MDBBtn color="deep-orange" onClick={() => this.decrementAttemps(shot)}>-A</MDBBtn>
                                    </MDBBtnGroup>
                                    <MDBBtnGroup size="sm" >
                                        <MDBBtn className="deep-purple accent-3" onClick={() => this.resetShot(shot)}><i class="fas fa-redo"></i></MDBBtn>
                                    </MDBBtnGroup>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            )
        })
    }


    render() {
        return (
            <>
                <div className="container">
                    <MDBRow style={{ padding: 10, justifyContent: "center" }}>
                        <MDBCol sm="12" md="12" lg="8" xl="8" style={{ padding: 10 }}>
                            <div ref={this.selectRef} style={{ width: "100%" }}></div>
                            <div className="court" style={{ width: this.state.width + "px", height: this.state.height + "px", display: "flex" }}>
                                {this.getRows()}
                            </div>
                        </MDBCol>
                        <MDBCol sm="12" md="12" lg="4" xl="4" style={{ padding: 10, alignItems: "center", margin: "auto" }}>
                            <div className="test" style={{ height: this.state.height }}>
                                <div className="test-header  d-flex">
                                    <MDBRow style={{ padding: "1px", justifyContent: "center", alignItems: "center" }}>
                                        <MDBBtn color="primary" size="sm" onClick={this.toggleAddingShot}>{this.state.addingShot ? "Cancel" : "Add Shot"}</MDBBtn>
                                        <MDBBtn color="red" size="sm" onClick={this.clearGrid}>Clear</MDBBtn>
                                        <MDBBtn color="success" size="sm" onClick={this.clearGrid}>Save</MDBBtn>
                                    </MDBRow>
                                </div>
                                <div className="test-list">
                                    {this.getShots()}
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow >
                    <MDBRow style={{ padding: 10, justifyContent: "center" }}>
                    </MDBRow>
                </div>
            </>
        );
    }
}


export default Main;