import React, { Component, useState, useEffect, useRef } from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import useWindowDimensions from "./dimensions.component";

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

        const canvas = this.canvasRef.current;
        const canvasHeight = this.state.DIMENSION * this.state.REPEATSY * this.state.PIXELSIZE;
        const canvasWidth = this.state.DIMENSION * this.state.REPEATSX * this.state.PIXELSIZE;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const context = canvas.getContext("2d")

        context.strokeStyle = '#cccccc';
        for (let i = 0; i <= this.state.DIMENSION * this.state.REPEATSX; ++i) {
            if (i % this.state.DIMENSION != 0) { continue; }
            let x = i * this.state.PIXELSIZE;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvasHeight);
            context.stroke();

            let y = i * this.state.PIXELSIZE;
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvasWidth, y);
            context.stroke();
        }
    }

    componentDidUpdate() {
        const canvas = this.canvasRef.current;
        const canvasHeight = this.state.DIMENSION * this.state.REPEATSY * this.state.PIXELSIZE;
        const canvasWidth = this.state.DIMENSION * this.state.REPEATSX * this.state.PIXELSIZE;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const context = canvas.getContext("2d")

        context.strokeStyle = '#cccccc';
        for (let i = 0; i <= this.state.DIMENSION * this.state.REPEATSX; ++i) {
            if (i % this.state.DIMENSION != 0) { continue; }
            let x = i * this.state.PIXELSIZE;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvasHeight);
            context.stroke();

            let y = i * this.state.PIXELSIZE;
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvasWidth, y);
            context.stroke();
        }
    }

    updateWindowDimensions = () => {
        console.log(window.innerWidth, window.innerHeight);
        const dim = 25
        console.log(dim);
        this.setState({ width: window.innerWidth, height: window.innerHeight, DIMENSION: dim });
    }

    mouseMove = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        const canvas = this.canvasRef.current;

        let pixel = [Math.floor(offsetX / (this.state.PIXELSIZE * this.state.DIMENSION)), Math.floor(offsetY / (this.state.PIXELSIZE * this.state.DIMENSION))];
        this.setState({ pixel: pixel })
        if (pixel[0] < 0 || pixel[1] < 0 ||
            pixel[0] >= this.state.REPEATSX || pixel[1] >= this.state.REPEATSY) {
            return;
        }

        var mouseX = offsetX * canvas.width / canvas.clientWidth | 0;
        var mouseY = offsetY * canvas.height / canvas.clientHeight | 0;
        console.log(canvas.clientWidth, canvas.clientHeight);
    }

    mouseClick = () => {
        console.log(this.state.pixel);
    }

    render() {
        return (
            <>
                <h1>Hello Worlds</h1>
                <div id="mycanvasWrapper" style={{ position: "relative", textAlign: "center", width: 2 * 20 * 25 }}>
                    <div onClick={this.mouseClick} style={{
                        width: this.state.DIMENSION * this.state.PIXELSIZE - 2, height: this.state.DIMENSION * this.state.PIXELSIZE - 2, position: "absolute",
                        left: this.state.pixel[0] * this.state.PIXELSIZE * this.state.DIMENSION + 2,
                        top: this.state.pixel[1] * this.state.PIXELSIZE * this.state.DIMENSION + 2,
                        backgroundColor: "black",
                        zIndex: 2,
                        opacity: 0.5
                    }}></div>
                    <canvas ref={this.canvasRef} id="canvas" onMouseMove={this.mouseMove} style={{ position: "relative", zIndex: 1, border: "1px solid black", backgroundImage: "url('https://www.neavegroup.com/wp-content/uploads/sites/8/2013/06/basketball-court-layout.jpg')" }}>
                    </canvas>
                </div>
            </>
        );
    }
}


export default Main;