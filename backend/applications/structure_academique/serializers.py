from rest_framework import serializers
from .models import Domaine,Mention,Niveau,Promotion,Etudiant


# -----------------------------------------------------------
# -----------------------------------------------------------
class DomaineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domaine
        fields = '__all__' 

# -----------------------------------------------------------
# -----------------------------------------------------------
class MentionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mention
        fields = '__all__'

# -----------------------------------------------------------
# -----------------------------------------------------------
class NiveauSerializer(serializers.ModelSerializer):
    class Meta:
        model = Niveau
        fields = '__all__'

# -----------------------------------------------------------
# -----------------------------------------------------------
class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields =' __all__'

# -----------------------------------------------------------
# -----------------------------------------------------------
class EtudiantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etudiant
        fiels =' __all__'