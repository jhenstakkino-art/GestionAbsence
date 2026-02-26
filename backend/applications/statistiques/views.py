from django.http import JsonResponse
from django.db.models import Count
from applications.presences.models import PresenceProf
from applications.structure_academique.models import Etudiant
from datetime import datetime

def dashboard_stats(request):

    #  Absences par étudiant
    absences_par_etudiant = (
        PresenceProf.objects
        .filter(statu_pp='ABSENT')
        .values('etudiant_pp__nom')
        .annotate(total=Count('id'))
    )

    # Absences par mois
    absences_par_mois = (
        PresenceProf.objects
        .filter(statu_pp='ABSENT')
        .extra(select={'mois': "strftime('%%m', seance_pp__date)"})
        .values('mois')
        .annotate(total=Count('id'))
    )

    data = {
        "absences_par_etudiant": list(absences_par_etudiant),
        "absences_par_mois": list(absences_par_mois),
        "total_absences": PresenceProf.objects.filter(statu_pp='ABSENT').count(),
        "total_presences": PresenceProf.objects.filter(statu_pp='PRESENT').count(),
        "total_etudiants": Etudiant.objects.count(),
    }

    return JsonResponse(data)
