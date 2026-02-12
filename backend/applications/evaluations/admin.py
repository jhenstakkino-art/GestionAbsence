from django.contrib import admin
from .models import Evaluation, AbsenceUE


@admin.register(Evaluation)
class EvaluationAdmin(admin.ModelAdmin):
    list_display = ('ue','mention','domaine','promotion','annee','moyenne_absence','penalite_retard')
    list_filter = ('annee','mention','domaine','promotion')



@admin.register(AbsenceUE)
class AbsenceUEAdmin(admin.ModelAdmin):
    list_display = ('ue','mention','domaine','promotion','total_absence','taux_absence')
    list_filter = ('mention','domaine','promotion')
