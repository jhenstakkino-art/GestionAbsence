import React from "react";
import { apiClient } from "../services/api";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";



export default function CreerCompte() {
    
    const [nom_utilisateur, setNomUtilisateur] = React.useState('');
    const [prenom_utilisateur, setPrenomUtilisateur] = React.useState('');
    const [mot_de_passe, setMdpUtilisateur] = React.useState('');
    const [role, setRole] = React.useState('');
    const [re_mot_de_passe, setReMdpUtilisateur] = React.useState('');

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mot_de_passe !== re_mot_de_passe) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        // Logique pour créer un compte utilisateur
        try {
            const response = await apiClient.post("applications.comptes/register/", {
                nom_utilisateur: nom_utilisateur,
                prenom_utilisateur: prenom_utilisateur,
                role: role,
                mot_de_passe: mot_de_passe,
            });
            console.log("Compte créé avec succès:", response.data);
            navigate("/login");

        } catch (error) {
            if (error.response) {
                console.error("Erreur lors de la création du compte:", error.response.data);
            } else {
                console.error("Erreur lors de la création du compte:", error.message);
            }

        }



    }

    return (
        <div className="creer-container">
            <h1>Créer un compte</h1>
            {/*Nataoko logout ihany amin'izay tsy mamerina, lasa mifandray amin'ny login.css izy eto*/}
            <div className="logout-btn">
                <a href="/login">Retourner</a>
            </div>

            <form className="creer-form" onSubmit={handleSubmit}>
                <label htmlFor="nom_utilisateur">Nom d'utilisateur</label>
                <input
                    id="nom_utilisateur"
                    type="text"
                    required
                    autoComplete="off"
                    onChange={e => setNomUtilisateur(e.target.value)}
                />
                <label htmlFor="prenom_utilisateur">Prénom d'utilisateur</label>
                <input
                    id="prenom_utilisateur"
                    type="text"
                    required
                    autoComplete="off"
                    onChange={e => setPrenomUtilisateur(e.target.value)}
                />

                <label htmlFor="Rôle">Rôle d'utilisateur</label>
                <input
                    id="role"
                    type="text"
                    required
                    autoComplete="off"
                    onChange={e => setRole(e.target.value)}
                />

                <label htmlFor="mot_de_passe">Mot de passe</label>
                <input
                    id="mot_de_passe"
                    type="password"
                    required
                    autoComplete="off"
                    onChange={e => setMdpUtilisateur(e.target.value)}
                />


                <label htmlFor="re_mot_de_passe">Confirmer le mot de passe</label>
                <input
                    id="re_mot_de_passe"
                    type="password"
                    required
                    autoComplete="off"
                    onChange={e => setReMdpUtilisateur(e.target.value)}
                />
                <button type="submit" className="creer-btn">CRÉER LE COMPTE</button>
            </form>
        </div>
    );
}