from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework import exceptions
from django.db import transaction

from .models import *
from .serializers import *
from utils.globalutilitys import *


class AuthView(APIView):
    '''
    登录认证
    '''
    #局部绕过认证
    authentication_classes=[]
    def post(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':[],'token':None}
        pb=request.body
        res=json.loads(pb)
        username=res['username']
        password=pwdenc(res['password'])
        try:
            #password=pwdenc(request._request.POST.get('password'))
            obj=User.objects.filter(username=username,password=password)
            if not obj:
                ret['msg']="用户名或密码不正确！"
            else:    
                token=md5token(username)
                UserToken.objects.update_or_create(user=obj.first(),defaults={'token':token})
                ser=UserSerializer(instance=obj,many=True)
                ret['data']=ser.data
                ret['token']=token
                ret['status']=1
        except Exception as e:
            ret['msg']=str(e)
        return setzhJsonResponseHeader(ret)


class GroupView(APIView):
    '''
    组
    '''
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("name"):
            searchdict['name__icontains']=request.GET.get("name")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=Group.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=GroupSerializer(instance=obj,many=True).data#many 单个对象False
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
                obj=Group()
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
        try:
            Group.objects.filter(_id=res['_id']).delete()
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
                obj=Group.objects.get(_id=res['_id'])
                if "name" in res:
                    obj.name=res['name']
                if "menu" in res:
                    obj.menu=res['menu']
                if "operation" in res:
                    obj.operation=res['operation']
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


class DepartmentView(APIView):
    '''
    部门
    '''
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("name"):
            searchdict['name__icontains']=request.GET.get("name")
        if request.GET.get("code"):
            searchdict['code__icontains']=request.GET.get("code")
        if request.GET.get("status"):
            searchdict['status']=request.GET.get("status")
        if request.GET.get("_parent"):
            searchdict['parent']=request.GET.get("_parent")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=Department.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=DepartmentSerializer(instance=obj,many=True).data#many 单个对象False
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
        name=res['name']
        code=res['code']
        parent=res['_parent']
        status=res['status']
        try:
            with transaction.atomic():
                obj=Department()
                obj.name=name
                obj.code=code
                if parent:
                    obj.parent=Department.objects.get(_id=parent)
                obj.status=status
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
            Department.objects.filter(_id=_id).delete()
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
        parent=res['_parent']
        try:
            with transaction.atomic():
                obj=Department.objects.get(_id=res['_id'])
                if "name" in res:
                    obj.name=res['name']
                if "code" in res:
                    obj.code=res['code']
                if parent:
                    obj.parent=Department.objects.get(_id=parent)
                if "status" in res:
                    obj.status=res['status']
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


class UserView(APIView):
    '''
    用户
    '''
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("username"):
            searchdict['username__icontains']=request.GET.get("username")
        if request.GET.get("name"):
            searchdict['name__icontains']=request.GET.get("name")
        if request.GET.get("status"):
            searchdict['status']=request.GET.get("status")
        if request.GET.get("group"):
            searchdict['group']=request.GET.get("group")
        if request.GET.get("department"):
            searchdict['department']=request.GET.get("department")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=User.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=UserSerializer(instance=obj,many=True).data#many 单个对象False
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
        username=res['username']
        password=res['password']
        name=res['name']
        issuper=res['issuper']
        group=res['group']
        try:
            with transaction.atomic():
                obj=User()
                obj.username=username
                obj.password=pwdenc(password)
                obj.name=name
                obj.issuper=issuper
                obj.save()
                groups=Group.objects.filter(_id__in=group)
                obj.group.clear()
                obj.group.add(*groups)
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
            User.objects.filter(_id=_id).delete()
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
                obj=User.objects.get(_id=res['_id'])
                if "username" in res:
                    obj.username=res['username']
                if "password" in res:
                    obj.password=pwdenc(res['password'])
                if "name" in res:
                    obj.name=res['name']
                if "issuper" in res:
                    obj.isSuper=res['issuper']
                if "group" in res:
                    groups=Group.objects.filter(_id__in=res['group'])
                    obj.group.clear()
                    obj.group.add(*groups)
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