from django.contrib import admin
from .models import Utilisateur,Responsable,Professeur,Delegue


#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
@admin.register(Utilisateur)
class UtilisateurAdmin(admin.ModelAdmin):
    list_display = ('nom_utilisateur','prenom_utilisateur','role','mot_de_passe')
    list_filter = ['role']
    search_fields = ('nom_utilisateur','prenom_utilisateur')


#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
@admin.register(Responsable)
class ResponsableAdmin(admin.ModelAdmin):
    list_display = ('utilisateur_r','type_responsable','domaine','mention')
    list_filter = ['type_responsable']


#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
@admin.register(Professeur)
class ProfesseurAdmin(admin.ModelAdmin):
    list_display = ['utilisateur_p']


#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
@admin.register(Delegue)
class DelegueAdmin(admin.ModelAdmin):
    list_display = ('utilisateur_d','etudiant_d')