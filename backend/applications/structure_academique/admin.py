from django.contrib import admin
from .models import Domaine,Mention,Niveau,Promotion,Etudiant, Enseignant

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

# -----------------------------------------------------------
# -----------------------------------------------------------
@admin.register(Enseignant)
class EseignantAdmin(admin.ModelAdmin):
    list_display=('civilite','nom_enseignant','prenom_enseignant','date_de_naissance','lieu_de_naissance','nationalite', 'genre', 'email_enseignant', 'telephone','adresse', 'code_postale', 'ville', 'matiere_ens', 'statut_ens', 'date_emb', 'class_attr')
    list_filter=('class_attr','civilite','genre')
    search_fields=('nom_enseignant','prenom_enseignant', 'email_enseigant','class_attr', 'telephone')