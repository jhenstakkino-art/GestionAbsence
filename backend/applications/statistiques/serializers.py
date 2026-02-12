from rest_framework import serializers
from .models import ArchiveStatistique,ClassementStatistique

class ArchiveStatistiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchiveStatistique
        fields = '__all__'

class ClassementStatistiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassementStatistique
        fields = '__all__'