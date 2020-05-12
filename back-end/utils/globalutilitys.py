﻿from django.shortcuts import render,redirect
from itertools import chain
from django.http import HttpResponse,HttpResponseRedirect,JsonResponse
import json
import hashlib
import sys
import inspect
import datetime

from account.models import *

class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj,datetime.datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        else:
            return json.JSONEncoder.default(self,obj)


#md5加密
def pwdenc(pwd):
    md5=hashlib.md5()
    md5.update(pwd.encode())
    res=md5.hexdigest()
    return res

def md5token(user):
    import hashlib
    import time
    
    ctime=str(time.time())
    m=hashlib.md5(bytes(user,encoding='utf-8'))
    m.update(bytes(ctime,encoding='utf-8'))
    return m.hexdigest()

#获取客户端ip
#X-Forwarded-For:简称XFF头，它代表客户端，也就是HTTP的请求端真实的IP，只有在通过了HTTP 代理或者负载均衡服务器时才会添加该项。
def get_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]#所以这里是真实的ip
    else:
        ip = request.META.get('REMOTE_ADDR')#这里获得代理ip
    return ip


#设置响应头信息
def setJsonResponseHeader(res):
    response = JsonResponse(json.dumps(res,ensure_ascii=False),safe=False)
    response["Access-Control-Allow-Headers"] = "content-type"
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "POST,GET,OPTIONS,PUT,DELETE,PATCH"
    response["Access-Control-Max-Age"] = "1000"
    return response
    
def setzhJsonResponseHeader(res):
    response = JsonResponse(res,safe=False)
    response["Access-Control-Allow-Headers"] = "content-type"
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "POST,GET,OPTIONS,PUT,DELETE,PATCH"
    response["Access-Control-Max-Age"] = "1000"
    return response

#获取时间戳字符串
def get_time_stamp():
    import time
    ct = time.time()
    local_time = time.localtime(ct)
    data_head = time.strftime("%Y-%m-%d %H:%M:%S", local_time)
    data_secs = (ct - int(ct)) * 1000
    time_stamp = "%s.%03d" % (data_head, data_secs)
    stamp = ("".join(time_stamp.split()[0].split("-"))+"".join(time_stamp.split()[1].split(":"))).replace('.', '')
    return stamp

#上传图片
def save_image(files):
    from django.conf import settings
    filename = "%s.%s" % (get_time_stamp(), files.name.split('.')[-1])
    full_filename = "%s\\%s" % (settings.MEDIA_ROOT+'\\img', filename)
    #linux服务器full_filename = "%s/%s" % (settings.MEDIA_ROOT+'/img', filename)
    #url="%s/%s" % ('media/img', filename)
    url='http://127.0.0.1:8000/media/img/'+filename
    with open(full_filename, 'wb+') as destination:
        for chunk in files.chunks():
            destination.write(chunk)
    return filename, full_filename,url

"""
#登录验证
def login_req(func):
    def warpper(request, *args, **kwargs):
        if request.session.get('havelogin', False):
            return func(request, *args, **kwargs)
        else:
            return HttpResponseRedirect('/back/login')
    return warpper


#权限验证
def permission_req(func):
    def warpper(request, *args, **kwargs):
        id=request.session['uid']
        user=User.objects.get(id=id)
        groups=user.group.all()
        method=func.__name__
        gl=[]
        for i in groups:
            for j in i.permission.all():
                gl.append(j.method)
        gl=set(gl)
        if method in gl or user.name=="admin":
            return func(request, *args, **kwargs)
        else:
            return setzhResponseHeader({"sign":-1,"message":"没有权限!"})
    return warpper
"""