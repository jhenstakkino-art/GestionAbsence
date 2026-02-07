from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import date

from applications.structure_academique.models import Etudiant
from applications.pedagogie.models import Seance
from .models import PresenceEmpreinte, PresenceProf, PresenceDelegue


#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class PresenceEmpreinteCreateAPIView(APIView):
    def post(self, request):
        utilisateur = request.user   # Utilisateur connecté (responsable empreinte)
        seance = Seance.objects.get(id=request.data.get('seance'))   # Séance envoyée par le frontend
        heure = request.data.get('heure')   # Heure et type (E / S)
        type_pe = request.data.get('type_pe')
        etudiants = Etudiant.objects.filter(mention=seance.ue.mention_ue,niveau=seance.ue.niveau_ue)   # Tous les étudiants de la salle (mention + niveau de l'UE)

        for etu in etudiants:
            PresenceEmpreinte.objects.get_or_create(
                seance_pe=seance,
                etudiant_pe=etu,
                defaults={
                    'utilisateur_pe': utilisateur,
                    'heure_pe': heure,
                    'type_pe': type_pe
                }
            )

        return Response(
            {"status": "Présence empreinte enregistrée"},
            status=status.HTTP_201_CREATED
        )


#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class PresenceProfCreateAPIView(APIView):
    def post(self, request):
        professeur = request.user.professeur   # Professeur connecté
        seance = Seance.objects.get(id=request.data.get('seance'))  # Séance concernée
        presents = request.data.get('presents', [])   # Liste des étudiants présents (IDs)
        etudiants = Etudiant.objects.filter(mention=seance.ue.mention_ue,niveau=seance.ue.niveau_ue)  # Étudiants de la salle

        for etu in etudiants:
            statut = 'P' if etu.id in presents else 'A'
            PresenceProf.objects.update_or_create(
                seance_pp=seance,
                etudiant_pp=etu,
                defaults={
                    'professeur_pp': professeur,
                    'statu_pp': statut
                }
            )

        return Response(
            {"status": "Présence professeur enregistrée"},
            status=status.HTTP_201_CREATED
        )


#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class PresenceDelegueCreateAPIView(APIView):
    def post(self, request):
        delegue = request.user.delegue   # Délégué connecté
        seance = Seance.objects.get(id=request.data.get('seance'))    # Séance concernée
        presents = request.data.get('presents', [])    # Liste des présents
        etudiants = Etudiant.objects.filter(mention=seance.ue.mention_ue,niveau=seance.ue.niveau_ue)   # Étudiants de la salle

        for etu in etudiants:
            statut = 'P' if etu.id in presents else 'A'
            PresenceDelegue.objects.update_or_create(
                seance_pd=seance,
                etudiant_pd=etu,
                defaults={
                    'delegue_pd': delegue,
                    'statu_pd': statut
                }
            )

        return Response(
            {"status": "Présence délégué enregistrée"},
            status=status.HTTP_201_CREATED
        )


#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
# CALCUL PRESENCE JOUR
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
def PresenceJourCalcul(etudiant, jour):
    seances = Seance.objects.filter(date=jour)
    total = seances.count()

    if total == 0:
        return None

    present = 0
    retard = False

    for s in seances:
        emp = PresenceEmpreinte.objects.filter(etudiant_pe=etudiant,seance_pe=s,type_pe='E').exists()
        prof = PresenceProf.objects.filter(etudiant_pp=etudiant,seance_pp=s,statu_pp='P').exists()
        delg = PresenceDelegue.objects.filter(etudiant_pd=etudiant,seance_pd=s,statu_pd='P').exists()

        if prof and delg:
            present += 1
            if not emp:
                retard = True

    absence = total - present
    taux_absence = (absence / total) * 100

    return {
        'matricule': etudiant.matricule,
        'total_seances': total,
        'present': present,
        'absence': absence,
        'taux_absence': round(taux_absence, 2),
        'retard': retard
    }


#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
# API PRESENCE JOUR
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class PresenceJourAPIView(APIView):
    def get(self, request, matricule):

        etudiant = Etudiant.objects.get(matricule=matricule)
        resultat = PresenceJourCalcul(etudiant, date.today())

        return Response(resultat)


#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
# PRESENCE JOUR PAR SALLE (MENTION + NIVEAU)
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class PresenceJourSalleAPIView(APIView):
    def get(self, request):
        user = request.user
        today = date.today()

        seances = Seance.objects.filter(date=today)

        # --- Filtrage par rôle ---
        if user.role == 'RESPONSABLE':
            responsable = user.responsables.first()

            if responsable.type_responsable == 'DOMAINE':
                seances = seances.filter(ue__mention_ue__domaine=responsable.domaine)

            elif responsable.type_responsable == 'MENTION':
                seances = seances.filter(ue__mention_ue=responsable.mention)

        data = []

        for seance in seances:
            etudiants = Etudiant.objects.filter(mention=seance.ue.mention_ue,niveau=seance.ue.niveau_ue)

            presents = 0

            for etu in etudiants:
                prof = PresenceProf.objects.filter(seance_pp=seance,etudiant_pp=etu,statu_pp='P').exists()
                delg = PresenceDelegue.objects.filter(seance_pd=seance,etudiant_pd=etu,statu_pd='P').exists()

                if prof and delg:
                    presents += 1

            data.append({
                'seance': seance.id,
                'ue': seance.ue.nom_ue,
                'mention': seance.ue.mention_ue.nom_mention,
                'niveau': seance.ue.niveau_ue.nom_niveau,
                'total_etudiants': etudiants.count(),
                'presents': presents,
                'absents': etudiants.count() - presents
            })

        return Response(data)
    
