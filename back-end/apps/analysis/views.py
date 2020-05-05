from django.shortcuts import render
from django.db.models import Count
import json
import datetime

from utils.globalutilitys import *
from utils.datetimeutilitys import *
from oapm.models import ProblemCategory,ProcessedRecord
from informationdevice.models import DeviceInfo,DeviceCategory

# Create your views here.
def chart_processedrecord_day(request):
    """获取最近n天问题记录""" 
    ret={'xdate':None,'legenddata':None,'seriesdata':None}
    begin_date = (datetime.datetime.now() - datetime.timedelta(days =30)).strftime("%Y-%m-%d")
    startdate = datetime.datetime.strptime(begin_date, "%Y-%m-%d")
    enddate = datetime.datetime.strptime(time.strftime('%Y-%m-%d',time.localtime(time.time())), "%Y-%m-%d")
    xdate=getnDays(startdate,enddate)
    legenddata=[]
    pc=ProblemCategory.objects.all()
    pr=ProcessedRecord.objects.filter(create_time__range=(startdate, enddate))
    for p in pc:
        legenddata.append(p.name)
    seriesdata=[]
    for l in legenddata:
        two=[]
        for x in xdate:
            nums=0
            for p in pr:
                if str(p.create_time)[0:10]==str(x) and p.problem_category.name==l:
                    nums=nums+1
            two.append(nums)
        seriesdata.append({
            'name': l,
            'type': 'line',
            'smooth': True,
            'data':two
        })
    ret['xdate']=xdate
    ret['legenddata']=legenddata
    ret['seriesdata']=seriesdata
    return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


def chart_processedrecord(request):
    """获取问题结构""" 
    ret={'legenddata':None,'seriesdata':None,'sum':None}
    legenddata=[]
    seriesdata=[]
    pc=ProblemCategory.objects.values('name').annotate()
    pr=ProcessedRecord.objects.values('problem_category__name').annotate(nums=Count('_id'))
    sum=len(ProcessedRecord.objects.all())
    for p in pc:
        legenddata.append(p['name'])
    for r in pr:
        seriesdata.append({'value': r['nums'], 'name': r['problem_category__name']})
    ret['legenddata']=legenddata
    ret['seriesdata']=seriesdata
    ret['sum']=len(ProcessedRecord.objects.all())
    return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


def chart_device(request):
    """获取设备结构""" 
    ret={'data':None,'sum':0,}
    di=DeviceInfo.objects.values('devicemodel__devicecategory__name').annotate(nums=Count('_id'))
    sum=len(DeviceInfo.objects.all())
    data=[]
    for i in di:
        data.append({'value':i['nums'], 'name': i['devicemodel__devicecategory__name']})
    ret['data']=data
    ret['sum']=sum
    return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
