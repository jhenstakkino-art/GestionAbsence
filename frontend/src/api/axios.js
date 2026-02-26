import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";
import ChartBox from "../components/ChartBox";

function Dashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("statistiques/dashboard/")
      .then(res => setStats(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!stats) return <p>Chargement...</p>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats">
        <StatCard title="Étudiants" value={stats.total_etudiants} />
        <StatCard title="Absences" value={stats.total_absences} />
        <StatCard title="Présences" value={stats.total_presences} />
      </div>

      <div className="charts">
        <ChartBox
          title="Absences par étudiant"
          labels={stats.absences_par_etudiant.map(e => e.etudiant_pp__nom)}
          dataValues={stats.absences_par_etudiant.map(e => e.total)}
        />

        <ChartBox
          title="Absences par mois"
          labels={stats.absences_par_mois.map(m => m.mois)}
          dataValues={stats.absences_par_mois.map(m => m.total)}
        />
      </div>
    </div>
  );
}

export default Dashboard;
