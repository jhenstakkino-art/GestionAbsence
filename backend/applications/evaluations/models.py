from django.db import models
from applications.pedagogie.models import UE
from applications.structure_academique.models import Mention, Domaine, Promotion


class Evaluation(models.Model):
    ue = models.ForeignKey(UE, on_delete=models.PROTECT)
    mention = models.ForeignKey(Mention,on_delete=models.PROTECT,null=True,blank=True)
    domaine = models.ForeignKey(Domaine,on_delete=models.PROTECT,null=True,blank=True)
    promotion = models.ForeignKey(Promotion,on_delete=models.PROTECT,null=True,blank=True)
    annee = models.IntegerField()
    moyenne_absence = models.FloatField()
    penalite_retard = models.FloatField()
    date_calcul = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('ue','mention','domaine','promotion','annee')

    def __str__(self):
        return f"{self.ue} - {self.annee}"



class AbsenceUE(models.Model):
    ue = models.ForeignKey(UE, on_delete=models.PROTECT)
    mention = models.ForeignKey(Mention,on_delete=models.PROTECT,null=True,blank=True)
    domaine = models.ForeignKey(Domaine,on_delete=models.PROTECT,null=True,blank=True)
    promotion = models.ForeignKey(Promotion,on_delete=models.PROTECT,null=True,blank=True)
    total_absence = models.IntegerField()
    taux_absence = models.FloatField()
    date_calcul = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('ue','mention','domaine','promotion')

    def __str__(self):
        return f"AbsenceUE {self.ue}"
