from rest_framework import serializers
from .models import Group,Department,User,UserToken

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=Group
        fields = "__all__"


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Department
        fields = "__all__"

    
class UserSerializer(serializers.ModelSerializer):
    department=serializers.SerializerMethodField()
    
    def get_department(self,row):
        department_obj_list=row.department.all()
        ret=[]
        for item in department_obj_list:
            ret.append({'id':item.id,'name':item.name})
        return ret
        
    class Meta:
        model=User
        fields = "__all__"

class UserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserToken
        fields = "__all__"