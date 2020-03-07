#django rest fromework序列化
#方式1
#views.py
from django.http import JsonResponse
class ExampleView(APIView):
    def get(self,request,*args,**kwargs):
        ret={'status':0,'msg':'msg','data':None}
        examples=models.Example.objects.all().values('_id','name')
        examples=list(examples)
        ret['data']=example
        return JsonResponse(json.dumps(ret,ensure_ascii=False))

#方式2
#views.py
from django.http import JsonResponse
from rest_framework import Serializers

class ExampleSerializer(serializers.Serializer):
    id=Serializers.IntegerField()
    name=Serializers.CharField()
        

class ExampleView(APIView):
    def get(self,request,*args,**kwargs):
        ret={'status':0,'msg':'msg','data':None}
        examples=models.Example.objects.all()
        ser=ExampleSerializer(instance=examples,many=True)#many 单个对象False
        ret['data']=ser
        return JsonResponse(json.dumps(ret,ensure_ascii=False))

#自定义字段
#views.py
from django.http import JsonResponse
from rest_framework import Serializers

class ExampleSerializer(serializers.Serializer):
    id=Serializers.IntegerField()
    name=Serializers.CharField()
    type=Serializers.CharField(source="modelsname.name")#外键一对多
    types=Serializers.SerializerMethodField()#外键多对多
    
    def get_types(self,row):
        type_obj_list=row.types.all()
        ret=[]
        fot item in type_obj_list
            ret.append({'id':item.id,'name':item.name})
        return ret

class ExampleView(APIView):
    def get(self,request,*args,**kwargs):
        ret={'status':0,'msg':'msg','data':None}
        examples=models.Example.objects.all()
        ser=ExampleSerializer(instance=examples,many=True)#many 单个对象False
        ret['data']=ser
        return JsonResponse(json.dumps(ret,ensure_ascii=False))
        
#ModelSerializer序列化
#serializers.py
class ExampleSerializer(serializers.ModelSerializer):
    types=Serializers.SerializerMethodField()
    class Meta:
        model=models.example
        fields=['id','name','types']

#views.py
from .serializers import ExampleSerializer
class ExampleView(APIView):
    def get(self,request,*args,**kwargs):
        ret={'status':0,'msg':'msg','data':None}
        examples=models.Example.objects.all()
        ser=ExampleSerializer(instance=examples,many=True)#many 单个对象False
        ret['data']=ser
        return JsonResponse(json.dumps(ret,ensure_ascii=False))

#深度控制
#serializers.py
class ExampleSerializer(serializers.Serializer):
    types=Serializers.SerializerMethodField()
    class Meta:
        model=models.example
    depth=0#1,2代表取到第几层的数据

#生成hypermedialink
#urls.py
urlpatterns = [
    path('(?p<version>[v1|v2]+)/example/(?P<pk>\d+)$',views.ExampleView.as_View,'et'),
]

#serializers.py
class ExampleSerializer(serializers.Serializer):
    types=Serializers.HyperlinkedIdentityField(view_name='et',lookup_field='type.id',lookup_url_kwarg='et')
    class Meta:
        model=models.ExampleType
        fields=['id','name','']

#views.py
class ExampleView(APIView):
    def get(self,request,*args,**kwargs):
        ret={'status':0,'msg':'msg','data':None}
        #pk=kwargs.get('pk')
        obj=models.Example.objects.all()
        ser=ExampleSerializer(instance=examples,many=True,context={'request':request})#many 单个对象False
        ret['data']=ser
        return JsonResponse(json.dumps(ret,ensure_ascii=False))


#请求数据校验
#serializers.py
#自定义验证
class ExampleValidator(object):
    def __init__(self,base):
        self.base=base
    def __dall__(self,base):
        if not value.startswith(self.base):
            message='this field must be %s.' % self.base
            raise serializers.ValidationError(message)
    def set_context(self,serializer_field):
        pass
    
class ExampleSerializer(serializers.Serializer):
    name=serializers.CharField(error_messages={'required':'不能为空'},validators=[ExampleValidator('value'),])

#views.py
class ExampleView(APIView):
    def post(self,request,*args,**kwargs):
        ret={'status':0,'msg':'msg','data':None}
        ser=ExampleSerializer(request.data)
        if ser.is_valid():
            ret['msg']=ser.validated_data
        else:
            ret['msg']=ser.errors
        ret['data']=ser
        return JsonResponse(json.dumps(ret,ensure_ascii=False))