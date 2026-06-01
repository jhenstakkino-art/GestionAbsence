# 🎓 Système de Gestion et d'Analyse des Absences Universitaires

Bienvenue dans le dépôt officiel du projet **Gestion des Absences**, une application web fullstack moderne conçue pour automatiser le suivi des présences, centraliser les pointages et générer des analyses statistiques avancées au sein d'une institution universitaire.

---

## 👥 Organisation de l'Équipe & Rôles (Travail d'Équipe)

Ce projet a été réalisé en collaboration par une équipe de **3 développeurs**. La répartition des tâches a été orchestrée comme suit :

1. **Stakkino :** Concepteur & Développeur Backend principal. Modélisation de la base de données relationnelle, développement complet des API REST avec Django, et implémentation des algorithmes de calcul automatique pour les pourcentages d'absences.
2. **Toavina  :** Développeur Frontend (Intégration des maquettes, création des composants React et liaison avec les API).
3. **Narindra et Toavina :** Intégration Hardware & UI/UX (Gestion du protocole de l'empreinte digitale et design des tableaux de bord statistiques).

---

## 🚀 Fonctionnalités Clés

### 📊 1. Analyse & États Statistiques Avancés
L'application met un accent particulier sur la business intelligence universitaire en calculant automatiquement le **taux d'absentéisme (en %)** filtré par plusieurs dimensions :
- **Par Salle de classe** (Optimisation de l'occupation).
- **Par Niveau** (L1, L2, L3, M1, M2).
- **Par Mention / Parcours**.
- **Par Domaine d'étude**.

### 🔐 2. Système de Pointage Tripartite (Présence)
La capture des présences est flexible et sécurisée grâce à trois méthodes distinctes :
- **Interface Délégué :** Permet au délégué de classe de soumettre la liste de présence initiale.
- **Validation Professeur :** Permet à l'enseignant de valider, modifier ou clôturer la session de cours.
- **Authentification par Empreinte Digitale :** Système biométrique pour sécuriser et authentifier physiquement la présence des étudiants à l'entrée.

---

## 🛠️ Technologies Utilisées

- **Backend :** Python 🐍 / Django & Django REST Framework (DRF)
- **Base de données :** SQLite (Léger, rapide et parfaitement configuré pour l'environnement de développement)
- **Frontend :** React.js ⚛️ (Architecture SPA) + Outil d'assemblage Vite.js
- **Style & UI :** Tailwind CSS / CSS Personnalisé (Tableaux de bord interactifs)
