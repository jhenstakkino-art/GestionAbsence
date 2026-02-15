from rest_framework import serializers
from .models import Utilisateur, Responsable, Professeur, Delegue
import random
import string


def generate_password():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=8))


class UtilisateurCreateSerializer(serializers.ModelSerializer):

    etudiant_id = serializers.IntegerField(required=False)
    domaine_id = serializers.IntegerField(required=False)
    mention_id = serializers.IntegerField(required=False)
    type_reponsable = serializers.CharField(requires=False)

    generated_password = serializers.CharField(read_only=True)

    class Meta:
        model = Utilisateur
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'role',
            'etudiant_id',
            'domaine_id',
            'mention_id',
            'type_reponsable',
            'generated_password'
        ]

    def create(self, validated_data):

        role = validated_data.get('role')
        password = generate_password()

        etudiant_id = validated_data.pop('etudiant_id', None)
        domaine_id = validated_data.pop('domaine_id', None)
        mention_id = validated_data.pop('mention_id', None)
        type_reponsable = validated_data.pop('type_reponsable', None)

        user = Utilisateur.objects.create_user(
            username=validated_data['username'],
            password=password,
            role=role,
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
        )

        # Création selon rôle
        if role == 'RESPONSABLE':
            Responsable.objects.create(
                utilisateur_r=user,
                type_reponsable=type_reponsable,
                domaine_id=domaine_id,
                mention_id=mention_id
            )

        elif role == 'PROFESSEUR':
            Professeur.objects.create(
                utilisateur_p=user
            )

        elif role == 'DELEGUE':
            Delegue.objects.create(
                utilisateur_d=user,
                etudiant_d_id=etudiant_id
            )

        user.generated_password = password
        return user
