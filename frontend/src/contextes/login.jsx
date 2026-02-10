import { useState } from "react";
import { apiClient } from "../services/api";
import { Link } from "react-router-dom";
import { FaUserShield, FaLock, FaUsers, FaUser } from "react-icons/fa";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";


export default function UtilisateurLogin() {



    const [role, setRole] = useState("");
    const [mot_de_passe, setMdpUtilisateur] = useState("");


    const [mess, setMessage] = useState("");
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post("applications.comptes/login/", {
                role: role,
                mot_de_passe: mot_de_passe,
            });
            console.log("Connexion réussite:", response.data);
            setMessage("Connexion réussie!");
            //navigate("/listeTache");  // Mivezivezy mankany pejy hafa aorian'ny fidirana soa aman-tsara
            navigate("/dashboard");

            /* Erreur raha misy olana amin'ny views */
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            const mess = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Erreur lors de la connexion.";
            setMessage(mess);

        }
    };


    // Rôle choix
    const role_c = [

        { value: "ADMIN", label: "Administrateur" },
        { value: "RESPONSABLE", label: "Responsable" },
        { value: "PROFESSEUR", label: "Professeur" },
        { value: "DELEGUE", label: "Délégué" },


    ]

    return (

        <div className="container">
            <div className="logout-btn">
                <Link to="/">Déconnexion</Link>
            </div>

            <form className="login-card" onSubmit={handleSubmit}>
                <div className="avatar"><FaUsers /></div>
                <h2>UTILISATEUR</h2>
                <div className="input-form">

                    <FaUser />
                    {/*<select name="role" onChange={(e) => setRole(e.target.value)}  required>
                        
                        {role_c.map(utilisateur => (
                            <option key={utilisateur.value} value={utilisateur.value}>
                                {utilisateur.label}
                            </option>
                        
                        ))}
                    </select>*/}

                    <input
                        type="text"
                        placeholder="Utilisateur"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        autoComplete="off" />

                </div>

                <div className="input-form">

                    <FaLock />
                    <input
                        type="password"
                        placeholder="Mot de passe"

                        value={mot_de_passe}
                        onChange={(e) => setMdpUtilisateur(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>

                <button type="submit" className="login-btn">SE CONNECTER</button>

                <div className="remember-me">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Se souvenir de moi</label>
                </div>

                <div className="error-msg">
                    <p>{mess}</p>
                </div>

            </form>

            <h6 className="footer">Vous n'avez pas de compte? <Link to="/register">Créer un compte</Link></h6>


        </div>

    );
}