from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date
from django.db.models import Avg

from applications.structure_academique.models import Etudiant
from applications.pedagogie.models import Seance
from applications.presences.models import PresenceEmpreinte,PresenceProf,PresenceDelegue
from .models import ArchiveStatistique,ClassementStatistique

def calcul_archive_groupe(groupe_type, groupe_id, jour):

    if groupe_type == 'salle':
        etudiants = Etudiant.objects.filter(niveau_id=groupe_id)

    elif groupe_type == 'mention':
        etudiants = Etudiant.objects.filter(mention_id=groupe_id)

    elif groupe_type == 'domaine':
        etudiants = Etudiant.objects.filter(domaine_id=groupe_id)

    elif groupe_type == 'promotion':
        etudiants = Etudiant.objects.filter(promotion_id=groupe_id)

    else :
        return None
    
    seances = Seance.objects.filter(date=jour)
    total_seances = seances.count()
    effectif = etudiants.count()

    present = 0
    retard = 0

    for e in etudiants:
        prof = PresenceProf.objects.filter(etudiant_pp=e, seance_pp_in=seances, statu_pp='P').exists()
        delg = PresenceDelegue.objects.filter(etudiant_pd=e, seance_pd_in=seances, statu_pd='P').exists()
        emp = PresenceProf.objects.filter(etudiant_pe=e, seance_pe_in=seances, type_pe='E').exists()

        if prof and delg :
            present +=1
            if not emp:
                retard +=1

    absent = effectif - present
    taux_absence = (absent/effectif)*100 if effectif > 0 else 0

    archive, created = ArchiveStatistique.objects.update_or_create(
        jour=jour,
        groupe_type=groupe_type,
        groupe_id=groupe_id,
        defaults={
            "effectif": effectif,
            "total_seance": total_seances,
            "present": present,
            "absent": absent,
            "taux_absent": round(taux_absence, 2),
            "retard": retard,
        }
    )

    return archive

class ArchiveStatistiqueAPIView(APIView):
    def get(self, request, groupe_type, groupe_id):
        archive = calcul_archive_groupe(
            groupe_type,
            groupe_id,
            date.today()
        )

        return Response({
            "status":"calcul atomatique effectué"
        })


class ClassementAPIView(APIView):
    def get(self, request, annee):
        archives = ArchiveStatistique.objects.filter(jour_year=annee)
        resultats = archives.values(
            'groupe_type',
            'groupe_id'
        ).annotate(
            taux_absence_moyen = Avg('taux_absence'),
            retard_moyen = Avg('retard')
        )

        for r in resultats:
            ClassementStatistique.objects.update_or_create(
                annee=annee,
                groupe_type = r['groupe_type'],
                groupe_id=r['groupe_id'],
                defaults={
                    "taux_absence_moyen":r['taux_absence_moyen'],
                    "retard_moyen":r['retard_moyen']
                }
            )

        return Response({"status":"classement mis à jour"})