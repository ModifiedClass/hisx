from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework import exceptions
from django.db import transaction
import json

from .models import *
from .serializers import *
from utils.globalutilitys import *
from account.models import User,Department
from informationdevice.models import DeviceInfo


class ProblemCategoryView(APIView):
    '''
    问题类别
    '''
    def get(self,request,*args,**kwargs):
        ret={'status':0}
        return setzhJsonResponseHeader(ret)
        '''searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("name"):
            searchdict['name']=request.GET.get("name")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=ProblemCategory.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=ProblemCategorySerializer(instance=obj,many=True)#many 单个对象False
                ret['status']=1
                #list=[]
                #for d in obj:
                #    dic={}
                #    dic['_id']=d._id
                #    dic['name']=d.name
                #    dic['create_time']=d.create_time
                #    list.append(dic)
                #ret['data']=list
                ret['data']=ser
            return setzhJsonResponseHeader(ret)
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)'''
    
    def post(self,request,*args,**kwargs):
        #for k, v in request._request.environ.items():
        #    print(k, v)
        pb=request.body
        res=json.loads(pb)
        print(res)
        print(res['name'])
        ret={'status':0}
        return setzhJsonResponseHeader(ret)
        '''ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        name=res['name']
        try:
            with transaction.atomic():
                obj=ProblemCategory()
                obj.name=name
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)'''
        
    def delete(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id = res['_id']
        try:
            ProblemCategory.objects.filter(id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)
        
    def patch(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id=res['_id']
        name=res['name']
        try:
            with transaction.atomic():
                obj=ProblemCategory.objects.get(id=_id)
                obj.name=name
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)


class ProcessedRecordView(APIView):
    '''
    处理记录
    '''
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("situation"):
            searchdict['situation']=request.GET.get("situation")
        if request.GET.get("solution"):
            searchdict['solution']=request.GET.get("solution")
        if request.GET.get("department"):
            searchdict['department']=request.GET.get("department")
        if request.GET.get("processing_mode"):
            searchdict['processing_mode']=request.GET.get("processing_mode")
        if request.GET.get("problem_state"):
            searchdict['problem_state']=request.GET.get("problem_state")
        if request.GET.get("problem_category"):
            searchdict['problem_category']=request.GET.get("problem_category")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=ProcessedRecord.objects.filter(**searchdict).order_by('-create_time')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=ProcessedRecordSerializer(instance=obj,many=True)#many 单个对象False
                ret['status']=1
                ret['data']=ser
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=str(e)
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
    
    def post(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        situation=res['situation']
        solution=res['solution']
        department=res['department']
        processing_mode=res['processing_mode']
        problem_state=res['problem_state']
        discoverer=res['discoverer']
        problem_category=res['problem_category']
        handler=res['handler']
        try:
            with transaction.atomic():
                obj=ProcessedRecord()
                obj.situation=situation
                obj.solution=solution
                obj.department=Department.objects.get(id=department)
                obj.processing_mode=processing_mode
                obj.problem_state=problem_state
                obj.discoverer=User.objects.get(id=discoverer)
                obj.problem_category=ProblemCategory.objects.get(id=problem_category)
                obj.handler=User.objects.get(id=handler)
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
            ProcessedRecord.objects.filter(id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)
        
    def patch(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id=res['_id']
        situation=res['situation']
        solution=res['solution']
        department=res['department']
        processing_mode=res['processing_mode']
        problem_state=res['problem_state']
        discoverer=res['discoverer']
        problem_category=res['problem_category']
        handler=res['handler']
        try:
            with transaction.atomic():
                obj=ProcessedRecord.objects.get(id=_id)
                obj.situation=situation
                obj.solution=solution
                obj.department=Department.objects.get(id=department)
                obj.processing_mode=processing_mode
                obj.problem_state=problem_state
                obj.discoverer=User.objects.get(id=discoverer)
                obj.problem_category=ProblemCategory.objects.get(id=problem_category)
                obj.handler=User.objects.get(id=handler)
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)


class PrinterRepairView(APIView):
    '''
    打印机维修
    '''
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("handler"):
            searchdict['handler']=request.GET.get("handler")
        if request.GET.get("status"):
            searchdict['status']=request.GET.get("status")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=PrinterRepair.objects.filter(**searchdict).order_by('-create_time')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=PrinterRepairSerializer(instance=obj,many=True)#many 单个对象False
                ret['status']=1
                ret['data']=ser
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=str(e)
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
    
    def post(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        printer=res['printer']
        create_time=res['create_time']
        handler=res['handler']
        try:
            with transaction.atomic():
                obj=PrinterRepair()
                obj.printer=printer
                obj.create_time=create_time
                obj.handler=User.objects.get(id=handler)
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
            PrinterRepair.objects.filter(id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)
        
    def patch(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id=res['_id']
        printer=res['printer']
        create_time=res['create_time']
        handler=res['handler']
        status=res['status']
        try:
            with transaction.atomic():
                obj=PrinterRepair.objects.get(id=_id)
                obj.printer=printer
                obj.create_time=create_time
                obj.handler=User.objects.get(id=handler)
                obj.status=status if True else False
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)


class CartridayView(APIView):
    '''
    硒鼓加粉
    '''
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("handler"):
            searchdict['handler']=request.GET.get("handler")
        if request.GET.get("status"):
            searchdict['status']=request.GET.get("status")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=Cartriday.objects.filter(**searchdict).order_by('-create_time')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=CartridaySerializer(instance=obj,many=True)#many 单个对象False
                ret['status']=1
                ret['data']=ser
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=str(e)
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
    
    def post(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        create_time=res['create_time']
        handler=res['handler']
        nums=res['nums']
        try:
            with transaction.atomic():
                obj=Cartriday()
                obj.create_time=create_time
                obj.handler=User.objects.get(id=handler)
                obj.nums=nums
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
            Cartriday.objects.filter(id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)
        
    def patch(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id=res['_id']
        create_time=res['create_time']
        handler=res['handler']
        nums=res['nums']
        try:
            with transaction.atomic():
                obj=Cartriday.objects.get(id=_id)
                obj.create_time=create_time
                obj.handler=User.objects.get(id=handler)
                obj.nums=nums
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)


class ApplicationSoftWareView(APIView):
    '''
    应用软件
    '''
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("name"):
            searchdict['name']=request.GET.get("name")
        if request.GET.get("framework"):
            searchdict['framework']=request.GET.get("framework")
        if request.GET.get("database"):
            searchdict['database']=request.GET.get("database")
        if request.GET.get("device"):
            searchdict['device']=request.GET.get("device")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=ApplicationSoftWare.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=ApplicationSoftWareSerializer(instance=obj,many=True)#many 单个对象False
                ret['status']=1
                ret['data']=ser
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=str(e)
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
    
    def post(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        name=res['name']
        framework=res['framework']
        database=res['database']
        device=res['device']
        deployment=res['deployment']
        create_time=res['create_time']
        try:
            with transaction.atomic():
                obj=ApplicationSoftWare()
                obj.name=name
                obj.framework=framework
                obj.database=database
                obj.device=DeviceInfo.objects.get(id=device)
                obj.deployment=deployment
                obj.create_time=create_time
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
            ApplicationSoftWare.objects.filter(id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)
        
    def patch(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id=res['_id']
        name=res['name']
        framework=res['framework']
        database=res['database']
        device=res['device']
        deployment=res['deployment']
        create_time=res['create_time']
        try:
            with transaction.atomic():
                obj=ApplicationSoftWare.objects.get(id=_id)
                obj.name=name
                obj.framework=framework
                obj.database=database
                obj.device=DeviceInfo.objects.get(id=device)
                obj.deployment=deployment
                obj.create_time=create_time
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)