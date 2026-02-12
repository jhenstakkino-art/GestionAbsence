from django.contrib import admin
from .models import ArchiveStatistique,ClassementStatistique


@admin.register(ArchiveStatistique)
class ArchiveStatistiqueAdmin(admin.ModelAdmin):
    list_display = ('jour','groupe_type','groupe_id','effectif','present','absent','taux_absence')
    list_filter = ('jour','groupr_type')



@admin.register(ClassementStatistique)
class ClassementStatistiqueAdmin(admin.ModelAdmin):
    list_display = ('annee','mois','semaine','groupe_type','groupe_id','taux_absence','taux_moyen')
    list_filter = ('annee','groupe_type')