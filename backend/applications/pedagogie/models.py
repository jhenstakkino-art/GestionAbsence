from django.db import models
from applications.structure_academique.models import Mention,Niveau,Promotion
from applications.comptes.models import Professeur

class UE(models.Model):
    nom_ue = models.CharField( max_length=150)
    code_ue = models.CharField( max_length=150)
    coefficient = models.IntegerField()
    volume_horaire = models.IntegerField()
    mention_ue = models.ForeignKey(Mention, on_delete=models.PROTECT, related_name='ues')
    niveau_ue = models.ForeignKey(Niveau, on_delete=models.PROTECT, related_name='ues')
    promotion_ue = models.ForeignKey(Promotion, on_delete=models.PROTECT, related_name='ues')

    def __str__(self):
        return f"{self.nom_ue}{self.code_ue}-{self.coefficient}/{self.volume_horaire}-{self.mention_ue}({self.niveau_ue})-{self.promotion_ue}"
    

class Seance(models.Model):
    ue = models.ForeignKey(UE, on_delete=models.PROTECT, related_name='seances')
    professeur_s = models.ForeignKey(Professeur, on_delete=models.SET_NULL, null=True, related_name='seances')
    date = models.DateField( )
    h_debut = models.TimeField( )
    h_fin = models.TimeField( )

    def __str__(self):
        return f"{self.ue}{self.professeur_s}-{self.date}{self.h_debut}-{self.h_fin}"