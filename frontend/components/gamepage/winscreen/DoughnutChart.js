import React, { useState, useEffect } from "react";
import { Chart, ArcElement } from "chart.js";
import { useMoralis } from "react-moralis";
import { Doughnut } from "react-chartjs-2";
import styles from "../../../styles/DoughnutChart.module.scss";

export default function DoughnutChart({ score }) {
  const [list, setList] = useState([]);
  const [percent, setPercent] = useState(0);
  const { Moralis } = useMoralis();

  Chart.register(ArcElement);

  async function listParticipants() {
    const Participant = Moralis.Object.extend("Participant");
    const query = new Moralis.Query(Participant);
    const result = await query.find();

    setList(result.map((entry) => entry.attributes).reverse());
  }

  function calculatePercentage() {
    if (!score || score === 0) return;

    let percent;

    if (list.length === 0) {
      percent = 100;
    } else {
      let lower = 0;

      for (let i = 0; i < list.length; i++) {
        if (score > list[i].score) {
          lower++;
        }
      }

      percent = Number(((lower / list.length) * 100).toFixed(1));
    }

    setPercent(percent);
  }

  useEffect(() => {
    const calculatePerc = async () => {
      await listParticipants();
      calculatePercentage();
    };
    calculatePerc();
  }, [score, list.length]);

  const options = {
    legend: {
      display: false,
      position: "right",
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: ["You", "Others"],
    datasets: [
      {
        data: [percent, 100 - percent],
        backgroundColor: ["hsl(0, 43%, 45%)", "hsl(43, 39%, 93%)"],
      },
    ],
  };

  return (
    <div className={styles.doughnut__wrapper}>
      <span className={styles.doughnut__percent}>{percent}%</span>
      <Doughnut data={data} options={options} />
    </div>
  );
}
