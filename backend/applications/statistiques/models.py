from django.db import models


#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
class ArchiveStatistique(models.Model):
    jour = models.DateField()
    groupe_type = models.CharField(max_length=20, choices=[
        ('salle','Salle'),
        ('mention','Mention'),
        ('domaine','Domaine'),
        ('promotion','Promtion'),
    ])
    groupe_id = models.IntegerField()
    effectif = models.IntegerField()
    total_seances = models.IntegerField()
    present = models.IntegerField()
    absent = models.IntegerField()
    taux_absence = models.FloatField()
    retard = models.IntegerField()
    date_calcul = models.DateTimeField(auto_now_add=False)
    
    class Meta : 
        unique_together = ('jour','groupe_type','groupe_id')

    def __str__(self):
        return f"{self.jour} - {self.groupe_type}({self.groupe_id})"
    

#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
class ClassementStatistique(models.Model):
    annee = models.IntegerField()
    mois = models.IntegerField(null=True, blank=True)
    semaine = models.IntegerField(null=True, blank=True)
    groupe_type = models.CharField( max_length=20, choices= [
        ('salle','Salle'),
        ('mention','Mention'),
        ('domaine','Domaine'),
        ('promotion','Promtion'),
    ])
    groupe_id = models.IntegerField()
    taux_absence = models.FloatField()
    retard_moyen = models.FloatField()
    date_calcul = models.DateTimeField(auto_now_add=False)

    class Meta:
        unique_together = ('annee','mois','semaine','groupe_type','groupe_id')

    def __str__(self):
        return f"{self.groupe_type}({self.groupe_id}) - {self.annee}/{self.mois or self.semaine}"
    