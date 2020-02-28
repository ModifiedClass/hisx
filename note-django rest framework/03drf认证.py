#django rest fromework认证
#安装
pip install djangorestframework
#使用
from django.views import View
from rest_framework.views import APIView
from rest_framework.authentication import BasicAuthentication
from rest_framework import exceptions
from rest_framework.request import Request

class MyAuthentication(object):
    def authenticate(self,request):
        token=request._request.GET.get('token')
        #数据库校验
        if not token:
            raise exceptions.AuthenticationFailed('认证失败!')
        return("",None)
        
    def authenticate_header(self,val):
        pass

class ExampleView(APIView):
    authentication_classes=[MyAuthentication]
    
    def get(self,request,*args,**kwargs):
        ret={'status':0,'msg':'msg'}
        return HttpResponse(json.dumps(ret))

#源码流程：
入口方法：dispatch
二次封装request(扩展认证/权限/版本/节流)返回

#登录认证
#1建表
class User(models.Model):
    id=models.AutoField(primary_key=True)
    username=models.CharField(max_length=30)
    password=models.CharField(max_length=50,blank=True,null=True)

    def __str__(self):
        return self.username
        
class UserToken(models.Model):
    user=models.OneToOneField(to=User)
    token=models.CharField(max_length=64)
    
#2登录并生成token
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from appname import models

def md5(user):
    import hashlib
    import time
    
    ctime=str(time.time())
    m=hashlib.md5(bytes(user,encoding='utf-8'))
    m.update(bytes(ctime,encoding='utf-8'))
    return m.hexdigest()

class AuthView(APIView):
    #局部绕过认证
    authentication_classes=[]
    def post(self,request,*args,**kwargs):
        ret={'status':1,'msg':None,'data':None}
        try:
            username=request._request.POST.get('username')
            password=request._request.POST.get('password')
            obj=models.User.objects.filter(username=,password=).first()
            if not obj:
                ret['status']=2
                ret['msg']="error"
                
            token=md5(username)
            models.UserToken.objects.update_or_create(user=obj,defaults={'token':token})
            ret['data']=token
        except Exception as e:
            ret['status']=3
            ret['msg']="error"
        
    return JsonResponse(ret)
#3认证
#局部认证
class Authtication(object):
    def authenticate(self,request):
        token=request._request.GET.get('token')
        token_obj=models.UserToken.objects.filter(token=token).first()
        if not token_obj:
            raise exceptions.AuthenticationFailed('auth error')
        #rest framework内部将两个字段赋值给request供后续使用
        return (token_obj.user,token_obj)
    
class ExampleView(APIView):
    authentication_classes=[Authtication,]
    def get(self,request,*args,**kwargs):
        ret={'status':0,'msg':'msg'}
        try:
            data=
            ret['data']=data
        except Exception as e:
            pass
        return JsonResponse(json.dumps(ret))
#认证流程
ExampleView继承APIView，APIView类-dispatch方法-封装request-新request-get_authenticatiors()-
return auth() for auth in self.authentication_classes-APIView类中-
authentication_classes=api_settings.DEFAULT_AUTHENTICATION_CLASS-配置文件
或者ExampleView自定义authentication_classes

#配置文件全局认证 setting中增加REST_FRAMEWORK字段
#appname/utils/auth.py
###########################################################
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
###########################################################################
REST_FRAMEWORK={
    #认证类放到自定义文件夹auth中
    "DEFAULT_AUTHENTICATION_CLASSES":['appname.utils.auth.FirstAuthication','Authtication'],
    "UNAUTHENTICATED_USER":None,   #匿名用户 request.user=None
    "UNAUTHENTICATED_TOKEN":None,   #匿名用户 request.auth=None
}
#内置认证
