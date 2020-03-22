#django rest fromework分页
#按每页行数计算分页
#urls.py
urlpatterns = [
    path('(?p<version>[v1|v2]+)/example/$',views.ExampleView.as_View),
]

#setting.py
REST_FRAMEWORK={
    "PAGE_SIZE":10,
}

#utils/serializers/example.py
from rest_framework import Serializers
class ExampleSerializer(Serializers.ModelSerializer):
    class Meta:
        model=models.Example
        fields="__all__"
#views.py

from appname.utils.serializers.example import ExampleSerializer
from rest_framework.response import Response #渲染器
from rest_framework.pagination import PageNumberPagination
class ExampleView(APIView):
    
    def get(self,request,*args,**kwargs):
        examples=models.Example.objects.all()
        ser=ExampleSerializer(instance=examples,many=True)
        pg=PageNumberPagination()
        pg_examples=pg.paginate_queryset(queryset=examples,request=request,view=self)
        return Response(ser.data)
#/appname/v1/example/?page=页数

#自定义分页类
#views.py
class MyPageNumberPagination(PageNumberPagination):
    page_size=10    #每页行数
    page_size_query_param='size' #?page=1&size=5  自定义行数
    max_page_size=15   #每页最大行数
    page_query_param='page'  #页码参数

class ExampleView(APIView):
    def get(self,request,*args,**kwargs):
        examples=models.Example.objects.all()
        ser=ExampleSerializer(instance=examples,many=True)
        pg=MyPageNumberPagination()
        pg_examples=pg.paginate_queryset(queryset=examples,request=request,view=self)
        return pg.get_pagination_response(ser.data) #rf自带渲染

#按指定位置向后分页 适合大量数据分页
#?offset=1&limit=10  从索引1位置往后10行为当前页
#views.py
from rest_framework.pagination import LimitoffsetPagination
class MyLimitoffsetPagination(LimitoffsetPagination):
    default_limit=10    #每页行数
    limit_query_param='size' #?page=1&size=5  自定义行数
    max_page_limit=15   #每页最大行数
    offset_query_param='offset'  #页码参数

class ExampleView(APIView):
    def get(self,request,*args,**kwargs):
        examples=models.Example.objects.all()
        ser=ExampleSerializer(instance=examples,many=True)
        pg=MyLimitoffsetPagination()
        pg_examples=pg.paginate_queryset(queryset=examples,request=request,view=self)
        return pg.get_pagination_response(ser.data) #rf自带渲染
        
#加密分页,只显示上一页下一页
#?cursor=加密页码
from rest_framework.pagination import CursorPagination

class MyCursorPagination(CursorPagination):
    default_limit=10    #每页行数
    page_size_query_param='size' #?page=1&size=5  自定义行数
    max_page_size=15   #每页最大行数
    cursor_query_param='cursor'  #页码参数
    ordering='id' #排序字段
    
class ExampleView(APIView):
    def get(self,request,*args,**kwargs):
        examples=models.Example.objects.all()
        ser=ExampleSerializer(instance=examples,many=True)
        pg=CursorPagination()
        pg_examples=pg.paginate_queryset(queryset=examples,request=request,view=self)
        return pg.get_pagination_response(ser.data) #rf自带渲染