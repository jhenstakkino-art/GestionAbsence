import React, { useState } from "react";
import "../styles/ajouterEtu.css";



export default function AjouterEtu() {
    const [form, setForm] = useState({
        matricule: "",
        nom_etudiant: "",
        prenom_etudiant: "",
        date_de_naissance: "",
        mention: "",
        niveau: "L1",
        telephone: "",
        email_etudiant: "",
        promotion: "",

    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await apiClient.post(
                "http://127.0.0.1:8000/applications.structure_academique/etudiant/",
                form

            );
            alert("Etudiant ajouté avec succès !");
            console.log(response.data);

            // Reset form
            setForm({
                matricule: "",
                nom_etudiant: "",
                prenom_etudiant: "",
                date_de_naissance: "",
                mention: "",
                niveau: "L1",
                telephone: "",
                email_etudiant: "",
                promotion: "",

            });
        }
        catch (error) {
            console.error(error);
            alert("Erreur lors de l'ajout !");

        }
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
                            <input type="text" name="nom_etudiant" onChange={handleChange} value={form.nom_etudiant} />

                        </div>
                        <div className="row-in">
                            <label htmlFor="#">Prénom</label>
                            <input type="text" name="prenom_etudiant" onChange={handleChange} value={form.prenom_etudiant} />

                        </div>
                        <div className="row-in">
                            <label htmlFor="#">Date de naissance</label>
                            <input type="date" name="date_de_naissance" onChange={handleChange} value={form.date_de_naissance} />

                        </div>


                    </div>

                    <div className="row">
                        <div className="row-in">
                            <label htmlFor="#">Mention</label>
                            <input type="text" name="mention" onChange={handleChange} />

                        </div>
                        <div className="row-in">
                            <label htmlFor="#">Niveau</label>
                            <input type="text" name="niveau" onChange={handleChange} value={form.niveau} />

                        </div>
                        <div className="row-in">
                            <label htmlFor="#">Téléphone</label>
                            <input type="text" name="telephone" onChange={handleChange} value={form.telephone} />

                        </div>
                    </div>

                    <button type="submit" className="enreg-etud">Enregistrer l'étudiant</button>
                </form>
            </div>
        </div>
    )
}