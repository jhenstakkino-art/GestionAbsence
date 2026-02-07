from rest_framework import serializers
from .models import UE,Seance

class UESerializer(serializers.ModelSerializer):
    class Meta:
        model = UE
        fields = '__all__'


class SeanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seance
        fields = '__all__'