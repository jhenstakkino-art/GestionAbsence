import React, { useState } from "react";
import "../styles/enregEtudiant.css";
export default function GererStruct() {
    const [form, setForm] = useState({
        matricule: "",
        nom: "",
        prenom: "",
        date_naissance: "",
        mention: "",
        niveau: 1,
        promotion: "",

    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form); // ito no andefasana azy amin'ny api
        alert("Etudiant enregistré.");
    };

    return (
        <div className="page">
            <div className="card-etud">
                <h2>Enregistrer un étudiant</h2>
                <p>Ajouter vos étudiant en un clic</p>
                <form onSubmit={handleSubmit} className="form-etud">
                    <div className="row">
                        <div className="row-in">
                            <label htmlFor="#">Nom</label>
                            <input type="text" name="nom" onChange={handleChange} />

                        </div>
                        <div className="row-in">
                            <label htmlFor="#">Prénom</label>
                            <input type="text" name="prenom"  onChange={handleChange} />

                        </div>
                        <div className="row-in">
                            <label htmlFor="#">Date de naissance</label>
                            <input type="date" name="date_naissance" onChange={handleChange} />

                        </div>


                    </div>

                    <div className="row">
                        <div className="row-in">
                            <label htmlFor="#">Mention</label>
                            <input type="text" name="mention" onChange={handleChange} />

                        </div>
                        <div className="row-in">
                            <label htmlFor="#">Niveau</label>
                            <input type="text" name="niveau" onChange={handleChange} />

                        </div>
                        <div className="row-in">
                            <label htmlFor="#">Promotion</label>
                            <input type="text" name="promotion" onChange={handleChange} />

                        </div>
                    </div>

                    <button type="submit" className="enreg-etud">Enregistrer l'étudiant</button>
                </form>
            </div>
        </div>
    )
}