from django.db import models

# Create your models here.
class Article(models.Model):
    nom_product = models.CharField(max_length=300)
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    code_barre = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.nom

class Transaction(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)

class LigneTransaction(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name='lignes')
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    quantite = models.PositiveIntegerField()
    prix_unitaire = models.DecimalField(max_digits=10, decimal_places=2)