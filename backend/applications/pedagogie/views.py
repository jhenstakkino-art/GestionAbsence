from rest_framework import generics
from .serializers import UESerializer,SeanceSerializer
from .models import UE,Seance


class UEListAPIView(generics.ListAPIView):
    queryset = UE.objects.all()
    serializer_class = UESerializer

class SeanceListAPIView(generics.ListAPIView):
    queryset = Seance.objects.all()
    serializer_class = SeanceSerializer