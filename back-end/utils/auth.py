#用户验证
from rest_framework import exceptions
#内置认证
from rest_framework.authentication import BasicAuthentication
from account import models

class FirstAuthication(BasicAuthentication):
    def authenticate(self,request):
        pass
        
    def authenticate_header(self,request):
        pass

class Authtication(BasicAuthentication):
    '''
    用于用户认证
    '''
    def authenticate(self,request):
        token=request._request.GET('token')
        token_obj=models.UserToken.objects.filter(token=token).first()
        if not token_obj:
            raise exceptions.AuthenticationFailed('error')
        #rest_framework将两个字段赋值给request返回
        return(token_obj.user,token_obj)
        
    def authenticate_header(self,request):
        pass
            