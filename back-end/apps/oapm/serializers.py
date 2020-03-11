from rest_framework import serializers
from .models import *

class ProblemCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=ProblemCategory
        fields = "__all__"

        
class ProcessedRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProcessedRecord
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
        model=Department
        fields = "__all__"