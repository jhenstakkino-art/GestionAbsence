from django.urls import path
from .views import UtilisateurListView
from . import views

app_name = "applications.comptes"

urlpatterns = [
    path('index/', views.index, name='index'),
    path('utilisateur/', UtilisateurListView.as_view()),
]