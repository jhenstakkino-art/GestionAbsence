from django.db import models
from applications.structure_academique.models import Etudiant
from applications.pedagogie.models import Seance
from applications.comptes.models import Professeur,Delegue,Utilisateur

#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class PresenceEmpreinte(models.Model):
    utilisateur_pe = models.ForeignKey(Utilisateur, on_delete=models.SET_NULL, null=True, limit_choices_to={'role': 'RESPONSABLE'})
    seance_pe = models.ForeignKey(Seance, on_delete=models.PROTECT, related_name= 'pes')
    etudiant_pe = models.ForeignKey(Etudiant, on_delete=models.PROTECT, related_name= 'pes')
    heure_pe = models.TimeField()
    choix_pe =(
        ('ENTRER','E'),
        ('SORTIR','S'),
    )
    type_pe = models.CharField( max_length=10, choices=choix_pe)

    class Meta:
        unique_together = ('etudiant_pe', 'seance_pe')

    def __str__(self):
        return f"{self.utilisateur_pe}-{self.etudiant_pe.matricule}-{self.seance_pe}-{self.heure_pe}"


#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class PresenceProf(models.Model):
    professeur_pp = models.ForeignKey( Professeur,on_delete=models.SET_NULL, related_name= 'pps')
    seance_pp = models.ForeignKey( Seance, on_delete=models.PROTECT, related_name= 'pps')
    etudiant_pp = models.ForeignKey( Etudiant, on_delete=models.PROTECT, related_name= 'pps')
    choix_pp =(
        ('PRESENT','P'),
        ('ABSENT','A')
    )
    statu_pp = models.CharField( max_length=10, choices=choix_pp)

    class Meta:
        unique_together = ('etudiant_pp', 'seance_pp')

    def __str__(self):
        return f"{self.professeur_pp}-{self.seance_pp}-{self.etudiant_pp.matricule}-{self.statu_pp}"
    

#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class PresenceDelegue(models.Model):
    delegue_pd = models.ForeignKey(Delegue, on_delete=models.SET_NULL, related_name= 'pds')
    seance_pd = models.ForeignKey(Seance, on_delete=models.PROTECT, related_name='pds')
    etudiant_pd = models.ForeignKey(Etudiant, on_delete=models.PROTECT, related_name= 'pds')
    choix_pd =(
        ('PRESENT','P'),
        ('ABSENT','A')
    )
    statu_pd = models.CharField( max_length=10, choices=choix_pd)

    class Meta:
        unique_together = ('etudiant_pd', 'seance_pd')

    def __str__(self):
        return f"{self.delegue_pd}-{self.seance_pd}-{self.etudiant_pd.matricule}-{self.statu_pd}"
