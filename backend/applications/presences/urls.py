from django.urls import path
from .views import (
    PresenceEmpreinteCreateAPIView,
    PresenceProfCreateAPIView,
    PresenceDelegueCreateAPIView,
    PresenceJourSalleAPIView,
    PresenceJourAPIView
)

urlpatterns = [
    path('empreinte/', PresenceEmpreinteCreateAPIView.as_view()),
    path('professeur/', PresenceProfCreateAPIView.as_view()),
    path('delegue/', PresenceDelegueCreateAPIView.as_view()),
    path('jour/etudiant/<int:matricule>/', PresenceJourAPIView.as_view()), # présence par étudiant (optionnel)
    path('jour/salles/', PresenceJourSalleAPIView.as_view()),
]
