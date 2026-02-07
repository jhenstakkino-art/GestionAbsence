from django.urls import path
from .views import UEListAPIView,SeanceListAPIView

urlpatterns = [
    path('ue/', UEListAPIView.as_view()),
    path('seance/', SeanceListAPIView.as_view()),
]
