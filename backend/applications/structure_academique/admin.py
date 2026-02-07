from django.contrib import admin
from .models import Domaine,Mention,Niveau,Promotion,Etudiant

# -----------------------------------------------------------
# -------------------
# ----------------------------------------
@admin.register(Domaine)
class DomaineAdmin(admin.ModelAdmin):
    list_display = ('nom_domaine',)

# -----------------------------------------------------------
# -----------------------------------------------------------
@admin.register(Mention)
class MentionAdmin(admin.ModelAdmin):
    list_display = ('nom_mention','domaine')
    list_filter = ('domaine',)

# -----------------------------------------------------------
# -----------------------------------------------------------
@admin.register(Niveau)
class NiveauAdmin(admin.ModelAdmin):
    list_display = ('nom_niveau',)

# -----------------------------------------------------------
# -----------------------------------------------------------
@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ('nom_promotion','annee_universitaire')

# -----------------------------------------------------------
# -----------------------------------------------------------
@admin.register(Etudiant)
class EtudiantAdmin(admin.ModelAdmin):
    list_display=('matricule','nom_etudiant','prenom_etudiant','mention','niveau','promotion')
    list_filter=('mention','niveau','promotion')
    search_fields=('matricule','nom_etudiant','prenom_etudiant')