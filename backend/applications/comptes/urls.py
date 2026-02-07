from django.urls import path
from .views import UtilisateurListView

urlpatterns = [
    path('utilisateur/', UtilisateurListView.as_view()),
]