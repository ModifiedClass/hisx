from rest_framework import serializers
from .models import *

class ProblemCategorySerializer(serializers.ModelSerializer):
    _id=serializers.IntegerField()
    name=serializers.CharField()
    create_time=serializers.DateTimeField()

        
class ProcessedRecordSerializer(serializers.ModelSerializer):
    _id=serializers.IntegerField()
    create_time=serializers.DateTimeField()
    situation=serializers.CharField()
    solution=serializers.CharField()
    department=serializers.CharField(source="department")
    processing_mode=serializers.IntegerField()
    problem_state=serializers.IntegerField()
    discoverer=serializers.CharField(source="discoverer")
    problem_category=serializers.CharField(source="problem_category")
    handler=serializers.CharField(source="handler")


class PrinterRepairSerializer(serializers.ModelSerializer):
    _id=serializers.IntegerField()    
    printer=serializers.CharField(source="printer")
    create_time=serializers.DateField() 
    handler=serializers.CharField(source="handler")
    status=serializers.BooleanField()


class CartridaySerializer(serializers.ModelSerializer):
        
    _id=serializers.IntegerField()
    create_time=serializers.DateField()
    status=serializers.BooleanField() 
    handler=serializers.CharField(source="handler")
    nums=serializers.IntegerField()


class ApplicationSoftWareSerializer(serializers.ModelSerializer):
    _id=serializers.IntegerField()
    name=serializers.CharField()
    framework=serializers.IntegerField()
    database=serializers.IntegerField()
    device=serializers.CharField(source="device")
    deployment=serializers.CharField()
    create_time=serializers.DateTimeField()