from rest_framework import serializers
from .models import Timeline

class TimelineSerializer(serializers.ModelSerializer):
    _id=serializers.IntegerField()
    name=serializers.CharField()
    create_time=serializers.DateTimeField()
    details=serializers.TextField()