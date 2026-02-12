from rest_framework import serializers
from .models import Evaluation, AbsenceUE


class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        Model = Evaluation
        fields = '__all__'


class AbsenceUESerializer(serializers.ModelSerializer):
    class Meta:
        Model = AbsenceUE
        fields = '__all__'