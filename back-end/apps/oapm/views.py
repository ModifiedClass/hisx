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
        searchdict={}
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
                ser=ProblemCategorySerializer(instance=obj,many=True).data#many 单个对象False
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
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
    
    def post(self,request,*args,**kwargs):
        #for k, v in request._request.environ.items():
        #    print(k, v)
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        try:
            with transaction.atomic():
                obj=ProblemCategory()
                obj.name=res['name']
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        
    def delete(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id = res['_id']
        try:
            ProblemCategory.objects.filter(_id = res['_id']).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        
    def patch(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        try:
            with transaction.atomic():
                obj=ProblemCategory.objects.get(_id=res['_id'])
                if 'name' in res:
                    obj.name=res['name']
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


class ProcessedRecordView(APIView):
    '''
    处理记录
    '''
    def get(self,request,*args,**kwargs):
        pageSize=int(request.GET.get("pageSize")) if request.GET.get("pageSize") else 2
        pageNum=int(request.GET.get("pageNum")) if request.GET.get("pageNum") else 1
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("searchName") and request.GET.get("searchType"):
            if request.GET.get("searchType")=='situation':
                searchdict['situation__icontains']=request.GET.get("searchName")
            else:
                searchdict['solution__icontains']=request.GET.get("searchName")
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
                nums=ProcessedRecord.objects.filter(**searchdict).count()
                start=(pageNum - 1) * pageSize
                end=nums if nums<pageNum*pageSize else pageNum*pageSize
                prs=obj[start:end]
                ser=ProcessedRecordSerializer(instance=prs,many=True).data#many 单个对象False
                objs = { "list" : ser, "total" : nums }
                ret['status']=1
                ret['data']=objs
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
    
    def post(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        try:
            with transaction.atomic():
                obj=ProcessedRecord()
                if 'situation' in res:
                    obj.situation=res['situation']
                if 'solution' in res:
                    obj.solution=res['solution']
                if 'processing_mode' in res:
                    obj.processing_mode=res['processing_mode']
                if 'problem_state' in res:
                    obj.problem_state=res['problem_state']
                if 'discoverer' in res:
                    obj.discoverer=User.objects.get(_id=res['discoverer'])
                if 'problem_category' in res:
                    obj.problem_category=ProblemCategory.objects.get(_id=res['problem_category'])
                if 'handler' in res:
                    obj.handler=User.objects.get(_id=res['handler'])
                obj.save()
                if "department" in res:
                    departments=Department.objects.filter(_id__in=res['department'])
                    obj.department.clear()
                    obj.department.add(*departments)
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        
    def delete(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id = res['_id']
        try:
            ProcessedRecord.objects.filter(_id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        
    def patch(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        try:
            with transaction.atomic():
                obj=ProcessedRecord.objects.get(_id=res['_id'])
                if 'situation' in res:
                    obj.situation=res['situation']
                if 'solution' in res:
                    obj.solution=res['solution']
                if 'department' in res:
                    departments=Department.objects.filter(_id__in=res['department'])
                    obj.department.clear()
                    obj.department.add(*departments)
                if 'processing_mode' in res:
                    obj.processing_mode=res['processing_mode']
                if 'problem_state' in res:
                    obj.problem_state=res['problem_state']
                if 'discoverer' in res:
                    obj.discoverer=User.objects.get(_id=res['discoverer'])
                if 'problem_category' in res:
                    obj.problem_category=ProblemCategory.objects.get(_id=res['problem_category'])
                if 'handler' in res:
                    obj.handler=User.objects.get(_id=res['handler'])
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


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
                ser=PrinterRepairSerializer(instance=obj,many=True).data#many 单个对象False
                ret['status']=1
                ret['data']=ser
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
    
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
                obj.handler=User.objects.get(_id=handler)
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        
    def delete(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id = res['_id']
        try:
            PrinterRepair.objects.filter(_id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        
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
                obj=PrinterRepair.objects.get(_id=_id)
                obj.printer=printer
                obj.create_time=create_time
                obj.handler=User.objects.get(_id=handler)
                obj.status=status if True else False
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
            
    def put(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        searchdict={}
        searchdict['handler']=request.GET.get("handler")
        searchdict['status']=False
        try:
            with transaction.atomic():
                PrinterRepair.objects.filter(**searchdict).update(status=True)
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


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
                ser=CartridaySerializer(instance=obj,many=True).data#many 单个对象False
                ret['status']=1
                ret['data']=ser
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
    
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
                obj.handler=User.objects.get(_id=handler)
                obj.nums=nums
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        
    def delete(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id = res['_id']
        try:
            Cartriday.objects.filter(_id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        
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
                obj=Cartriday.objects.get(_id=_id)
                obj.create_time=create_time
                obj.handler=User.objects.get(_id=handler)
                obj.nums=nums
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
            
    def put(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        searchdict={}
        searchdict['_handler']=request.GET.get("_handler")
        searchdict['status']=False
        try:
            with transaction.atomic():
                Cartriday.objects.filter(**searchdict).update(status=True)
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


class ApplicationSoftWareView(APIView):
    '''
    应用软件
    '''
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("name"):
            searchdict['name__icontains']=request.GET.get("name")
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
                ser=ApplicationSoftWareSerializer(instance=obj,many=True).data#many 单个对象False
                ret['status']=1
                ret['data']=ser
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
    
    def post(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        try:
            with transaction.atomic():
                obj=ApplicationSoftWare()
                if 'name' in res:
                    obj.name=res['name']
                if 'framework' in res:
                    obj.framework=res['framework']
                if 'database' in res:
                    obj.database=res['database']
                if 'device' in res:
                    obj.device=DeviceInfo.objects.get(_id=res['device'])
                if 'deployment' in res:
                    obj.deployment=res['deployment']
                if 'create_time' in res:
                    obj.create_time=res['create_time']
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        
    def delete(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id = res['_id']
        try:
            ApplicationSoftWare.objects.filter(_id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        
    def patch(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        try:
            with transaction.atomic():
                obj=ApplicationSoftWare.objects.get(_id=res['_id'])
                if 'name' in res:
                    obj.name=res['name']
                if 'framework' in res:
                    obj.framework=res['framework']
                if 'database' in res:
                    obj.database=res['database']
                if 'device' in res:
                    obj.device=DeviceInfo.objects.get(_id=res['device'])
                if 'deployment' in res:
                    obj.deployment=res['deployment']
                if 'create_time' in res:
                    obj.create_time=res['create_time']
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


class ImgView(APIView):
    def post(self, request):
        from utils.globalutilitys import pwdenc
        import datetime
        ret={'status':0,'msg':None,'data':None}
        f = request.FILES['img']#request.FILES.get('img')
        f_name = pwdenc(datetime.datetime.now())
        try:
            img = Img()
            img.name = f_name
            img.path = f
            img.save()
            ret['status']=1
            ret['data']=f_name
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))