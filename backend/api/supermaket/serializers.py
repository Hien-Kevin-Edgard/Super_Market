from rest_framework import serializers
from .models import Article, Transaction, LigneTransaction

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'nom_product', 'prix', 'code_barre']

class LigneTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LigneTransaction
        fields = ['article', 'quantite', 'prix_unitaire']

class TransactionSerializer(serializers.ModelSerializer):
    lignes = LigneTransactionSerializer(many=True)

    class Meta:
        model = Transaction
        fields = ['id', 'date', 'total', 'lignes']

    def create(self, validated_data):
        lignes_data = validated_data.pop('lignes')
        transaction = Transaction.objects.create(**validated_data)
        for ligne_data in lignes_data:
            LigneTransaction.objects.create(transaction=transaction, **ligne_data)
        return transaction
