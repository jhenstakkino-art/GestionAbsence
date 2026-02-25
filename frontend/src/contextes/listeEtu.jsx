import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListeEtu() {

    const [etudiants, setEtudiants] = useState([]);

    useEffect(() => {
        axios.get(
            "http://127.0.0.1:8000/applications.structure_academique/etudiant/"
        )
            .then(response => {
                setEtudiants(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    return (

        <div className="bg-gray-100 font-sans">
            <div className="flex h-screen overflow-hidden">

                {/* Sidebar (Navigation) */}
                <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                    <div className="h-16 flex items-center justify-center border-b border-gray-200">
                        <h2 className="text-xl font-bold text-blue-600">Pointy OniFRa</h2>
                    </div>
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <a href="listeEns" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                            <i className="fas fa-chalkboard-teacher w-6"></i>
                            <span>Enseignants</span>
                        </a>
                        <a href="listeEtu" className="flex items-center px-4 py-3 text-gray-700 bg-gray-100 rounded-lg">
                            <i className="fas fa-user-graduate w-6"></i>
                            <span className="font-medium">Étudiants</span>
                        </a>
                        <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                            <i className="fas fa-calendar-alt w-6"></i>
                            <span>Unité d'enseignement</span>
                        </a>
                        <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                            <i className="fas fa-book w-6"></i>
                            <span>Séance</span>
                        </a>
                    </nav>
                </aside>

                {/* Contenu Principal */}
                <div className="flex-1 flex flex-col overflow-hidden">

                    {/* Top Bar (Header) */}
                    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                        {/* Titre et Statistiques */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Étudiants</h1>
                            <p className="text-sm text-gray-500">Total : <span className="font-semibold text-green-600">156</span>
                                étudiants enregistrés</p>
                        </div>

                        {/* Actions Droite (Bouton + Profil) */}
                        <div className="flex items-center space-x-4">
                            {/* Bouton Ajouter */}
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm flex items-center transition duration-200">
                                <i className="fas fa-user-plus mr-2"></i> <a href="ajouterEtu">Ajouter</a>
                            </button>

                            {/* Profil Utilisateur */}
                            <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-gray-700">TONGALAZA Zarason</p>
                                    <p className="text-xs text-gray-500">Secrétaire</p>
                                </div>
                                <img src="https://ui-avatars.com/api/?name=TONGALAZA+Zarason&background=random" alt="Profile"
                                    className="h-10 w-10 rounded-full border border-gray-300" />
                            </div>
                        </div>
                    </header>

                    {/* Tableau des données */}
                    <main className="flex-1 overflow-x-auto overflow-y-auto p-6">
                        <div className="bg-white rounded-lg shadow overflow-hidden">

                            {/* Filtres et Barre de recherche */}
                            <div
                                className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="relative w-full sm:max-w-xs">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <i className="fas fa-search text-gray-400"></i>
                                    </span>
                                    <input type="text"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        placeholder="Rechercher un étudiant..." />
                                </div>
                                <div className="flex space-x-2">
                                    <select
                                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                        <option>Toutes les classNamees</option>
                                        <option>Terminale S</option>
                                        <option>Première ES</option>
                                        <option>Seconde A</option>
                                    </select>
                                    <button
                                        className="text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md px-3 py-2">
                                        <i className="fas fa-filter"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Tableau */}
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <i className="fas fa-user mr-1"></i> Nom et Prénom
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <i className="fas fa-graduation-cap mr-1"></i> Matricule
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <i className="fas fa-birthday-cake mr-1"></i> Classe
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <i className="fas fa-phone mr-1"></i> Téléphone
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <i className="fas fa-envelope mr-1"></i> Email
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">

                                    {etudiants.map((etu) => {
                                        {/**ITO NO MANAO ILAY ABREVIATION */ }
                                        const initiales =
                                            ens.nom_etudiant?.charAt(0) +
                                            ens.prenom_etudiant?.charAt(0);

                                        return (

                                            /* Ligne d'affichage */
                                            < tr key={etu.id} className="hover:bg-gray-50 transition" >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div
                                                            className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                                            {initiales}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {etu.nom_etudiant} {etu.prenom_etudiant}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {etu.matricule}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {etu.mention}, {etu.niveau}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {etu.date_de_naissance}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    +261 {etu.telephone}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {etu.email_etudiant}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-green-600 hover:text-green-900 mr-3" title="Voir les détails">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3" title="Modifier">
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900" title="Supprimer"
                                                        onclick="confirmDelete(this)">
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>

                                        )
                                    })}
                                </tbody>
                            </table>

                        </div>

                    </main>
                </div>
            </div >

        </div >
    )
}