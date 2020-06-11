from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework import exceptions
from django.db import transaction
import json

from .models import *
from .serializers import *
from utils.globalutilitys import *
from account.models import User

# Create your views here.

class BookCategoryView(APIView):
    '''
    图书类别
    '''
    def get(self,request,*args,**kwargs):
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("name"):
            searchdict['name__icontains']=request.GET.get("name")
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=BookCategory.objects.filter(**searchdict).order_by('name')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=BookCategorySerializer(instance=obj,many=True).data
                ret['status']=1
                ret['data']=ser
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
    
    def post(self,request,*args,**kwargs):
        ret={'status':0,'msg':None,'data':None}
        pb=request.body
        res=json.loads(pb)
        try:
            with transaction.atomic():
                obj=BookCategory()
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
            BookCategory.objects.filter(_id = res['_id']).delete()
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
                obj=BookCategory.objects.get(_id=res['_id'])
                if 'name' in res:
                    obj.name=res['name']
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


class BooksView(APIView):
    '''
    图书信息
    '''
    def get(self,request,*args,**kwargs):
        isPage=False
        pageSize=int(request.GET.get("pageSize")) if request.GET.get("pageSize") else 2
        pageNum=int(request.GET.get("pageNum")) if request.GET.get("pageNum") else 1
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("bookcategory"):
            searchdict['bookcategory_id']=request.GET.get("bookcategory")
        if request.GET.get("name"):
            searchdict['name__icontains']=request.GET.get("name")
        if request.GET.get("status"):
            searchdict['status']=request.GET.get("status")
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
                obj=Book.objects.filter(**searchdict).order_by('-create_time')
                if not obj:
                    ret['msg']="没有获取到数据!"
                else:
                    nums=Book.objects.filter(**searchdict).count()
                    start=(pageNum - 1) * pageSize
                    end=nums if nums<pageNum*pageSize else pageNum*pageSize
                    prs=obj[start:end]
                    ser=BookSerializer(instance=prs,many=True).data#many 单个对象False
                    objs = { "list" : ser, "total" : nums }
                    ret['status']=1
                    ret['data']=objs
            else:
                obj=Book.objects.filter(**searchdict).order_by('-create_time')
                if not obj:
                    ret['msg']="没有获取到数据!"
                else:
                    nums=Book.objects.filter(**searchdict).count()
                    ser=BookSerializer(instance=obj,many=True).data#many 单个对象False
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
                obj=Book()
                if 'create_time' in res:
                    obj.create_time=res['create_time']
                if 'name' in res:
                    obj.name=res['name']
                if 'isbn' in res:
                    obj.isbn=res['isbn']
                if 'profile' in res:
                    obj.profile=res['profile']
                if 'status' in res:
                    obj.status=res['status']
                if 'bookcategory' in res:
                    obj.bookcategory=BookCategory.objects.get(_id=res['bookcategory'])
                if 'cover' in res:
                    obj.cover=res['cover']
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
            Book.objects.filter(_id=_id).delete()
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
                obj=Book.objects.get(_id=res['_id'])
                if 'create_time' in res:
                    obj.create_time=res['create_time']
                if 'name' in res:
                    obj.name=res['name']
                if 'isbn' in res:
                    obj.isbn=res['isbn']
                if 'profile' in res:
                    obj.profile=res['profile']
                if 'status' in res:
                    obj.status=res['status']
                if 'bookcategory' in res:
                    obj.bookcategory=BookCategory.objects.get(_id=res['bookcategory'])
                if 'cover' in res:
                    obj.cover=res['cover']
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


class BorrowRecordView(APIView):
    '''
    借阅记录
    '''
    def get(self,request,*args,**kwargs):
        isPage=False
        pageSize=int(request.GET.get("pageSize")) if request.GET.get("pageSize") else 2
        pageNum=int(request.GET.get("pageNum")) if request.GET.get("pageNum") else 1
        searchdict={}
        if request.GET.get("_id"):
            searchdict['_id']=request.GET.get("_id")
        if request.GET.get("reader"):
            searchdict['reader_id']=request.GET.get("reader")
        if request.GET.get("book"):
            searchdict['book_name__icontains']=request.GET.get("name")
        if request.GET.get("bstartdate"):
            searchdict['create_time__gte']=request.GET.get("bstartdate")
        if request.GET.get("benddate"):
            searchdict['create_time__lte']=request.GET.get("benddate")
        if request.GET.get("rstartdate"):
            searchdict['return_time__gte']=request.GET.get("rstartdate")
        if request.GET.get("renddate"):
            searchdict['return_time__lte']=request.GET.get("renddate")
        if request.GET.get("isPage"):
            if str(request.GET.get("isPage"))=='true':
                isPage=True
            else:
                isPage=False
        ret={'status':0,'msg':None,'data':None}
        try:
            obj=BorrowRecord.objects.filter(**searchdict).order_by('-create_time')
            if not obj:
                ret['msg']="没有获取到数据!"
            else:
                ser=BorrowRecordSerializer(instance=obj,many=True).data#many 单个对象False
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
                obj=BorrowRecord()
                if 'book' in res:
                    obj.book=Book.objects.get(_id=res['book'])
                if 'create_time' in res:
                    obj.create_time= res['create_time']
                if 'return_time' in res:
                    obj.return_time= res['return_time']
                if 'reader' in res:
                    obj.reader=User.objects.get(_id=res['reader'])
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
            BorrowRecord.objects.filter(_id=_id).delete()
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
                obj=BorrowRecord.objects.get(_id=res['_id'])
                if 'book' in res:
                    obj.book=Book.objects.get(_id=res['book'])
                if 'create_time' in res:
                    obj.create_time= res['create_time']
                if 'return_time' in res:
                    obj.return_time= res['return_time']
                if 'reader' in res:
                    obj.reader=User.objects.get(_id=res['reader'])
                obj.save()
                ret['status']=1
                ret['msg']="操作成功!"
                return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
        except Exception as e:
            ret['msg']=str(e)
            return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
