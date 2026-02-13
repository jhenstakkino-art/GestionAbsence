from django.urls import path
from .views import tauxPresence, diagramme


#app_name = "applications.statistiques"

urlpatterns = [
    path("taux/", tauxPresence),
    path("diagramme/", diagramme),
]