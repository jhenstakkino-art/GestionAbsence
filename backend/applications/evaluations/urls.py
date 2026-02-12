from django.urls import path
from .views import EvaluationAutoAPIView,EvaluationListAPIView,AbsenceUEListAPIView

urlpatterns = [
    path('auto/<int:annee>/', EvaluationAutoAPIView.as_view()),
    path('evaluations/', EvaluationListAPIView.as_view()),
    path('absence-ue/', AbsenceUEListAPIView.as_view()),
]
