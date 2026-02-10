from rest_framework import generics
from .models import Utilisateur
from .serializers import UtilisateurSerializer

from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User


# Nampidiarako checkpoint amin'ilay fidirana voalohany tsy manova zavatra 
#ilay miditra amin'ny Pointy
@api_view(['GET'])
def index(request):
    
    

    """API pointy check endpoint tafiditra ao amin'ny Pointy."""
    return Response({
        'status': 'ok',
        'message': 'L\'application est en ligne et fonctionne correctement.'
    }, status=status.HTTP_200_OK)


class UtilisateurListView(generics.ListAPIView):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer