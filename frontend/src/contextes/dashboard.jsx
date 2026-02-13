import React, { useState, useEffect } from "react";
import { FaHome, FaUserCircle, FaClipboardCheck, FaGraduationCap, FaUserCheck, FaChartBar, FaUniversity } from "react-icons/fa"
import { MdOutlineToday } from "react-icons/md"
import "../styles/dashboard.css";



export default function Dashboard() {

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


  const nom_etudiant = ["RANDRETRA", "VELOSOA", "RATOVOARISOA", "RASOA", "RABE", "RAKOTO"];
  const prenom_etudiant = ["Felantsoa", "Stakkino", "Narindra", "Sitraka", "Miohitra", "Anjanirina Toavina"];


  const [formData, setFormData] = useState({
    domaine: '',
    mention: '',
    niveau: 1, //par défaut L1 na 1

  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  //Ilay amohana ny presence jour
  const [dernierStat, setDernierStat] = useState([]);


  // ITO NO MANISA NY ABSENT
  const nbPresent = dernierStat.filter(e => e.statut).length;
  const nbAbsent = dernierStat.filter(e => !e.statut).length;
  const nbRetard = dernierStat.filter(e => e.statut === "Retard").length;

  // Calculez les taux
  const tauxPresent = (nbPresent / dernierStat.length) * 100;
  const tauxAbsent = (nbAbsent / dernierStat.length) * 100;
  const tauxRetard = 0; // �� ajuster selon votre logique

  // Fonction pour envoyer les données
  const envoyerTaux = async () => {
    try {
      const response = await fetch('http://localhost:8000/applications.statistiques/taux/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken') // Important pour Django
        },
        body: JSON.stringify({
          tauxPresent: tauxPresent,
          tauxAbsent: tauxAbsent,
          tauxRetard: tauxRetard,
          nbPresent: nbPresent,
          nbAbsent: nbAbsent,
          total: dernierStat.length
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        // Afficher l'image
        const img = document.getElementById('graphique');
        img.src = URL.createObjectURL(blob);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  // Fonction helper pour récupérer le CSRF token
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }




  // STATUT ETUDIANT
  const statutEtudiant = (index) => {
    setDernierStat(prev =>
      prev.map((e, i) =>
        i === index ? { ...e, statut: !e.statut } : e
      )
    )


  };

  useEffect(() => {


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









  return (
    <div style={styles.container}>

      {/* MENU */}
      <div style={styles.menu}>
        <div style={styles.menu_left}>

          <p><FaHome></FaHome> Acceuil</p>

          <p><FaUserCircle></FaUserCircle> Compte</p>
          <p><FaClipboardCheck></FaClipboardCheck> Pédagogique</p>
          <p><FaGraduationCap></FaGraduationCap> Evaluation</p>
          <p><FaUserCheck></FaUserCheck> Présence</p>
          <p><FaChartBar></FaChartBar> Statistique</p>
          <p><FaUniversity></FaUniversity> Structure Académique</p>

        </div>

        {/* ILAY MAMPIDITRA NY DOMAINE SY NY MENTION ARY NIVEAU ENY AMIN'NY SISISY */}

        <div style={styles.menu_right} >
          <p><span style={{ fontWeight: "bold", fontSize: 20, color: "bisque" }}>Présence du jour</span> <span style={{ fontSize: 20, padding: 5 }}><MdOutlineToday></MdOutlineToday></span></p>

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

          {/*MAMOAKA NY SARY PILE */}
          <div className="rightgauche">
           
            <img id="graphique" style={{ maxWidth: '80%', height: "93%" }} />

          </div>
          
          <div className="rightdroite">
            <img src="http://localhost:8000/applications.statistiques/diagramme/" style={{height:"93%"}}/>
          
          </div>

          <button onClick={envoyerTaux}
          style={{
            background:"green",
            height:55,
            }}>GRAPHIQUE</button>

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
              <thead style={{ color: "bisque", textAlign: "left", fontSize: 20 }}>
                <tr>
                  <th style={{ textAlign: "center" }}>Numéro</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th style={{ textAlign: "center" }}>Matricule</th>
                  <th style={{ textAlign: "center" }}>Statut</th>
                </tr>
              </thead>

              {/* AFICHAGE LISTE ETUDIANT */}
              <tbody>
                {dernierStat.map((t, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td style={{ textAlign: "left" }}>{t.nom}</td>
                    <td style={{ textAlign: "left" }}>{t.prenom}</td>
                    <td style={{ textAlign: "center" }}>{t.matricule}</td>
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
    /*display: "flex",*/
    justifyContent: "space-between",
    position: "fixed",
    top: 0,
    bottom: 0,
  },

  menu_right: {
    paddingRight: 30,
    


  },

  menu_left: {
    marginBottom: 50,
    textAlign: "left",
    alignItems: "center",
    lineHeight: 2,
  },


  content: {
    display: "grid",
    flex: 1,
    padding: 30,
    gap: 30,
    marginLeft: "350px",
    marginBottom: 50

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

    justifyContent: "space-around",
    display: "flex"

  },
};
