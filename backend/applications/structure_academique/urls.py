from django.urls import path
from .views import (
    DomaineListCreateView,
    MentionListCreateView,
    NiveauListCreateView,
    PromotionListCreateView,
    EtudiantListCreateView
)


urlpatterns = [
    path('domaine/', DomaineListCreateView.as_view()),
    path('mention/', MentionListCreateView.as_view()),
    path('niveau/', NiveauListCreateView.as_view()),
    path('promotion/', PromotionListCreateView.as_view()),
    path('etudiant/', EtudiantListCreateView.as_view()),
]
