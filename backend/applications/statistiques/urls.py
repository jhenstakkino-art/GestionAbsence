from django.urls import path
from .views import ArchiveStatistiqueAPIView, ClassementAPIView

urlpatterns = [
    path('archive/<str:groupe_type>/<int:groupe_id>/', ArchiveStatistiqueAPIView.as_view()),
    path('classement/<int:annee>/', ClassementAPIView.as_view()),
]
