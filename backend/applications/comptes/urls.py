from django.urls import path
from .views import UtilisateurListView
from . import views

app_name = "applications.comptes"

urlpatterns = [
    path('index/', views.index, name='index'),
    path('login/', views.Userlogin, name='login'),
    path('register/', views.Userregister, name='register'),
    path('dashboard/', UtilisateurListView.as_view()),
]