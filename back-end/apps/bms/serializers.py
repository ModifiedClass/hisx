from rest_framework import serializers
from .models import BookCategory,Book,BorrowRecord,BookStock

class BookCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=BookCategory
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model=Book
        fields = "__all__"
        depth = 2


class BookStockSerializer(serializers.ModelSerializer):
    class Meta:
        model=BookStock
        fields = "__all__"
        depth = 2


class BorrowRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model=BorrowRecord
        fields = "__all__"
        depth = 2