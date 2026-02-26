import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/StatCard";
import ChartBox from "../components/ChartBox";

function Dashboard() {
  // 🔹 State pour stocker les données venant de Django
  const [stats, setStats] = useState({
    total_etudiants: 0,
    total_absences: 0,
    total_presences: 0,
    absences_par_etudiant: { labels: [], values: [] },
    absences_par_mois: { labels: [], values: [] },
  });

  // 🔹 Appel à l'API Django
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dashboard-stats/")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Erreur API:", err);
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Statistiques globales */}
      <div className="stats">
        <StatCard title="Étudiants" value={stats.total_etudiants} />
        <StatCard title="Absences" value={stats.total_absences} />
        <StatCard title="Présences" value={stats.total_presences} />
      </div>

      {/* Graphiques */}
      <div className="charts">
        <ChartBox
          title="Absences par étudiant"
          labels={stats.absences_par_etudiant.labels}
          dataValues={stats.absences_par_etudiant.values}
        />

        <ChartBox
          title="Absences par mois"
          labels={stats.absences_par_mois.labels}
          dataValues={stats.absences_par_mois.values}
        />
      </div>
    </div>
  );
}

export default Dashboard;