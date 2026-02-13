import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{ width: "220px", background: "#0f172a", color: "white" }}>
      <h3>Pointy</h3>

      <nav>
        <NavLink to="/">Accueil</NavLink><br />
        <NavLink to="/login">Compte</NavLink><br />
        <NavLink to="#">Pédagodique</NavLink><br />
        <NavLink to="#">Evaluation</NavLink><br />
        <NavLink to="#">Présence</NavLink><br />
        <NavLink to="#">Statistique</NavLink>
        <NavLink to="#">Structure Académique</NavLink><br />
      </nav>
    </div>
  );
}
