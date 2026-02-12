import React, { useState, useEffect } from "react";
import { FaHome, FaUserCircle, FaClipboardCheck, FaGraduationCap, FaUserCheck, FaChartBar, FaUniversity } from "react-icons/fa"
import { MdOutlineToday } from "react-icons/md"
import "../styles/dashboard.css";
export default function Dashboard() {

  const [formData, setFormData] = useState({
    domaine: '',
    mention: '',
    niveau: 1, //par défaut L1 na 1

  });




  const niveau_choix = [
    { value: 1, label: "L1" },
    { value: 2, label: "L2" },
    { value: 3, label: "L3" }
  ]

  const mention_choix = [
    { value: "INFO", label: "Informatique" },
    { value: "GEST", label: "Gestion" },
    { value: "AGRO", label: "Agronomie" },
    { value: "LANG", label: "Lettre Anglaise" },
    { value: "COMM", label: "Communication" },
    { value: "GAPE", label: "Géologie Appliqué" },
    { value: "TOUR", label: "Tourisme" },
    { value: "DROI", label: "Droit" },
    { value: "BTP", label: "Bâtiments et Travaux Publics" },
  ]

  const domaine_choix = [
    { value: "STECH", label: "SCIENCES ET TECHNOLOGIES" },
    { value: "SEDUC", label: "SCIENCES DE L'EDUCATION" },
    { value: "SSOCI", label: "SCIENCES DE LA SOCIETE" },
    { value: "SINGE", label: "SCIENCES DE L'INGENIEUR" }

  ]


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  //Ilay amohana ny presence jour
  const [dernierStat, setDernierStat] = useState([]);

  useEffect(() => {
    const nom_etudiant = ["RANDRETRA", "VELOSOA", "RATOVO", "RASOA", "RABE", "RAKOTO"];
    const prenom_etudiant = ["Felantsoa", "Stakkino", "Narindra", "Sitraka", "Miohitra", "Toavina"];


    // soloina ilay liste any ampianarana ito rehefa tafidiatra ny base de données

    const listeEtudiant = Array.from({ length: 42 }, () => ({
      nom: nom_etudiant[Math.floor(Math.random() * nom_etudiant.length)],
      prenom: prenom_etudiant[Math.floor(Math.random() * prenom_etudiant.length)],
      matricule: Math.floor(Math.random() * 40) + 103030,
      statut: true // présen avokoa

    }));

    setDernierStat(listeEtudiant);

    // MIS A JOUR NY STATUT
    const interval = setInterval(() => {
      setDernierStat(prev =>
        prev.map(e => ({
          ...e,
          statut: true
        }))
      );
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);



  }, []);

  // STATUT ETUDIANT
  const statutEtudiant = (index) => {
    setDernierStat(prev =>
      prev.map((e, i) =>
        i === index ? { ...e, statut: !e.statut } : e
      )
    )


  };

  // ITO NO MANISA NY ABSENT
  const nbPresent = dernierStat.filter(e => e.statut).length;
  const nbAbsent = dernierStat.filter(e => !e.statut).length;





  return (
    <div style={styles.container}>

      {/* MENU */}
      <div style={styles.menu}>
        <div style={styles.menu_left}>

          <h2><FaHome></FaHome></h2>
          <p><FaUserCircle></FaUserCircle></p>
          <p><FaClipboardCheck></FaClipboardCheck></p>
          <p><FaGraduationCap></FaGraduationCap></p>
          <p><FaUserCheck></FaUserCheck></p>
          <p><FaChartBar></FaChartBar></p>
          <p><FaUniversity></FaUniversity></p>

        </div>

        {/* ILAY MAMPIDITRA NY DOMAINE SY NY MENTION ARY NIVEAU ENY AMIN'NY SISISY */}

        <div style={styles.menu_right} >
          <p><span style={{ fontWeight: "bold", fontSize: 18 }}>Présence du jour</span> <span style={{ fontSize: 20, padding: 5 }}><MdOutlineToday></MdOutlineToday></span></p>

          <div className="input-group">
            <label htmlFor="domaine_choix">Domaine</label>
            <select name="domaine_choix" onChange={handleChange} required value={formData.domaine_choix}>
              {domaine_choix.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}

                </option>))}
            </select>

          </div>

          <div className="input-group">
            <label htmlFor="mention_choix">Mention</label>
            <select name="mention_choix" onChange={handleChange} required value={formData.mention_choix}>
              {mention_choix.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}

                </option>))}
            </select>

          </div>

          <div className="input-group">
            <label htmlFor="niveau_choix">Niveau</label>
            <select name="niveau_choix" onChange={handleChange} required value={formData.niveau_choix}>
              {niveau_choix.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}

                </option>))}
            </select>

          </div>


        </div>

      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        <h2>Présence fait par le délégué</h2>

        {/* ITO NO MISY ILAY DIGRAMME */}
        <div style={styles.right}>
          <div className="rightgauche">
            <h1 style={{color: "#c03300"}}>Calcul de taux d'absence</h1>

          </div>

          <div className="rightdroite">
            <h1 style={{ color: "#48800d" }}>Diagramme</h1>

          </div>


        </div>

        {/* Misy ilay zavatra ambony */}
        <div style={styles.left}>


          <div style={styles.cards}>
            <div style={styles.card}>
              <h4>Présents</h4>
              <span>{nbPresent}</span>
            </div>
            <div style={styles.card}>
              <h4>Absents</h4>
              <span>{nbAbsent}</span>
            </div>
            <div style={styles.card}>
              <h4>Retards</h4>
              <span>0</span>
            </div>
            <div style={styles.card}>
              <h4>Total</h4>
              <span>{dernierStat.length}</span>
            </div>
          </div>

          {/* TABLE */}
          <div style={styles.tableBox}>

            <table width="100%">
              <thead>
                <tr>
                  <th>Numéro</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Matricule</th>
                  <th>Statut</th>
                </tr>
              </thead>

              {/* AFICHAGE LISTE ETUDIANT */}
              <tbody>
                {dernierStat.map((t, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td style={{ textAlign: "left", paddingLeft: 17 }}>{t.nom}</td>
                    <td style={{ textAlign: "left", paddingLeft: 17 }}>{t.prenom}</td>
                    <td>{t.matricule}</td>
                    <td style={{ textAlign: "center" }}>
                      <input type="checkbox" checked={t.statut} onChange={() => statutEtudiant(i)} />
                      <span style={{
                        marginLeft: 8,
                        fontWeight: "bold",
                        color: t.statut ? "green" : "red"
                      }}>
                        {t.statut ? "Présent" : "Absent"}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </div>
    </div>
  );
}




//STYLE CSS

const styles = {
  container: {
    display: "flex",
    height: "fit-content",

    background: "#0f172a",
    color: "#e5e7eb",
    fontFamily: "Arial"
  },
  menu: {
    width: 320,
    background: "#020617",
    padding: 20,
    display: "flex",
    justifyContent: "space-between"
  },

  menu_right: {
    paddingRight: 20

  },


  content: {
    display: "grid",
    flex: 1,
    padding: 30,
    gap: 30
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
  },
  right: {
    gap: 20,
    height: "59.2vh",
    width: "100%",
    borderRadius: 10,
    justifyContent: "space-around",
    display: "flex"

  },
};
