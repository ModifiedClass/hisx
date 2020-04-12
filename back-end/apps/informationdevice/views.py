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
            searchdict['name__icontains']=request.GET.get("name")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=DeviceCategory.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
                ret['status']=2
            else:
                ser=DeviceCategorySerializer(instance=obj,many=True).data#many 单个对象False
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
                dc=DeviceCategory()
                dc.name=name=res['name']
                dc.save()
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
            DeviceCategory.objects.filter(_id=_id).delete()
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
                obj=DeviceCategory.objects.get(_id=res['_id'])
                if "name" in res:
                    obj.name=res['name']
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))

class DeviceModelView(APIView):
    '''
    设备型号
    '''
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("name"):
            searchdict['name__icontains']=request.GET.get("name")
        if request.GET.get("devicecategory"):
            searchdict['devicecategory_id']=request.GET.get("devicecategory")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=DeviceModel.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
                ret['status']=2
            else:
                ser=DeviceModelSerializer(instance=obj,many=True).data#many 单个对象False
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
                obj=DeviceModel()
                obj.name=res['name']
                if "devicecategory" in res:
                    devicecategory=DeviceCategory.objects.get(_id=res['devicecategory'])
                obj.devicecategory=devicecategory
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
            DeviceModel.objects.filter(_id=_id).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        
    def patch(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        name=res['name']
        devicectegory_id=res['devicectegory_id']
        try:
            with transaction.atomic():
                obj=DeviceModel.objects.get(_id=res['_id'])
                if "name" in res:
                    obj.name=res['name']
                if "devicecategory" in res:
                    devicecategory=DeviceCategory.objects.get(_id=res['devicecategory'])
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


class InstallLocationView(APIView):
    '''
    安装位置
    '''
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("name"):
            searchdict['name__icontains']=request.GET.get("name")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=InstallLocation.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
                ret['status']=2
            else:
                ser=InstallLocationSerializer(instance=obj,many=True).data#many 单个对象False
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
                obj=InstallLocation()
                obj.name=name=res['name']
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
        try:
            InstallLocation.objects.filter(_id=res['_id']).delete()
            ret['status']=1
            ret['msg']="操作成功!"
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        
    def patch(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        try:
            with transaction.atomic():
                obj=InstallLocation.objects.get(_id=res['_id'])
                if "name" in res:
                    obj.name=res['name']
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))



class DeviceInfoView(APIView):
    '''
    设备信息
    '''
    def get(self,request,*args,**kwargs):
        isPage=False
        pageSize=int(request.GET.get("pageSize")) if request.GET.get("pageSize") else 2
        pageNum=int(request.GET.get("pageNum")) if request.GET.get("pageNum") else 1
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("devicecategory"):
            searchdict['devicecategory_id']=request.GET.get("devicecategory")
        if request.GET.get("devicemodel"):
            searchdict['devicemodel_id']=request.GET.get("devicemodel")
        if request.GET.get("installlocation"):
            searchdict['installlocation_id']=request.GET.get("installlocation")
        if request.GET.get("runos"):
            searchdict['runos']=request.GET.get("runos")
        if request.GET.get("name"):
            searchdict['name__icontains']=request.GET.get("name")
        if request.GET.get("ip"):
            searchdict['ip__icontains']=request.GET.get("ip")
        if request.GET.get("mac"):
            searchdict['mac__icontains']=request.GET.get("mac")
        if request.GET.get("status"):
            searchdict['status']=request.GET.get("status")
        if request.GET.get("isPage"):
            if str(request.GET.get("isPage"))=='true':
                isPage=True
            else:
                isPage=False
        ret={'status':0,'msg':None,'data':None}
        try:
            if isPage:
                obj=DeviceInfo.objects.filter(**searchdict).order_by('name')
                if not obj:
                    ret['msg']="没有获取到数据!"
                else:
                    nums=DeviceInfo.objects.filter(**searchdict).count()
                    start=(pageNum - 1) * pageSize
                    end=nums if nums<pageNum*pageSize else pageNum*pageSize
                    dis = obj[start:end]
                    ser=DeviceInfoSerializer(instance=dis,many=True).data#many 单个对象False
                    objs = { "list" : ser, "total" : nums }
                    ret['status']=1
                    ret['data']=objs
            else:
                obj=DeviceInfo.objects.filter(status=1).order_by('name')
                if not obj:
                    ret['msg']="没有获取到数据!"
                else:
                    nums=DeviceInfo.objects.filter(status=1).count()
                    ser=DeviceInfoSerializer(instance=obj,many=True).data#many 单个对象False
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
                obj=DeviceInfo()
                if "name" in res and res["name"]:
                    obj.name=res['name']
                if "sn" in res and res["sn"]:
                    obj.sn=res['sn']
                if "status" in res and res["status"]:
                    obj.status=res["status"]
                if "devicemodel" in res and res["devicemodel"]:
                    obj.devicemodel=DeviceModel.objects.get(_id=int(res["devicemodel"]))
                if "ip" in res and res["ip"]:
                    obj.ip=res["ip"]
                if "mac" in res and res["mac"]:
                    obj.mac=res["mac"]
                if "installdate" in res and res["installdate"]:
                    obj.installdate=res["installdate"]
                if "parent" in res and res["parent"]:
                    obj.parent=DeviceInfo.objects.get(_id=int(res["parent"]))
                if "runos" in res and res["runos"]:
                    obj.runos=res["runos"]
                if "installlocation" in res and res["installlocation"]:
                    obj.installlocation=InstallLocation.objects.get(_id=int(res["installlocation"]))
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
        try:
            DeviceInfo.objects.filter(_id=res['_id']).delete()
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
                obj=DeviceInfo.objects.get(_id=res['_id'])
                if "name" in res and res["name"]:
                    obj.name=res['name']
                if "sn" in res and res["sn"]:
                    obj.sn=res['sn']
                if "status" in res and res["status"]:
                    obj.status=res["status"]
                if "devicemodel" in res and res["devicemodel"]:
                    obj.devicemodel=DeviceModel.objects.get(_id=int(res["devicemodel"]))
                if "ip" in res and res["ip"]:
                    obj.ip=res["ip"]
                if "mac" in res and res["mac"]:
                    obj.mac=res["mac"]
                if "installdate" in res and res["installdate"]:
                    obj.installdate=res["installdate"]
                if "parent" in res and res["parent"] and res["parent"]!=res['_id']:
                    obj.parent=DeviceInfo.objects.get(_id=int(res["parent"]))
                if "runos" in res and res["runos"]:
                    obj.runos=res["runos"]
                if "installlocation" in res and res["installlocation"]:
                    obj.installlocation=InstallLocation.objects.get(_id=int(res["installlocation"]))
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


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
                ret['status']=2
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
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['status']=3
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        
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
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))