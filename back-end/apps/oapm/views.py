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
        isPage=False
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
        if request.GET.get("startdate"):#__range=(startdate, enddate)
            searchdict['create_time__gte']=request.GET.get("startdate")
        if request.GET.get("enddate"):
            searchdict['create_time__lte']=request.GET.get("enddate")
        if request.GET.get("isPage"):
            if str(request.GET.get("isPage"))=='true':
                isPage=True
            else:
                isPage=False
        ret={'status':0,'msg':None,'data':None}
        try:
            if isPage:
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
            else:
                obj=ProcessedRecord.objects.filter(**searchdict).order_by('-create_time')
                if not obj:
                    ret['msg']="没有获取到数据!"
                else:
                    nums=ProcessedRecord.objects.filter(**searchdict).count()
                    ser=ProcessedRecordSerializer(instance=obj,many=True).data#many 单个对象False
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
                if 'create_time' in res:
                    obj.create_time=res['create_time']
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
                if 'discovergroup' in res:
                    obj.discovergroup=Group.objects.get(_id=res['discovergroup'])
                if 'problem_category' in res:
                    obj.problem_category=ProblemCategory.objects.get(_id=res['problem_category'])
                if 'handler' in res:
                    obj.handler=User.objects.get(_id=res['handler'])
                if 'imgs' in res:
                    obj.imgs=res['imgs']
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
                if 'create_time' in res:
                    obj.create_time=res['create_time']
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
                if 'discovergroup' in res:
                    obj.discovergroup=Group.objects.get(_id=res['discovergroup'])
                if 'problem_category' in res:
                    obj.problem_category=ProblemCategory.objects.get(_id=res['problem_category'])
                if 'handler' in res:
                    obj.handler=User.objects.get(_id=res['handler'])
                if 'imgs' in res:
                    obj.imgs=res['imgs']
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
            if str(request.GET.get("status"))=='true':
                searchdict['status']=True
            else:
                searchdict['status']=False
        ret={'status':0,'msg':None,'data':None}
        print(searchdict)
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
        try:
            with transaction.atomic():
                obj=PrinterRepair()
                if 'printer' in res:
                    obj.printer=DeviceInfo.objects.get(_id=res['printer'])
                if 'create_time' in res:
                    obj.create_time= res['create_time']
                if 'handler' in res:
                    obj.handler=User.objects.get(_id=res['handler'])
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
        try:
            with transaction.atomic():
                obj=PrinterRepair.objects.get(_id=res['_id'])
                if 'printer' in res:
                    obj.printer=DeviceInfo.objects.get(_id=res['printer'])
                if 'create_time' in res:
                    obj.create_time= res['create_time']
                if 'handler' in res:
                    obj.handler=User.objects.get(_id=res['handler'])
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
        searchdict['handler']=res['handler']
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
    import datetime
    '''
    硒鼓加粉
    '''
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("_handler"):
            searchdict['_handler']=request.GET.get("_handler")
        if request.GET.get("status"):
            if str(request.GET.get("status"))=='true':
                searchdict['status']=True
            else:
                searchdict['status']=False
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
        print(res)
        try:
            with transaction.atomic():
                obj=Cartriday()
                if 'create_time' in res:
                    obj.create_time= res['create_time']
                if '_handler' in res:
                    obj._handler=User.objects.get(_id=res['_handler'])
                if 'nums' in res:
                    obj.nums=int(res['nums'])
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
        try:
            with transaction.atomic():
                obj=Cartriday.objects.get(_id=res['_id'])
                if 'create_time' in res:
                    obj.create_time= res['create_time']
                if '_handler' in res:
                    obj._handler=User.objects.get(_id=res['_handler'])
                if 'nums' in res:
                    obj.nums=int(res['nums'])
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
        searchdict['_handler']=res['_handler']
        searchdict['status']=False
        try:
            with transaction.atomic():
                obj=Cartriday.objects.filter(**searchdict).update(status=True)
                ret['data']=obj
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
        from utils.globalutilitys import save_image
        ret={'status':0,'msg':None,'data':None}
        f = request.FILES['image']
        try:
            filename,full_filename,url=save_image(f)
            ret['status']=1
            ret['data']=[filename,full_filename,url]
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))

def export_ProcessedRecord_excel(request):
    import xlwt
    from io import BytesIO
    import re
    searchdict={}
    if request.GET.get("startdate"):#__range=(startdate, enddate)
        searchdict['create_time__gte']=request.GET.get("startdate")
    if request.GET.get("enddate"):
        searchdict['create_time__lte']=request.GET.get("enddate")
    # 设置HTTPResponse的类型
    response = HttpResponse(content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment;filename=ProcessedRecord.xls'
    # 创建一个文件对象
    wb = xlwt.Workbook(encoding='utf8')
    # 创建一个sheet对象
    sheet = wb.add_sheet('ProcessedRecord-sheet')

    # 写入文件标题
    sheet.write(0,0,'记录时间')
    sheet.write(0,1,'问题情况')
    sheet.write(0,2,'解决办法')
    sheet.write(0,3,'处理方式')
    sheet.write(0,4,'问题状态')
    sheet.write(0,5,'发生部门')
    sheet.write(0,6,'发现人')
    sheet.write(0,7,'问题类别')
    sheet.write(0,8,'处理人')

    # 写入数据
    data_row = 1
    obj=ProcessedRecord.objects.filter(**searchdict).values('create_time','situation','solution','processing_mode','problem_state','department__name','discoverer__name','problem_category__name','handler__name').order_by('-create_time')
    pre = re.compile('>(.*?)<')
    for i in obj:
        # 格式化datetime
        pri_time = i['create_time'].strftime('%Y-%m-%d')
        solution = ''.join(pre.findall(i['solution']))
        processing_mode=''
        if i['processing_mode']==1:
            processing_mode='远程处理'
        elif i['processing_mode']==2:
            processing_mode='现场处理'
        elif i['processing_mode']==3:
            processing_mode='内部处理'
        else:
            processing_mode='第三方处理'
        problem_state=''
        if i['problem_state']==1:
            problem_state='待处理'
        elif i['problem_state']==2:
            problem_state='已处理'
        else:
            problem_state='需跟进'
        sheet.write(data_row,0,pri_time)
        sheet.write(data_row,1,i['situation'])
        sheet.write(data_row,2,solution)
        sheet.write(data_row,3,processing_mode)
        sheet.write(data_row,4,problem_state)
        sheet.write(data_row,5,i['department__name'])
        sheet.write(data_row,6,i['discovergroup__name'])
        sheet.write(data_row,7,i['problem_category__name'])
        sheet.write(data_row,8,i['handler__name'])
        data_row = data_row + 1

    # 写出到IO
    output = BytesIO()
    wb.save(output)
    # 重新定位到开始
    output.seek(0)
    response.write(output.getvalue())
    return response