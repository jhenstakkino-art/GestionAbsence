from django.urls import path
from .views import LoginView, CreateUtilisateurView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('create/', CreateUtilisateurView.as_view(), name='create-user'),
]
