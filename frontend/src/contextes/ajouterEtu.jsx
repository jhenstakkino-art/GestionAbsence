import React from "react";
import { useEffect, useState } from "react";

import { apiClient } from "../services/api"

export default function AjouterEtu() {



    const [form, setForm] = useState({
        matricule: "",
        nom_etudiant: "",
        prenom_etudiant: "",
        date_de_naissance: "",
        mention: "",
        niveau: "",
        promotion: "",
        telephone: "",

    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataAlefa = {
            ...form,
            matricule: parseInt(form.matricule),
            mention: parseInt(form.mention),
            niveau: parseInt(form.niveau),
            promotion: parseInt(form.promotion),
        }

        try {
            const response = await apiClient.post(
                "http://127.0.0.1:8000/applications.structure_academique/etudiant/",

                dataAlefa

            );
            alert("Etudiant ajouté avec succès !");
            console.log(response.data);

            // Reset form
            setForm({
                matricule: parseInt(form.matricule),
                nom_etudiant: "",
                prenom_etudiant: "",
                date_de_naissance: "",
                mention: "",
                niveau: "",
                promotion: "",
                telephone: "",

            });
        }
        catch (error) {
            console.error(error);
            alert("Erreur lors de l'ajout !");

        }
    };

    const [mentions_get, setMentions] = useState([]);
    const [niveaux_get, setNiveaux] = useState([]);
    const [promotions_get, setPromotions] = useState([]);

    useEffect(() => {
        apiClient.get("/applications.structure_academique/mention/")
            .then(res => setMentions(res.data));

        apiClient.get("/applications.structure_academique/niveau/")
            .then(res => setNiveaux(res.data));

        apiClient.get("/applications.structure_academique/promotion/")
            .then(res => setPromotions(res.data));
    }, []);





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

                            <form action="ajouterEtu" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                                {/* Carte Informations Personnelles */}

                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <i className="fas fa-user text-blue-600 mr-2"></i>
                                        Informations Personnelles
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {/* Civilité */}

                                        {/* Nom */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                            <input
                                                type="text"
                                                name="nom_etudiant"
                                                required
                                                placeholder="Nom de famille"
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                value={form.nom_etudiant}
                                                autoComplete="off"
                                            />
                                        </div>

                                        {/* Prénom */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                            <input
                                                type="text"
                                                name="prenom_etudiant"
                                                required
                                                placeholder="Prénom"
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                value={form.prenom_etudiant}
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
                                                className="w-full px-1 py-2"
                                                onChange={handleChange}
                                                value={form.date_de_naissance}
                                            />
                                        </div>

                                        {/**MENTION CHOIX */}


                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2.5">Mention</label>
                                            <select

                                                name="mention"
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                required
                                                value={form.mention}
                                            >
                                                <option value="">-- Choisir --</option>
                                                {mentions_get.map(men => (
                                                    <option key={men.id} value={men.id}>
                                                        {men.nom_mention}

                                                    </option>))}
                                            </select>
                                        </div>


                                        {/* NIVEAU COIX (Input/Select) */}

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2.5">Niveau</label>
                                            <select
                                                type="text"
                                                name="niveau"
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                required
                                                value={form.niveau}
                                            >
                                                <option value="">-- Choisir --</option>
                                                {niveaux_get.map(niv => (
                                                    <option key={niv.id} value={niv.id}>
                                                        {niv.nom_niveau}

                                                    </option>))}
                                            </select>
                                        </div>


                                        {/* PROMO(Input/Select) */}

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2.5">Promotion</label>
                                            <select

                                                name="promotion"
                                                className="w-full px-3 py-2"
                                                onChange={handleChange}
                                                required
                                                value={form.promotion}
                                            >
                                                <option value="">-- Choisir --</option>
                                                {promotions_get.map(prom => (
                                                    <option key={prom.id} value={prom.id}>
                                                        {prom.nom_promotion} ({prom.annee_universitaire})

                                                    </option>))}
                                            </select>
                                        </div>




                                    </div>
                                </div>

                                {/* Carte Informations de Contact */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <i className="fas fa-address-book text-green-600 mr-2"></i>
                                        Références
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Matricule</label>
                                            <div className="flex items-center">

                                                <i className="text-gray-400 mr-2"></i>

                                                <input
                                                    type="number"
                                                    name="matricule"
                                                    required
                                                    placeholder="Matricule"
                                                    className="w-full outline-none"
                                                    onChange={handleChange}
                                                    value={form.matricule}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>

                                        {/* Téléphone */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                            <div className="flex items-center">

                                                <i className=" fas fa-phone text-gray-400 mr-2"></i>
                                                <input
                                                    type="tel"
                                                    name="telephone"
                                                    required
                                                    placeholder="Tél (+261)"
                                                    className="w-full outline-none"
                                                    onChange={handleChange}
                                                    value={form.telephone}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* BOUTON D'ENREGISTREMENT */}
                                <div className="flex justify-center w-full mt-4">
                                    <button
                                        type="submit"
                                        className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-sm items-center transition duration-200"
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