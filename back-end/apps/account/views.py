from django.shortcuts import render
from rest_framework import viewsets

from .models import User
from .serializers import UserSerializer



# Create your views here.

'''class UserViewSet(viewsets.ModelViewSet):
    queryset=User.object.order_by('name')
    serializer_class=UserSerializer
    
from django.views import View
class UserView(View):
    #使用装饰器方法
    #cbv模式装饰器
    from django.views.decorators.csrf import csrf_exempt,csrf_protect
    from django.utils.decorators import method_decorators
    
    @method_decorators(csrf_exempt)
    def dispatch(self,request,*args,**kwargs):
        return super(UserView,self).dispatch(request,*args,**kwargs)
        
    def get(self,request,*args,**kwargs):
        return HttpResponse('GET:查询')
    
    def post(self,request,*args,**kwargs):
        return HttpResponse('POST:新增')
    
    def put(self,request,*args,**kwargs):
        return HttpResponse('PUT:修改（全部更新）')
        
    def delete(self,request,*args,**kwargs):
        return HttpResponse('DELETE:删除')
        
    def patch(self,request,*args,**kwargs):
        return HttpResponse('PATCH:修改（部分更新）')
    
    def head(self,request,*args,**kwargs):
        return HttpResponse('HEAD:查询响应头信息，不包含响应主体')
    
    def options(self,request,*args,**kwargs):
        return HttpResponse('OPTIONS:非简单请求之前预检，通过后才执行get post等')
        
    def trace(self,request,*args,**kwargs):
        return HttpResponse('TRACE:请求服务器回显其收到的请求信息')
        
    def connect(self,request,*args,**kwargs):
        return HttpResponse('CONNECT:将连接改为管道方式的代理服务器')
'''
        
#验证示例
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework import exceptions

from .serializers import ExampleSerializer
class ExampleView(APIView):
    def get(self,request,*args,**kwargs):
        ret={'status':0,'msg':'msg','data':None}
        examples=models.Example.objects.all()
        ser=ExampleSerializer(instance=examples,many=True)#many 单个对象False
        ret['data']=ser
        return JsonResponse(json.dumps(ret,ensure_ascii=False))

def md5(user):
    import hashlib
    import time
    
    ctime=str(time.time())
    m=hashlib.md5(bytes(user,encoding='utf-8'))
    m.update(bytes(ctime,encoding='utf-8'))
    return m.hexdigest()

class AuthView(APIView):
    '''
    登录认证
    '''
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

            
class UserView(APIView):
    '''
    用户相关
    '''
    def get(self,request,*args,**kwargs):
        ret={'status':1,'msg':None,'data':None}
        try:
            obj=models.User.objects.exclude(isDelete=True).order_by('name')
            if not obj:
                ret['status']=2
                ret['msg']="error"
            ret['data']=obj
        except Exception as e:
            ret['status']=3
            ret['msg']="error"
        
    return JsonResponse(ret)