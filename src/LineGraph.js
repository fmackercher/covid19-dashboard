import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
)


const buildChartData = (data, casesType) => {
    let chartData = [];

    for (let date in data.cases) {

        let newDataPoint = {
            x: date,
            y: data[casesType][date]
        };
        chartData.push(newDataPoint);


    }
    return chartData;
};

const options = {
    type: 'line',
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0, //creates continuous line
        },
    },

};


function LineGraph({ casesType }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120") // daily cases in last 120 days
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let chartData = buildChartData(data, casesType);
                    setData(chartData);
                    console.log(chartData);
                });
        };

        fetchData();
    }, [casesType]);

    return (
        <div>
            {(
                <Line
                    data={{
                        datasets: [
                            {
                                borderColor: "#FF0000",
                                borderWidth: 5,
                                data: data,
                            },
                        ],
                    }}
                    options={options}
                />
            )}
        </div>
    );
}

export default LineGraph;