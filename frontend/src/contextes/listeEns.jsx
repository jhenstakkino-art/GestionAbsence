import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";


export default function ListeEns() {

    const [enseignants, setEnseignants] = useState([]);

    useEffect(() => {
        axios.get(
            "http://127.0.0.1:8000/applications.structure_academique/enseignant/"
        )
            .then(response => {
                setEnseignants(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    return (

        <div className="bg-gray-100 font-sans">

            <div className="flex h-screen overflow-hidden">

                {/* Sidebar (Navigation latérale simulée) */}
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
                            <h1 className="text-2xl font-bold text-gray-800">Enseignants</h1>
                            <p className="text-sm text-gray-500"><span className="font-semibold text-blue-600"></span>
                                {/**HO ASIANA IREO ISAN'NY MPAMPIANATRA ATO */}
                            </p>
                        </div>

                        {/* Actions Droite (Bouton + Profil) */}
                        <div className="flex items-center space-x-4">
                            {/* Bouton Ajouter */}
                            <button

                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm flex items-center transition duration-200">
                                <i className="fas fa-plus mr-2"></i> <a href="ajouterEns">Ajouter</a>
                            </button>

                            {/* Profil Utilisateur */}
                            <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-gray-700">TONGALAZA Zarason</p>
                                    <p className="text-xs text-gray-500">Résponsable</p>
                                </div>
                                <img src="https://ui-avatars.com/api/?name=TONGALAZA+Zarason&background=random" alt="Profile"
                                    className="h-10 w-10 rounded-full border border-gray-300" />
                            </div>
                        </div>
                    </header>

                    {/* Tableau des données */}
                    <main className="flex-1 overflow-x-auto overflow-y-auto p-6">
                        <div className="bg-white rounded-lg shadow overflow-hidden">

                            {/* Filtres ou Barre de recherche (Optionnel mais recommandé) */}
                            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                <div className="relative max-w-xs">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <i className="fas fa-search text-gray-400"></i>
                                    </span>
                                    <input type="text"
                                        className="text-center block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Rechercher un enseignant..." />
                                </div>
                                <button className="text-gray-500 hover:text-gray-700">
                                    <i className="fas fa-filter"></i> Filtrer
                                </button>
                            </div>

                            {/* Tableau */}
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nom et Prénom
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Matière
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Classes attribuées
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Téléphone
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">


                                    {/* Ligne 1 */}

                                    {enseignants.map((ens) => {
                                        {/**ITO NO MANAO ILAY ABREVIATION */}
                                        const initiales =
                                            ens.nom_enseignant?.charAt(0) +
                                            ens.prenom_enseignant?.charAt(0);
                                           
                                        return (
                                            <tr key={ens.id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div
                                                            className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                                                            {initiales}
                                                        </div>
                                                        <div className="ml-4">
                                                            {/**NOM ET PRENOM */}
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {ens.nom_enseignant} {ens.prenom_enseignant}
                                                            </div>

                                                            {/**EMAIL */}
                                                            <div className=" text-left text-sm text-gray-500">
                                                                {ens.email_enseignant}    
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {/**MATIERE ENS */}
                                                    <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                                        {ens.matiere_ens}
                                                    </span>
                                                </td>
                                                {/**CLASSE ATTRIBUER */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {ens.class_attr?.join(', ')}

                                                </td>
                                                {/**TELEPHONE */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    + 261 {ens.telephone}

                                                </td>

                                                {/**FONCTION DELETE RAHA HO ASIANA */}
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3" title="Voir les détails">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900" title="Supprimer"
                                                        onClick="confirmDelete(this)">
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                    {/**ILAY MANAPOITRA NY ENSEIGNANT TAFIDITRA */}
                                </tbody>
                            </table>

                            {/* Pagination (Simulée) */}
                            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Pointy <span className="font-medium">{/*isan'iny affichage izay misy fa tsy vita*/}</span> {/*à*/} <span className="font-medium">{/*TOTAL AFFICHAGE*/}</span>
                                            Onifra <span className="font-medium">{/**AFIICHAGE TOT */}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                            aria-label="Pagination">
                                            <a href="#"
                                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">Précédent</span>
                                                <i className="fas fa-chevron-left"></i>
                                            </a>
                                            <a href="#"
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                1
                                            </a>
                                            <a href="#"
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                2
                                            </a>
                                            <a href="#"
                                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">Suivant</span>
                                                <i className="fas fa-chevron-right"></i>
                                            </a>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </div>








    )
}