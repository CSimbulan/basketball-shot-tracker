/*
Component for line chart displaying shot percentages.
*/
import React from 'react';
import { useState } from 'react';
import { Line } from 'react-chartjs-2'

const ShotLineChart = (props) => {

    /*
    Create an array with 12 values, one for each month.
    */
    const [shotData, setShotData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [shotType, setShotType] = useState("")

    const chartData = {
        dataLine: {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
            datasets: [
                {
                    label: shotType + " %",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(184, 185, 210, .3)",
                    borderColor: "rgb(35, 26, 136)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(35, 26, 136)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: shotData
                }
            ]
        }
    };

    /*
    When a different shot is selected, check through all the workouts for shots of that type.
    Then check the month of the workout and the makes/attempts to the correct index.
    Calculate the percentage for each month and set that array to the state.
    */
    const onSelectChange = (e) => {
        const st = e.target.value;
        setShotType(st);
        var makes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var attempts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var percents = [];
        var workout, shot;


        if (props.workoutList && props.workoutList.length > 0) {
            for (workout of props.workoutList) {
                for (shot of workout.shotList) {
                    if (shot.distance === st || st === "Total" || shot.location === st || shot.points === st || (st === "Elbow 2PT" && shot.points === "2PT" && shot.location === "Elbow") ||
                        (st === "Top of the Key 2PT" && shot.points === "2PT" && shot.location === "Top of the Key") || (st === "Elbow 3PT" && shot.points === "3PT" && shot.location === "Elbow") ||
                        (st === "Top of the Key 3PT" && shot.points === "3PT" && shot.location === "Top of the Key")) {
                        let m = new Date(workout.startdate).getMonth();
                        makes[m] += shot.makes;
                        attempts[m] += shot.attempts;
                    }
                }
            }
            for (var i = 0; i < makes.length; i++) {
                percents.push(attempts[i] > 0 ? parseFloat((makes[i] / attempts[i] * 100).toFixed(1)) : 0.0)
            }
            setShotData(percents);
        }

    }

    return (
        <>
            <select className="form-control" onChange={onSelectChange}>
                <option value="" selected disabled hidden>Select Shot Type</option>
                <option value="Total">Total</option>
                <option value="Close Range">Close Range</option>
                <option value="Mid Range">Mid Range</option>
                <option value="Long Range">Long Range</option>
                <option value="2PT">2 Pointers</option>
                <option value="3PT">3 Pointers</option>
                <option value="Paint">Shots in the Paint</option>
                <option value="Short Corner">Short Corner</option>
                <option value="Elbow 2PT">Elbow 2 Pointers</option>
                <option value="Top of the Key 2PT">Top of the Key 2 Pointers</option>
                <option value="Corner">Corner 3 Pointers</option>
                <option value="Elbow 3PT">Elbow 3 Pointers</option>
                <option value="Top of the Key 3PT">Top of the Key 3 Pointers</option>
                <option value="Half Court">Half Court</option>
            </select>
            <br></br>
            <Line data={chartData.dataLine} options={{
                responsive: true,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                max: 100
                            },
                        },
                    ],
                },
            }} />
        </>
    );
}

export default ShotLineChart;