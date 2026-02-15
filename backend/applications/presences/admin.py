from django.contrib import admin
from .models import PresenceEmpreinte, PresenceProf, PresenceDelegue


class ReadOnlyAdmin(admin.ModelAdmin):
    def has_add_permission(self, request): return False
    def has_change_permission(self, request, obj=None): return False
    def has_delete_permission(self, request, obj=None): return False


#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
@admin.register(PresenceEmpreinte)
class PresenceEmpreinteAdmin(ReadOnlyAdmin):
    list_display = ('seance_pe', 'etudiant_pe', 'heure_pe', 'type_pe')
    list_filter = ('seance_pe',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        user = request.user

        if user.role == 'ADMIN':
            return qs

        if user.role == 'RESPONSABLE':
            responsable = user.responsables.first()

            if responsable.type_responsable == 'DOMAINE':
                return qs.filter(
                    seance_pe__ue__mention_ue__domaine=responsable.domaine
                )

            if responsable.type_responsable == 'MENTION':
                return qs.filter(
                    seance_pe__ue__mention_ue=responsable.mention
                )

        return qs.none()


#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
@admin.register(PresenceProf)
class PresenceProfAdmin(ReadOnlyAdmin):
    list_display = ('seance_pp', 'etudiant_pp__nom_etudiant', 'statu_pp')
    search_fields = ('etudiant_pp')


#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
@admin.register(PresenceDelegue)
class PresenceDelegueAdmin(ReadOnlyAdmin):
    list_display = ('seance_pd', 'etudiant_pd', 'statu_pd')
    search_fields = ('etudiant_pd')
