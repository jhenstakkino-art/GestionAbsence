import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [dernierStat, setDernierStat] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nom_etudiant = ["Seth", "Todd", "David", "Brian", "Emma"];
      const mention = ["Info", "Gestion", "Agro", "Tourisme"];
      const niveau = ["L1", "L2", "L3"];

      const newData = {
        nom: nom_etudiant[Math.floor(Math.random() * nom_etudiant.length)],
        prenom: "Toavina",
        matricule: Math.floor(Math.random() * 40) + 103030,
        mention: mention[Math.floor(Math.random() * mention.length)],
        niveau: niveau[Math.floor(Math.random() * niveau.length)],
      };

      setDernierStat(prev => [...prev.slice(-9), newData]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      
      {/* MENU */}
      <div style={styles.menu}>
        <h2>Home</h2>
        <p>Comptes</p>
        <p>Evaluations</p>
        <p>Pédagogiques</p>
        <p>Présences</p>
        <p>Structures académiques</p>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        
        {/* Misy ilay zavatra ambony */}
        <div style={styles.cards}>
          <div style={styles.card}>
            <h4>Présents</h4>
            <span>350</span>
          </div>
          <div style={styles.card}>
            <h4>Absents</h4>
            <span>{dernierStat.length}</span>
          </div>
          <div style={styles.card}>
            <h4>Retards</h4>
            <span>30</span>
          </div>
          <div style={styles.card}>
            <h4>Nombre total</h4>
            <span>390</span>
          </div>
        </div>

        {/* TABLE */}
        <div style={styles.tableBox}>
          <h3>Présences récentes</h3>
          <table width="100%">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Matricule</th>
                <th>Mention</th>
                <th>Niveau</th>
              </tr>
            </thead>
            <tbody>
              {dernierStat.map((t, i) => (
                <tr key={i}>
                  <td>{t.nom}</td>
                  <td>{t.prenom}</td>
                  <td>{t.matricule}</td>
                  <td>{t.mention}</td>
                  <td>{t.niveau}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#0f172a",
    color: "#e5e7eb",
    fontFamily: "Arial"
  },
  menu: {
    width: 200,
    background: "#020617",
    padding: 20
  },
  content: {
    flex: 1,
    padding: 20
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 15,
    marginBottom: 20
  },
  card: {
    background: "#1e293b",
    padding: 15,
    borderRadius: 10
  },
  tableBox: {
    background: "#1e293b",
    padding: 15,
    borderRadius: 10
  }
};
