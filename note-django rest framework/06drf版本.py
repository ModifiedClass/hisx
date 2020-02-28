#django rest fromework版本
#路由分发
#project/urls.py
from django.conf.urls import url,include
urlpatterns = [
    path('appname/',include('appname.urls')),
]
#appname/urls.py
from django.conf.urls import url
from example import views

urlpatterns = [
    path('example/$',views.ExampleView.as_View),
]
#自定义版本 url中通过get传参/?version=
#appname/views.py
from rest_framework.views import APIView
from rest_framework.versioning import BaseVersioning
class ParamVersion(object):
    def determine_version(self,request,*args,**kwargs):
        version=request.query_params.get('version')
        return version
    
class ExampleView(APIView):
    
    versioning_class=ParamVersion
    def get(self,request,*args,**kwargs):
        ret={'status':0,'msg':'msg'}
        request.version
        return HttpResponse(json.dumps(ret))

#内置版本
#views.py
from rest_framework.versioning import QueryParameterVersioning

class ExampleView(APIView):
    
    versioning_class=QueryParameterVersioning
    def get(self,request,*args,**kwargs):
        ret={'status':0,'msg':'msg'}
        request.version
        return HttpResponse(json.dumps(ret))

#setting.py
REST_FRAMEWORK={
    "DEFAULT_VERSION":'v1',
    "ALLOWED_VERSIONS":['v1','v2'],
    "VERSION_PARAM":'version',
}

#url中传参
urlpatterns = [
    path('(?p<version>[v1|v2]+)/example/$',views.ExampleView.as_View),
]

class ExampleView(APIView):
    
    versioning_class=URLPathVersioning
    def get(self,request,*args,**kwargs):
        ret={'status':0,'msg':'msg'}
        request.version
        return HttpResponse(json.dumps(ret))

REST_FRAMEWORK={
    "DEFAULT_VERSIONING_CLASS":"rest_framework.versioning.URLPathVersioning",
    "DEFAULT_VERSION":'v1',
    "ALLOWED_VERSIONS":['v1','v2'],
    "VERSION_PARAM":'version',
}