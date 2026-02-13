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
        'message': 'L\'application est opérationnelle. L\'accès au système est strictement limité aux profils autorisés : l\'Administrateur, le Responsable, le Professeur et le Délégué. Chaque utilisateur doit disposer d\'une authentification valide ainsi que des droits d\'accès appropriés.'
    }, status=status.HTTP_200_OK) 


# Utilisateur liste views

class UtilisateurListView(generics.ListAPIView):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer


    #ilay miditra amin'ny login utilisateur
@csrf_exempt
@api_view(['POST'])
def Userlogin(request):
    """API login utilisateur endpoint."""

    role = request.data.get('role')
    mot_de_passe= request.data.get('mot_de_passe')

    utilisateur = authenticate(
        request, 
        username=role, 
        password=mot_de_passe
    )
        
    # Raha mety ny authentification dia makany amin'ny tache
    if utilisateur is not None:
        return Response(
            {
                'status': 'Succès',
                'message': 'Connexion réussie.',
                "nom_utilisateur": utilisateur.username,
                
            }, 
            status=status.HTTP_200_OK
        )

    # Raha tsy mety ny authentification dia averina any amin'ny pejy login miaraka amin'ny hafatra diso
    else:
        return Response(
            {
            'status': 'Erreur',
            'message': 'Nom d\'utilisateur ou mot de passe incorrect.'
            }, 
            status=status.HTTP_401_UNAUTHORIZED
        )

    
#ilay miditra amin'ny creer utilisateur
@csrf_exempt
@api_view(['POST'])
def Userregister(request):


    """API créer utilisateur endpoint."""
    nom = request.data.get('nom_utilisateur')
    prenom = request.data.get('prenom_utilisateur')
    role = request.data.get('role')
    mdp = request.data.get('mot_de_passe')


    # condition ho an'ny famoronana
    if not nom or not prenom or not role or not mdp:
        return Response(
            {
                'status': 'Erreur',
                'message': 'Tous les champs sont requis pour créer un compte.'
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(username=nom).exists():
        return Response(
            {
                'status': 'Erreur',
                'message': 'Ce nom d\'utilisateur existe déjà.'
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )

        
    # Mamorona utilisateur vaovao
    try:
        utilisateur = User.objects.create_user(
            username=role,
            password=mdp
        )

        return Response(
            {
                'status': 'Succès',
                'message': 'Compte utilisateur créé avec succès.',
                "nom_utilisateur": utilisateur.username
            }, 
            status=status.HTTP_201_CREATED
        )

    except Exception as e:
        return Response(
            {
                'status': 'Erreur',
                'message': f'Erreur lors de la création du compte: {str(e)}'
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )




