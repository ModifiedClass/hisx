from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        filds=(id,username,name,password,state,error,create_time,isDelete,group,department,)
