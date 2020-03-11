from rest_framework import serializers
from .models import *

class DeviceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=DeviceCategory
        fields = "__all__"

        
class DeviceModelSerializer(serializers.ModelSerializer): 
    class Meta:
        model=DeviceModel
        fields = "__all__"


class InstallLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model=InstallLocation
        fields = "__all__"

        
class DeviceInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model=DeviceInfo
        depth = 2
        fields = "__all__"


class DeviceTopoSerializer(serializers.ModelSerializer):
    class Meta:
        model=DeviceTopo
        fields = "__all__"