from django.db import models
from applications.structure_academique.models import Domaine,Mention,Etudiant

#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class Utilisateur(models.Model):
    nom_utilisateur = models.CharField( max_length=100)
    prenom_utilisateur = models.CharField( max_length=100)
    r_c = (
        ('ADMIN', 'Administrateur'),
        ('RESPONSABLE', 'Responsable'),
        ('PROFESSEUR', 'Proffeseur'),
        ('DELEGUE', 'Délégué'),
    )
    role = models.CharField( max_length=20, choices=r_c)
    mot_de_passe = models.CharField( max_length=255)

    def __str__(self):
        return f"{self.nom_utilisateur}{self.prenom_utilisateur} - {self.role} - {self.mot_de_passe})"


#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class Responsable(models.Model):
    utilisateur_r = models.OneToOneField(Utilisateur, on_delete=models.SET_NULL, null=True, related_name='responsables')
    type_c = (
        ('DOMAINE', 'Domaine'),
        ('MENTION', 'Mention'),
        ('EMPREINTE', 'Empreinte'),
    )
    type_responsable = models.CharField( max_length=20, choices=type_c)

    domaine = models.ForeignKey( Domaine, on_delete=models.PROTECT, null=True, blank=True, related_name='responsables')
    mention = models.ForeignKey( Mention, on_delete=models.PROTECT, null=True, blank=True, related_name='responsables')

    def __str__(self):
        return f"{self.utilisateur_r.nom_utilisateur}{self.utilisateur_r.prenom_utilisateur}-{self.utilisateur_r.role}({self.type_responsable})"
    

#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class Professeur(models.Model):
    utilisateur_p = models.OneToOneField( Utilisateur, on_delete=models.SET_NULL, null=True, related_name='professeurs')

    def __str__(self):
        return f"{self.utilisateur_p.nom_utilisateur}{self.utilisateur_p.prenom_utilisateur}-{self.utilisateur_p.role}"
    

#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class Delegue(models.Model):
    utilisateur_d = models.OneToOneField(Utilisateur, on_delete=models.SET_NULL, null=True, related_name='delegues')
    etudiant_d = models.ForeignKey( Etudiant, on_delete=models.CASCADE, related_name='delegues')

    def __str__(self):
        return f"Délégué {self.etudiant_d.matricule}-{self.utilisateur_d.nom_utilisateur}{self.utilisateur_d.prenom_utilisateur}"