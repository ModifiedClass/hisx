from rest_framework import serializers
from .models import Group,Department,User,UserToken

class GroupSerializer(serializers.Serializer):
    _id=serializers.IntegerField()
    name = serializers.CharField()
    create_time=serializers.DateTimeField()
    menu=serializers.CharField()
    operation=serializers.CharField()


class DepartmentSerializer(serializers.Serializer):
    _id=serializers.IntegerField()
    name=serializers.CharField()
    code=serializers.CharField()
    parent=serializers.CharField(source="parent")
    status = serializers.BooleanField() 
    create_time=serializers.DateTimeField()
    
class UserSerializer(serializers.ModelSerializer):
    '''_id=serializers.IntegerField()
    username=serializers.CharField()
    name=serializers.CharField()
    password=serializers.CharField()
    state=serializers.IntegerField()
    error=serializers.IntegerField()
    create_time=serializers.DateTimeField()
    isSuper = serializers.BooleanField()
    group=serializers.CharField(source="Group")#外键一对多
    departments=serializers.SerializerMethodField() #外键多对多
    
    def get_departments(self,row):
        department_obj_list=row.departments.all()
        ret=[]
        for item in department_obj_list:
            ret.append({'id':item.id})
        return ret'''
    departments=serializers.SerializerMethodField()
    class Meta:
        model=User
        fields=['_id','username','password','departments']

class UserTokenSerializer(serializers.Serializer):
    user=serializers.CharField(source="user")
    token=serializers.CharField()