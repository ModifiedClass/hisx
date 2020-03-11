from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework import exceptions
from django.db import transaction
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from utils.globalutilitys import *
from .models import *
from .serializers import *

class DeviceCategoryView(APIView):
    '''
    设备类别
    '''
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
                ser=DeviceCategorySerializer(instance=obj,many=True).data#many 单个对象False
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
        try:
            with transaction.atomic():
                dc=DeviceCategory()
                dc.name=name
                dc.save()
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
            DeviceCategory.objects.filter(id=_id).delete()
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
                dc=DeviceCategory.objects.get(id=_id)
                dc.name=name
                dc.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)

class DeviceModelView(APIView):
    '''
    设备型号
    '''
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
                ser=DeviceModelSerializer(instance=obj,many=True).data#many 单个对象False
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
            ret['msg']=str(e)
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
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)
        
    def patch(self,request,*args,**kwargs):
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
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)


class InstallLocationView(APIView):
    '''
    安装位置
    '''
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
                ser=InstallLocationSerializer(instance=obj,many=True).data#many 单个对象False
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
        try:
            with transaction.atomic():
                il=InstallLocation()
                il.name=name
                il.save()
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
            InstallLocation.objects.filter(id=_id).delete()
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
                il=InstallLocation.objects.get(id=_id)
                il.name=name
                il.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)



class DeviceInfoView(APIView):
    '''
    设备信息
    '''
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
                ser=DeviceInfoSerializer(instance=obj,many=True).data#many 单个对象False
                obj = { "rows" : ser, "total" : nums }
                ret['status']=1
                ret['data']=ser
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=str(e)
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
    
    def post(self,request,*args,**kwargs):
    
        pb=request.body
        res=json.loads(pb)
        name=res['name']
        sn=res['sn']
        status=res["status"]
        devicemodel=res["devicemodel"]
        ip=res["ip"]
        mac=res["mac"]
        installdate=res["installdate"]
        parent=res["parent"]
        runos=res["runos"]
        installlocation=res["installlocation"]
        try:
            with transaction.atomic():
                di=DeviceInfo()
                di.name=name
                di.sn=sn
                di.status=status
                di.devicemodel=DeviceModel.objects.get(id=devicemodel)
                di.ip=ip
                di.mac=mac
                di.installdate=installdate
                di.parent=DeviceInfo.objects.get(id=parent)
                di.runos=runos
                di.installlocation=InstallLocation.objects.get(id=installlocation)
                di.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)

    def delete(self,request,*args,**kwargs):
        pb=request.body
        res=json.loads(pb)
        _id = res['_id']
        try:
            DeviceInfo.objects.filter(id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)
        
    def patch(self,request,*args,**kwargs):
        pb=request.body
        res=json.loads(pb)
        _id=res['_id']
        name=res['name']
        sn=res['sn']
        status=res["status"]
        devicemodel=res["devicemodel"]
        ip=res["ip"]
        mac=res["mac"]
        installdate=res["installdate"]
        parent=res["parent"]
        runos=res["runos"]
        installlocation=res["installlocation"]
        try:
            with transaction.atomic():
                di=DeviceInfo.objects.get(id=_id)
                di.name=name
                di.sn=sn
                di.status=status
                di.devicemodel=DeviceModel.objects.get(id=devicemodel)
                di.ip=ip
                di.mac=mac
                di.installdate=installdate
                di.parent=DeviceInfo.objects.get(id=parent)
                di.runos=runos
                di.installlocation=InstallLocation.objects.get(id=installlocation)
                di.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)


class DeviceTopoView(APIView):
    '''
    设备拓扑
    '''
    def get(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        result={'ls':None,'ts':None}
        installlocationid= request.GET.get('installlocationid')
        try:
            deviceinfos=DeviceInfo.objects.filter(installlocation__id=installlocationid)
            InstallLocations=InstallLocation.objects.all().order_by('name')
            if not deviceinfos or not InstallLocations:
                ret['msg']="没有获取到数据!"
            else:
                ilser=InstallLocationSerializer(instance=InstallLocations,many=True).data
                result['ls']=ilser
                ts=[]
                for t in deviceinfos:
                    topo=Equtopo.objects.filter(deviceinfo=t).first()
                    if topo:
                        ts.append({
                            'id':t._id,
                            'x':topo and topo.x or "", 
                            'y':topo and topo.y or "",
                            'icon':topo and topo.icon or "",
                            'name':t.name,
                            'pid':t.parent and t.parent.id or "",
                            'detail':{
                                'id':t._id,
                                'ip':t.ip and t.ip or "",
                                'mac':t.mac and t.mac or "",
                                '类别':t.equclass and t.equclass.name or "",
                                '运行服务':t.equrunserv and t.equrunserv or "",
                                '运行系统':t.equrunsys and t.equrunsys or "",
                            }
                        })
                result['ts']=ts
                ret['status']=1
                ret['data']=result
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=str(e)
            return JsonResponse(json.dumps(ret,ensure_ascii=False))
        
    def patch(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        try:
            with transaction.atomic():
                for obj in res:
                    di=DeviceInfo.objects.get(id=obj['_id'])         
                    devicetopo=Devicetopo.objects.filter(deviceinfo=di).first()
                    devicetopo.x=obj['x']
                    devicetopo.y=obj['y']   
                    devicetopo.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(ret)
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(ret)