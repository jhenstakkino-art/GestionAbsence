from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Utilisateur
from .serializers import UtilisateurCreateSerializer


class LoginView(TokenObtainPairView):
    permission_classes = []


class CreateUtilisateurView(generics.CreateAPIView):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurCreateSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):

        # ADMIN afaka mamorona rehetra
        if request.user.role == 'ADMIN':
            return super().create(request, *args, **kwargs)

        # RESPONSABLE afaka mamorona PROFESSEUR sy DELEGUE
        if request.user.role == 'RESPONSABLE':
            if request.data.get('role') in ['PROFESSEUR', 'DELEGUE']:
                return super().create(request, *args, **kwargs)

        return Response({"detail": "Permission refusée"}, status=403)
    