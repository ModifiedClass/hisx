from rest_framework import serializers
from .models import DeviceCategory,DeviceModel,InstallLocation,DeviceInfo,devicetopo

class DeviceCategorySerializer(serializers.ModelSerializer):
    _id=serializers.IntegerField()
    name=serializers.CharField()
    create_time=serializers.DateTimeField()

        
class DeviceModelSerializer(serializers.ModelSerializer): 
    _id=serializers.IntegerField()
    name=serializers.CharField()
    devicectegory=serializers.CharField(source="devicectegory")
    create_time=serializers.DateTimeField()


class InstallLocationSerializer(serializers.ModelSerializer):
    _id=serializers.IntegerField()
    name=serializers.CharField()
    create_time=serializers.DateTimeField()

        
class DeviceInfoSerializer(serializers.ModelSerializer):
    class Meta:
        depth = 2
        
    _id=serializers.IntegerField()
    name=serializers.CharField()
    sn=serializers.CharField()
    status=serializers.IntegerField()
    devicemodel=serializers.CharField(source="devicemodel")
    ip=serializers.CharField()
    mac=serializers.CharField()
    installdate=serializers.DateField()
    parent=serializers.CharField(source="parent")
    runos=serializers.IntegerField()
    installlocation=serializers.CharField(source="installlocation")
    create_time=serializers.DateTimeField()


class devicetopoSerializer(serializers.ModelSerializer):
    _id=serializers.IntegerField()
    icon=serializers.CharField()
    x=serializers.IntegerField()
    y=serializers.IntegerField()
    device=serializers.CharField(source="device")