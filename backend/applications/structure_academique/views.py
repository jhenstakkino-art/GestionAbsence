from rest_framework import generics
from .models import Domaine,Mention,Niveau,Promotion,Etudiant
from .serializers import (
    DomaineSerializer,
    MentionSerializer,
    NiveauSerializer,
    PromotionSerializer,
    EtudiantSerializer
)


# -----------------------------------------------------------
# -----------------------------------------------------------
class DomaineListCreateView(generics.ListCreateAPIView):
    queryset = Domaine.objects.all()
    serializer_class = DomaineSerializer

# -----------------------------------------------------------
# -----------------------------------------------------------
class MentionListCreateView(generics.ListCreateAPIView):
    queryset = Mention.objects.all()
    serializer_class = MentionSerializer

#-------------------------------------------------------------
#-------------------------------------------------------------
class NiveauListCreateView(generics.ListCreateAPIView):
    queryset = Niveau.objects.all()
    serializer_class = NiveauSerializer

#-------------------------------------------------------------
#-------------------------------------------------------------
class PromotionListCreateView(generics.ListCreateAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer

#-------------------------------------------------------------
#-------------------------------------------------------------
class EtudiantListCreateView(generics.ListCreateAPIView):
    queryset = Etudiant.objects.all()
    serializer_class = EtudiantSerializer