from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Utilisateur, Responsable, Professeur, Delegue


@admin.register(Utilisateur)
class UtilisateurAdmin(UserAdmin):
    list_display = ('username', 'role')
    fieldsets = UserAdmin.fieldsets + (
        ('Rôle', {'fields': ('role',)}),
    )


@admin.register(Responsable)
class ResponsableAdmin(admin.ModelAdmin):
    list_display = ('utilisateur_r', 'type_responsable', 'domaine', 'mention')


@admin.register(Professeur)
class ProfesseurAdmin(admin.ModelAdmin):
    list_display = ('utilisateur_p',)


@admin.register(Delegue)
class DelegueAdmin(admin.ModelAdmin):
    list_display = ('utilisateur_d', 'etudiant_d')
