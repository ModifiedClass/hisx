from rest_framework import serializers
from .models import Group,Department,User,UserToken

class GroupSerializer(serializers.ModelSerializer):
    _id=serializers.IntegerField()
    name = serializers.CharField()
    create_time=serializers.DateTimeField()
    menu=serializers.TextField()
    operation=serializers.TextField()


class DepartmentSerializer(serializers.ModelSerializer):
    _id=serializers.IntegerField()
    name=serializers.CharField()
    code=serializers.CharField()
    parent=serializers.CharField(source="parent")
    status = serializers.BooleanField() 
    create_time=serializers.DateTimeField()
    
class UserSerializer(serializers.ModelSerializer):
    _id=serializers.IntegerField()
    username=serializers.CharField()
    name=serializers.CharField()
    password=serializers.CharField()
    state=serializers.IntegerField()
    error=serializers.IntegerField()
    create_time=serializers.DateTimeField()
    isSuper = serializers.BooleanField()
    group=serializers.CharField(source="group")#外键一对多
    departments=serializers.SerializerMethodField() #外键多对多
    
    def get_departments(self,row):
        department_obj_list=row.departments.all()
        ret=[]
        fot item in department_obj_list:
            ret.append({'id':item.id})
        return ret

class UserTokenSerializer(serializers.ModelSerializer):
    user=serializers.CharField(source="user")
    token=serializers.CharField()