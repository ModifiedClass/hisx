from django.shortcuts import render
import json

from utils.globalutilitys import *
from informationdevice.models import DeviceInfo

# Create your views here.
def chart_processedrecord_day(request):
    pass
    '''searchdict={}
    if request.GET.get("_id"):
        searchdict['_id']=request.GET.get("_id")
    if request.GET.get("name"):
        searchdict['name__icontains']=request.GET.get("name")
    ret={'status':0,'msg':None,'data':None}
    try:
        obj=ProblemCategory.objects.filter(**searchdict).order_by('name')
        if not obj:
            ret['msg']="没有获取到数据!"
        else:
            ret['status']=1
            list=[]
            for d in obj:
                dic={}
                dic['_id']=d._id
                dic['name']=d.name
                dic['create_time']=d.create_time
                list.append(dic)
            ret['data']=list
        return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
    except Exception as e:
        ret['msg']=str(e)
        return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))'''

def chart_processedrecor(request):
    pass

def chart_device(request):
    pass
