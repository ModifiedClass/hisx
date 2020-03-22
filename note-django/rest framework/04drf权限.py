#django rest fromework权限
#局部权限
class MyPermission(object):
    def has_permission(self,request,view):
        if not request.user.user_type!=3:
            return False
        return True

class ExampleView(APIView):
    permission_classes=[MyPermission]
    
    def get(self,request,*args,**kwargs):
        ret={'status':0,'msg':'msg'}
        return HttpResponse(json.dumps(ret))


#配置文件全局权限 
#appname/utils/permission.py
###########################################################
from rest_framework import exceptions
from account import models

class SVIPPermission(object):
    message="svip才能访问！"
    def has_permission(self,request,view):
        if not request.user.user_type!=3:
            return False
        return True
###########################################################################
#view.py
import appname.utils.permission import SVIPPermission
#setting.py
REST_FRAMEWORK={
    "DEFAULT_PERMISSION_CLASSES":['appname.utils.permission.SVIPPermission'],
}
