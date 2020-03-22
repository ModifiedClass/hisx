#原理：
    #url->view方法->dispatch方法(反射执行get/post/delete/put等方法)
    urlpatterns = [
        path('example/$',views.UserView.as_view()),
    ]
#流程：
    import json
    from django.shortcuts import render,HttpResponse
    class ExampleView(View):

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

#继承()
    class MyBaseView(object):
        def dispatch(self,request,*args,**kwargs):
            return super(UserView,self).dispatch(request,*args,**kwargs)
            
    class ExampleView(MyBaseView,View):
        def get(self,request,*args,**kwargs):
            return HttpResponse('GET:查询')
           
#绕过csrf验证
#1函数加标签@csrf_exempt 
#2注释setting.py中
MIDDLEWARE = [
    #'django.middleware.csrf.CsrfViewMiddleware',
]
#3局部使用csrf验证@csrf_protect

#cbv中使用装饰器
#方法1
import django.views.decorators.csrf import csrf_exempt,csrf_protect
import django.utils.decorators import method_decorator
class UserView(MyBaseView,View):
    @method_decorator(csrf_exempt)
    def dispatch(self,request,*args,**kwargs):
        return super(UserView,self).dispatch(request,*args,**kwargs)
 
    def get(self,request,*args,**kwargs):
        return HttpResponse('GET:查询')
        
#方法2
@method_decorator(csrf_exempt,name='dispatch')
class ExampleView(MyBaseView,View):
    
    def get(self,request,*args,**kwargs):
        return HttpResponse('GET:查询')
