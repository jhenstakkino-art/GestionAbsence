import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function ChartBox({ title, labels, dataValues }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Nombre d'absences",
        data: dataValues,
        backgroundColor: "#3b82f6"
      }
    ]
  };

  return (
    <div className="chart-box">
      <h3>{title}</h3>
      <Bar data={data} />
    </div>
  );
}

export default ChartBox;


