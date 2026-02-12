from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Avg
from rest_framework import generics

from applications.statistiques.models import ArchiveStatistique
from applications.pedagogie.models import UE
from applications.structure_academique.models import Mention, Domaine, Promotion

from .models import Evaluation, AbsenceUE
from .serializers import EvaluationSerializer, AbsenceUESerializer



class EvaluationAutoAPIView(APIView):
    def get(self, request, annee):
        archives = ArchiveStatistique.objects.filter(jour__year=annee)
        ues = UE.objects.all()

        for ue in ues:
            # =============================================PAR MENTION============================================
            # ====================================================================================================
            for mention in Mention.objects.all():
                stats = archives.filter(
                    groupe_type='mention',
                    groupe_id=mention.id
                ).aggregate(
                    moyenne_absence=Avg('taux_absence'),
                    penalite_retard=Avg('retard')
                )

                if stats["moyenne_absence"] is not None:
                    Evaluation.objects.update_or_create(
                        ue=ue,
                        mention=mention,
                        domaine=None,
                        promotion=None,
                        annee=annee,
                        defaults={
                            "moyenne_absence": stats["moyenne_absence"],
                            "penalite_retard": stats["penalite_retard"] or 0
                        }
                    )

            # =============================================PAR DOMAINE============================================
            # ====================================================================================================
            for domaine in Domaine.objects.all():
                stats = archives.filter(
                    groupe_type='domaine',
                    groupe_id=domaine.id
                ).aggregate(
                    moyenne_absence=Avg('taux_absence'),
                    penalite_retard=Avg('retard')
                )

                if stats["moyenne_absence"] is not None:
                    Evaluation.objects.update_or_create(
                        ue=ue,
                        mention=None,
                        domaine=domaine,
                        promotion=None,
                        annee=annee,
                        defaults={
                            "moyenne_absence": stats["moyenne_absence"],
                            "penalite_retard": stats["penalite_retard"] or 0
                        }
                    )

            # =============================================PAR PROMOTION============================================
            # ====================================================================================================
            for promotion in Promotion.objects.all():
                stats = archives.filter(
                    groupe_type='promotion',
                    groupe_id=promotion.id
                ).aggregate(
                    moyenne_absence=Avg('taux_absence'),
                    penalite_retard=Avg('retard')
                )

                if stats["moyenne_absence"] is not None:
                    Evaluation.objects.update_or_create(
                        ue=ue,
                        mention=None,
                        domaine=None,
                        promotion=promotion,
                        annee=annee,
                        defaults={
                            "moyenne_absence": stats["moyenne_absence"],
                            "penalite_retard": stats["penalite_retard"] or 0
                        }
                    )

        return Response({"status": "Evaluation automatique calculée"})


class EvaluationListAPIView(generics.ListAPIView):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer


class AbsenceUEListAPIView(generics.ListAPIView):
    queryset = AbsenceUE.objects.all()
    serializer_class = AbsenceUESerializer
