from rest_framework import serializers
from .models import *

class ProblemCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=ProblemCategory
        fields = "__all__"

        
class ProcessedRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProcessedRecord
        depth = 2
        fields = "__all__"


class PrinterRepairSerializer(serializers.ModelSerializer):
    class Meta:
        model=PrinterRepair
        fields = "__all__"


class CartridaySerializer(serializers.ModelSerializer):
    class Meta:
        model=Cartriday
        fields = "__all__"


class ApplicationSoftWareSerializer(serializers.ModelSerializer):
    class Meta:
        model=ApplicationSoftWare
        fields = "__all__"