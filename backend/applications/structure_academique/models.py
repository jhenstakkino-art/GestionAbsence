from django.db import models


# --------------------------------------------------------
# --------------------------------------------------------
class Domaine(models.Model):
    nom_domaine=models.CharField( max_length=100, unique=True)

    def __str__(self):
        return self.nom_domaine
    

# --------------------------------------------------------
# --------------------------------------------------------
class Mention(models.Model):
    nom_mention=models.CharField( max_length=100, unique= True)
    domaine=models.ForeignKey(Domaine, on_delete=models.CASCADE,related_name="mentions")

    class Meta:
        unique_together=('nom_mention','domaine')

    def __str__(self):
        return f"{self.nom_mention}({self.domaine.nom_domaine})"


# --------------------------------------------------------
# --------------------------------------------------------
class Niveau(models.Model):
    nom_niveau=models.CharField( max_length=10, unique=True)

    def __str__(self):
        return self.nom_niveau
    

# --------------------------------------------------------
# --------------------------------------------------------
class Promotion(models.Model):
    nom_promotion=models.CharField( max_length=100)
    annee_universitaire=models.CharField( max_length=10)

    class Meta:
        unique_together=('nom_promotion','annee_universitaire')

    def __str__(self):
        return f"{self.nom_promotion}({self.annee_universitaire})"
    

# --------------------------------------------------------
# --------------------------------------------------------
class Etudiant(models.Model):
    matricule=models.IntegerField(unique=True)
    nom_etudiant=models.CharField( max_length=100)
    prenom_etudiant=models.CharField( max_length=100)
    date_de_naissance=models.DateField()
    mention=models.ForeignKey( Mention, on_delete=models.PROTECT, related_name="etudiants")
    niveau=models.ForeignKey(Niveau, on_delete=models.PROTECT, related_name="etudiants")
    promotion=models.ForeignKey(Promotion, on_delete=models.PROTECT, related_name="etudiants")

    def __str__(self):
        return f"{self.matricule} - {self.nom_etudiant} {self.prenom_etudiant} - {self.mention} {self.niveau}"