import React from "react";
import { useEffect, useState } from "react";

import { apiClient } from "../services/api"

export default function AjouterEtudi() {
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
        const { name, value, type, checked } = e.target;
        if (type == "checkbox") {
            if (checked) {
                setForm({
                    ...form,
                    class_attr: [...form.class_attr, value]

                });
            }
            else {
                setForm({
                    ...form,
                    class_attr: form.class_attr.filter((item) => item != value)
                });
            }
        }
        else {

            setForm({
                ...form,
                [name]: value
            });
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await apiClient.post(
                "http://127.0.0.1:8000/applications.structure_academique/etudiant/",
                form

            );
            alert("Enseignant ajouté avec succès !");
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


    const niveau_choix = [
        { value: 1, label: "L1" },
        { value: 2, label: "L2" },
        { value: 3, label: "L3" },
        { value: 4, label: "M1" },
        { value: 5, label: "M2" },
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





    // FORMULAIRE MAMPIDITRA MPAMPIANATRA
    return (
        <div className="bg-gray-100 font-sans min-h-screen">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                    <div className="h-16 flex items-center justify-center border-b border-gray-200">
                        <h2 className="text-xl font-bold text-blue-600">Pointy OniFRa</h2>
                    </div>
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <a href="listeEns" className="flex items-center px-4 py-3 text-gray-700 bg-gray-100 rounded-lg">
                            <i className="fas fa-chalkboard-teacher w-6"></i>
                            <span className="font-medium">Enseignants</span>
                        </a>
                        <a href="listeEtu" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                            <i className="fas fa-user-graduate w-6"></i>
                            <span>Étudiants</span>
                        </a>
                        <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                            <i className="fas fa-calendar-alt w-6"></i>
                            <span>Emploi du temps</span>
                        </a>
                    </nav>
                </aside>

                {/* Contenu Principal */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Top Bar */}
                    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                        <div className="flex items-center">
                            <a href="listeEns" className="text-gray-500 hover:text-gray-700 mr-4">
                                <i className="fas fa-arrow-left text-lg"></i>
                            </a>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Ajouter un Etudiant</h1>

                            </div>
                        </div>

                        {/* Profil  SOLOINA AUTO AN'IZAY MANDRAY EO NA CONNECTEE*/}
                        <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-700">Marie Dupont</p>
                                <p className="text-xs text-gray-500">Secrétaire</p>
                            </div>
                            <img
                                src="https://ui-avatars.com/api/?name=Marie+Dupont&background=random"
                                alt="Profile"
                                className="h-10 w-10 rounded-full border border-gray-300"
                            />
                        </div>
                    </header>

                    {/* Formulaire */}
                    <main className="flex-1 overflow-x-auto overflow-y-auto p-6">
                        <div className="max-w-4xl mx-auto">


                            {/**MANOMBOKA ETO NO MAMPIDITRA */}

                            <form action="ajouterEns" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                                {/* Carte Informations Personnelles */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <i className="fas fa-user text-blue-600 mr-2"></i>
                                        Informations Personnelles
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {/* Civilité */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Matricule</label>
                                            <select
                                                type
                                                name="matricule"
                                                required
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                value={form.matricule}
                                            >
                                                <option value="">Sélectionner</option>
                                                <option value="M.">M.</option>
                                                <option value="Mme">Mme</option>
                                                <option value="Mlle">Mlle</option>
                                                <option value="Dr">Docteur</option>
                                                <option value="Pr">Professeur</option>
                                            </select>
                                        </div>

                                        {/* Nom */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                            <input
                                                type="text"
                                                name="nom_enseignant"
                                                required
                                                placeholder="Nom de famille"
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                value={form.nom_enseignant}
                                                autoComplete="off"
                                            />
                                        </div>

                                        {/* Prénom */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                            <input
                                                type="text"
                                                name="prenom_enseignant"
                                                required
                                                placeholder="Prénom"
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                value={form.prenom_enseignant}
                                                autoComplete="off"
                                            />
                                        </div>

                                        {/* Date de naissance */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                            <input
                                                type="date"
                                                name="date_de_naissance"
                                                required
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                value={form.date_de_naissance}
                                            />
                                        </div>

                                        {/* Lieu de naissance */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de naissance</label>
                                            <input
                                                type="text"
                                                name="lieu_de_naissance"
                                                placeholder="Ville de naissance"
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                value={form.lieu_de_naissance}
                                                autoComplete="off"
                                            />
                                        </div>

                                        {/* Nationalité */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nationalité</label>
                                            <input
                                                type="text"
                                                name="nationalite"
                                                placeholder="Nationalité"
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                value={form.nationalite}
                                                autoComplete="off"
                                            />
                                        </div>

                                        {/* Genre */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                                            <select
                                                name="genre"
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                value={form.genre}
                                            >
                                                <option value="">Sélectionner</option>
                                                <option value="Homme">Homme</option>
                                                <option value="Femme">Femme</option>
                                            </select>
                                        </div>

                                        {/* Photo */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Photo de profil</label>
                                            <div className="flex items-center space-x-4">
                                                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                                                    <i className="fas fa-user text-2xl"></i>
                                                </div>
                                                <input type="file" name="photo" accept="image/*" className="text-sm text-gray-500" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Carte Informations de Contact */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <i className="fas fa-address-book text-green-600 mr-2"></i>
                                        Coordonnées
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                                    <i className="fas fa-envelope"></i>
                                                </span>
                                                <input
                                                    type="email"
                                                    name="email_enseignant"
                                                    required
                                                    placeholder="email@gail.com"
                                                    className="w-full pl-12 pr-3 py-2"
                                                    onChange={handleChange}
                                                    value={form.email_enseignant}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>

                                        {/* Téléphone */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <i className="fas fa-phone text-gray-400"></i>
                                                </span>
                                                <input
                                                    type="tel"
                                                    name="telephone"
                                                    required
                                                    placeholder="+261 "
                                                    className="w-full pl-12 pr-3 py-2"
                                                    onChange={handleChange}
                                                    value={form.telephone}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>

                                        {/* Adresse */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                                            <input
                                                type="text"
                                                name="adresse"
                                                placeholder="Rue, avenue, numéro"
                                                className="w-full px-3 py-2 mb-2"
                                                onChange={handleChange}
                                                value={form.adresse}
                                                autoComplete="off"
                                            />
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                <input
                                                    type="text"
                                                    name="code_postale"
                                                    placeholder="Code postal"
                                                    className="px-3 py-2"
                                                    onChange={handleChange}
                                                    value={form.code_postale}
                                                    autoComplete="off"
                                                />
                                                <input
                                                    type="text"
                                                    name="ville"
                                                    placeholder="Ville"
                                                    className="px-3 py-2"
                                                    onChange={handleChange}
                                                    value={form.ville}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Carte Informations Professionnelles */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <i className="fas fa-briefcase text-purple-600 mr-2"></i>
                                        Informations Professionnelles
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {/* Matière */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Matière enseignée *</label>
                                            <select
                                                name="matiere_ens"
                                                required
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                value={form.matiere_ens}
                                            >
                                                <option value="">Sélectionner une matière</option>
                                                <option value="Mathematiques">Mathématiques</option>
                                                <option value="Physique">Physique-Chimie</option>
                                                <option value="Français">Français</option>
                                                <option value="Anglais">Anglais</option>
                                                <option value="Statistiques">Statistiques</option>
                                                <option value="Algorithme">Algorithme</option>
                                                <option value="Merketing">Marketing</option>
                                                <option value="Ingenerie Logiciele">Ingenerie Logiciele</option>
                                            </select>
                                        </div>

                                        {/* Statut */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Statut *</label>
                                            <select
                                                name="statut_ens"
                                                required
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                value={form.statut_ens}
                                            >
                                                <option value="">Sélectionner</option>
                                                <option value="titulaire">Titulaire</option>
                                                <option value="contractuel">Contractuel</option>
                                                <option value="vacataire">Vacataire</option>
                                                <option value="stagiaire">Stagiaire</option>
                                                <option value="responsable">Responsable</option>
                                                <option value="chef_mention">Chef mention</option>
                                            </select>
                                        </div>

                                        {/* Date d'embauche */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Date d'embauche *</label>
                                            <input
                                                type="date"
                                                name="date_emb"
                                                required
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                value={form.date_emb}
                                            />
                                        </div>

                                        {/* Classes attribuées */}
                                        <div className="md:col-span-2 lg:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Classes attribuées *</label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                                {["AGRO L1", "AGRO L2", "AGRO L3", "ANG L1", "ANG L2", "ANG L3", "BTP L1", "BTP L2", "BTP L3", "COM L1", "COM L2", "COM L3", "DROIT L1", "DROIT L2", "DROIT L3", "GAPE L1", "GAPE L2", "GAPE L3", "GEST L1", "GEST L2", "GEST L3", "INFO L1", "INFO L2", "INFO L3", "TOUR L1", "TOUR L2", "TOUR L3"].map((cls) => (
                                                    <label key={cls} className="inline-flex items-center bg-gray-50 p-2 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value={cls}
                                                            checked={form.class_attr.includes(cls)}
                                                            className="rounded text-blue-600 focus:ring-blue-500"
                                                            onChange={handleChange}

                                                        />
                                                        <span className="ml-2 text-sm">{cls}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* BOUTON D'ENREGISTREMENT */}
                                <div className="flex justify-center w-full mt-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-sm flex items-center transition duration-200"
                                    >
                                        Enregistrer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}