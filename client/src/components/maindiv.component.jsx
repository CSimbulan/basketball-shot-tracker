import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import CourtCell from "./courtcell.component";
import ShotListing from "./shotlisting.component"

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
            const [marker, markercolor] = this.generateRandomMarker();
            const [distance, location, points] = this.getShotClassifications(x, y);
            sL.push({ x, y, makes: 0, attemps: 0, marker, markercolor, distance, location, points });
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
                return void (0);
            }
            else {
                return el;
            }
        });
        this.setState({ shotList: newSL });
    }

    getShots = () => {
        return this.state.shotList.map((shot) => {
            return (
                <ShotListing shot={shot}
                    incrementAttemps={this.incrementAttemps}
                    decrementAttemps={this.decrementAttemps}
                    incrementMakes={this.incrementMakes}
                    decrementMakes={this.decrementMakes}
                    deleteShot={this.deleteShot}
                    resetShot={this.resetShot}
                />
            )
        })
    }

    getShotClassifications = (x, y) => {
        // Bounds for shots in the paint.
        if (x >= 7 && x <= 11) {
            if (y >= 0 && y <= 7) {
                return ["Close Range", "Paint", "2PT"];
            }
            else if (y >= 8 && y <= 10) {
                return ["Mid Range", "Top of the Key", "2PT"]
            }
            else if (y >= 11 && y <= 13) {
                return ["Long Range", "Top of the Key", "3PT"]
            }
        }
        if ((x >= 2 && x <= 6) || (x >= 12 && x <= 16)) {
            // Bounds for short corner jumper.
            if (y >= 0 && y <= 3) {
                return ["Mid Range", "Short Corner", "2PT"];
            }
            // Bounds for mid range elbow.
            else if (((y === 4 || y === 5) && ((x >= 2 & x <= 6) || (x >= 12 && x <= 16))) || ((y === 6 || y === 7) && ((x >= 3 & x <= 6) || (x >= 12 && x <= 15))) ||
                (y === 8 && ((x >= 4 & x <= 6) || (x >= 12 && x <= 14))) || (y === 9 && ((x >= 5 & x <= 6) || (x >= 12 && x <= 13)))) {
                return ["Mid Range", "Elbow", "2PT"];
            }
        }
        if ((x >= 0 && x <= 6) || (x >= 12 && x <= 18)) {
            //Bounds for corner three pointers.
            if ((y >= 0 && y <= 3) && (x === 0 || x === 1 || x === 17 || x === 18)) {
                return ["Long Range", "Corner", "3PT"]
            }
            //Bounds for elbow three pointers.
            if (((y === 4 || y === 5) && ((x >= 0 & x <= 1) || (x >= 17 && x <= 18))) || ((y === 6 || y === 7) && ((x >= 0 & x <= 2) || (x >= 16 && x <= 18))) ||
                (y === 8 && ((x >= 0 & x <= 3) || (x >= 15 && x <= 18))) || (y === 9 && ((x >= 0 & x <= 4) || (x >= 14 && x <= 18))) ||
                (y >= 10 && y <= 13)) {
                return ["Long Range", "Elbow", "3PT"];
            }
        }
        if (y >= 14) {
            return ["Long Range", "Half Court", "3PT"];
        }
        return ["?", "?", "?"];
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