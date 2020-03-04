from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework import exceptions

from exmethod.globalutilitys import *
from models import *
from .serializers import *

class DeviceCategoryView(APIView):
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("name"):
            searchdict['name']=request.GET.get("name")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=DeviceCategory.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=DeviceCategorySerializer(instance=obj,many=True)#many 单个对象False
                ret['status']=1
                ret['data']=ser
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=e.message
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
    
    def post(self,request,*args,**kwargs):
        from django.db import transaction
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        name=res['name']
        try:
            with transaction.atomic():
                dc=DeviceCategory()
                dc.name=name
                dc.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except Exception as e:
            ret['msg']=e.message
            return setzhJsonResponseHeader(ret)
        
    def delete(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id = res['_id']
        try:
            DeviceCategory.objects.filter(id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=e.message
            return setzhJsonResponseHeader(ret)
        
    def patch(self,request,*args,**kwargs):
        from django.db import transaction
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id=res['_id']
        name=res['name']
        try:
            with transaction.atomic():
                dc=DeviceCategory.objects.get(id=_id)
                dc.name=name
                dc.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=e.message
            return setzhJsonResponseHeader(ret)

class DeviceModelView(APIView):
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("name"):
            searchdict['name']=request.GET.get("name")
        if request.GET.get("dcid"):
            searchdict['devicectegory_id']=request.GET.get("dcid")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=DeviceModel.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=DeviceModelSerializer(instance=obj,many=True)#many 单个对象False
                ret['status']=1
                ret['data']=ser
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=e.message
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
    
    def post(self,request,*args,**kwargs):
        from django.db import transaction
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        name=res['name']
        devicectegory_id=res['devicectegory_id']
        try:
            with transaction.atomic():
                dm=DeviceModel()
                dm.name=name
                devicectegory=DeviceCategory.objects.get(id=devicectegory_id)
                dm.devicectegory=devicectegory
                dm.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except Exception as e:
            ret['msg']=e.message
            return setzhJsonResponseHeader(ret)
        
    def delete(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id = res['_id']
        try:
            DeviceModel.objects.filter(id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=e.message
            return setzhJsonResponseHeader(ret)
        
    def patch(self,request,*args,**kwargs):
        from django.db import transaction
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id=res['_id']
        name=res['name']
        devicectegory_id=res['devicectegory_id']
        try:
            with transaction.atomic():
                dm=DeviceModel.objects.get(id=_id)
                dm.name=name
                devicectegory=DeviceCategory.objects.get(id=devicectegory_id)
                dm.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=e.message
            return setzhJsonResponseHeader(ret)


class InstallLocationView(APIView):
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("name"):
            searchdict['name']=request.GET.get("name")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=InstallLocation.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=InstallLocationSerializer(instance=obj,many=True)#many 单个对象False
                ret['status']=1
                ret['data']=ser
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=e.message
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
    
    def post(self,request,*args,**kwargs):
        from django.db import transaction
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        name=res['name']
        try:
            with transaction.atomic():
                il=InstallLocation()
                il.name=name
                il.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except Exception as e:
            ret['msg']=e.message
            return setzhJsonResponseHeader(ret)
        
    def delete(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id = res['_id']
        try:
            InstallLocation.objects.filter(id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=e.message
            return setzhJsonResponseHeader(ret)
        
    def patch(self,request,*args,**kwargs):
        from django.db import transaction
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id=res['_id']
        name=res['name']
        try:
            with transaction.atomic():
                il=InstallLocation.objects.get(id=_id)
                il.name=name
                il.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=e.message
            return setzhJsonResponseHeader(ret)



class DeviceInfoView(APIView):
    def get(self,request,*args,**kwargs):
        pageSize=int(request.GET.get("pageSize")) if request.GET.get("pageSize") else 2
        pageNumber=int(request.GET.get("pageNumber")) if request.GET.get("pageNumber") else 1
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("name"):
            searchdict['name']=request.GET.get("name")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=DeviceInfo.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                nums=DeviceInfo.objects.filter(**searchdict).count()
                start=(pageNumber - 1) * pageSize
                end=nums if nums<pageNumber*pageSize else pageNumber*pageSize
                DeviceInfos = DeviceInfo.objects.filter(**searchdict).order_by(order)[start:end]
                ser=DeviceInfoSerializer(instance=obj,many=True)#many 单个对象False
                obj = { "rows" : ser, "total" : nums }
                ret['status']=1
                ret['data']=ser
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=e.message
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
    
    def post(self,request,*args,**kwargs):
    '''
    from django.db import transaction
    pb=request.body
    res=json.loads(pb)
    whlistoper=res['whlistoper']
    whlistid=res['whlistid']
    whsource=res["whsource"]
    whmodule=res["whmodule"]
    department=res["department"]
    whsituation=res["whsituation"]
    whreason=res["whreason"]
    domethod=res["domethod"]
    domodel=res["domodel"]
    if whlistoper=="add":
        try:
            with transaction.atomic():
                wh=WhList()
                wh.whsource=whsource
                wh.whmodule=WhModule.objects.get(id=whmodule)
                wh.department=Department.objects.get(id=department)
                ws,created=WhSituation.objects.get_or_create(name=whsituation)
                wh.whsituation=ws
                wre,created=WhReason.objects.get_or_create(name=whreason)
                wh.whreason=wre
                dm,created=DoMethod.objects.get_or_create(name=domethod)
                wh.domethod=dm
                wh.domodel=domodel
                wh.save()
                return setzhResponseHeader({"sign":1,"message":"操作成功!"})
        except:
            return setzhResponseHeader({"sign":0,"message":e.message})
    elif whlistoper == "edit":
        print(whlistid)
        try:
            with transaction.atomic():
                wh=WhList.objects.get(id=whlistid)
                wh.whsource=whsource
                wh.whmodule=WhModule.objects.get(id=whmodule)
                wh.department=Department.objects.get(id=department)
                ws,created=WhSituation.objects.get_or_create(name=whsituation)
                wh.whsituation=ws
                wre,created=WhReason.objects.get_or_create(name=whreason)
                wh.whreason=wre
                dm,created=DoMethod.objects.get_or_create(name=domethod)
                wh.domethod=dm
                wh.domodel=domodel
                wh.save()
                return setzhResponseHeader({"sign":1,"message":"操作成功!"})
        except:
            return setzhResponseHeader({"sign":0,"message":e.message})
    else:
        return setzhResponseHeader({"sign":0,"message":"操作失败!!"})
    '''
        ret={'status':1,'msg':None,'data':None}
        try:
            username=request._request.POST.get('username')
            password=request._request.POST.get('password')
            models.UserToken.objects.update_or_create(user=obj,defaults={'token':token})
            ret['data']=token
        except Exception as e:
            ret['status']=3
            ret['msg']="error"
    
    def put(self,request,*args,**kwargs):
        return HttpResponse('PUT:修改（全部更新）')
        
    def delete(self,request,*args,**kwargs):
        '''
         pb=request.body
    res=json.loads(pb)
    whlistid = res['whlistid']
    try:
        WhList.objects.filter(id=whlistid).delete()
        return setzhResponseHeader({"sign":1,"message":"操作成功!"})
    except:
        return setzhResponseHeader({"sign":0,"message":e.message})
        '''
        return HttpResponse('DELETE:删除')
        
    def patch(self,request,*args,**kwargs):
        return HttpResponse('PATCH:修改（部分更新）')


class DevicetopoView(APIView):
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("paras"):
            searchdict['name']=request.GET.get("paras")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=DeviceCategory.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=DeviceCategorySerializer(instance=obj,many=True)#many 单个对象False
                ret['status']=1
                ret['data']=ser
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=e.message
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
    
    def post(self,request,*args,**kwargs):
        from django.db import transaction
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        name=res['name']
        try:
            with transaction.atomic():
                dc=DeviceCategory()
                dc.name=name
                dc.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except Exception as e:
            ret['msg']=e.message
            return setzhJsonResponseHeader(ret)
        
    def delete(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id = res['_id']
        try:
            DeviceCategory.objects.filter(id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=e.message
            return setzhJsonResponseHeader(ret)
        
    def patch(self,request,*args,**kwargs):
        from django.db import transaction
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        _id=res['_id']
        name=res['name']
        try:
            with transaction.atomic():
                dc=DeviceCategory.objects.get(id=_id)
                dc.name=name
                dc.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=e.message
            return setzhJsonResponseHeader(ret)