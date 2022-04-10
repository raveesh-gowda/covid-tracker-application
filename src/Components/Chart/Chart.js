import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import styles from "./Chart.module.css";

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   BarElement,
   Title,
   Tooltip,
   Legend
);

const Chart = (props) => {
   const { data, country } = props;

   const a = data.cases,
      b = data.recovered,
      c = data.deaths;
   //    console.log(a, b, c);

   const [dailyData, setDailyData] = useState([]);

   useEffect(() => {
      axios
         .get("https://covid19.mathdro.id/api/daily")
         .then((response) => {
            const modifiedData = response.data.map((d) => {
               return {
                  confirmed: d.confirmed.total,
                  deaths: d.deaths.total,
                  date: d.reportDate,
               };
            });
            setDailyData(modifiedData);
         })
         .catch((err) => {
            alert(err.message);
         });
   }, []);

   const lineChart = dailyData.length ? (
      <Line
         data={{
            labels: dailyData.map((d) => d.date),
            datasets: [
               {
                  data: dailyData.map((d) => d.confirmed),
                  label: "Infected",
                  borderColor: "#3333ff",
                  fill: "true",
               },
               {
                  data: dailyData.map((d) => d.deaths),
                  label: "Deaths",
                  borderColor: "red",
                  backgroundColor: "rgba(255,0,0,0.5)",
                  fill: "true",
               },
            ],
         }}
      />
   ) : null;

   const barChart = data.cases ? (
      <Bar
         data={{
            labels: ["Infected", "Recovered", "Deaths"],
            datasets: [
               {
                  label: "People",
                  data: [a, b, c],
                  backgroundColor: [
                     "rgba(0, 0, 255, 0.5)",
                     "rgba(0, 255, 0, 0.5)",
                     "rgba(255, 0, 0, 0.5)"
                  ],
                  borderColor: [
                     "rgb(0, 0, 255)",
                     "rgb(0, 255, 0)",
                     "rgb(255, 0, 0)",
                  ],
                  borderWidth: 1,
               },
            ],
         }}
         options={{
            legend: false,
            title: { display: true, text: `Currennt Condition in ${country}` },
         }}
      />
   ) : null;

   return (
      <div className={styles.container}>{country ? barChart : lineChart}</div>
   );
};

export default Chart;
