from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework import exceptions
from django.db import transaction
import json

class TimelineView(APIView):
    '''
    时间轴
    '''
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("name"):
            searchdict['name']=request.GET.get("name")
        if request.GET.get("name"):
            searchdict['details']=request.GET.get("details")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=Timeline.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=TimelineSerializer(instance=obj,many=True)#many 单个对象False
                ret['status']=1
                ret['data']=ser
            return setzhJsonResponseHeader(ret)
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)
    
    def post(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        name=res['name']
        details=res['details']
        try:
            with transaction.atomic():
                obj=Timeline()
                obj.name=name
                obj.details=details
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)
        
    def delete(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id = res['_id']
        try:
            Timeline.objects.filter(id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(ret)
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)
        
    def patch(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id=res['_id']
        name=res['name']
        details=res['details']
        try:
            with transaction.atomic():
                obj=Timeline.objects.get(id=_id)
                obj.name=name
                details=details
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)
