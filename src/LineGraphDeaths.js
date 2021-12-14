import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
)


const buildChartDataD = (data, deathsType) => {
    let chartData = [];

    for (let date in data.deaths) {

        let newDataPoint = {
            x: date,
            y: data[deathsType][date]
        };
        chartData.push(newDataPoint);
        console.log(chartData)


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


function LineGraphD({ deathsType }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120") //daily deaths in last 120 days
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    let chartData = buildChartDataD(data, deathsType);
                    setData(chartData);
                    console.log(chartData);
                });
        };

        fetchData();
    }, [deathsType]);

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

export default LineGraphD;