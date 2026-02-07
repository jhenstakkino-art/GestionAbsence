from django.contrib import admin
from .models import UE,Seance

@admin.register(UE)
class UEAdmin(admin.ModelAdmin):
    list_display = ('nom_ue','code_ue','coefficient','volume_horaire','mention_ue','niveau_ue','promotion_ue')
    list_filter = ('mention_ue','niveau_ue')
    search_fields = ('nom_ue','code_ue')


@admin.register(Seance)
class SeanceAdmin(admin.ModelAdmin):
    list_display = ('ue','professeur_s','date','h_debut','h_fin')
    list_filter = ('h_debu','h_fin','date')
    search_fields = ('ue','professeur_s')