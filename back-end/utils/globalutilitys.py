from django.shortcuts import render,redirect
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
def setzhJsonResponseHeader(res):
    response = JsonResponse(json.dumps(res,ensure_ascii=False))
    response["Access-Control-Allow-Headers"] = "content-type"
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "POST,GET,OPTIONS,PUT,DELETE,PATCH"
    response["Access-Control-Max-Age"] = "1000"
    return response
    
def setJsonResponseHeader(res):
    response = JsonResponse(res)
    response["Access-Control-Allow-Headers"] = "content-type"
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "POST,GET,OPTIONS,PUT,DELETE,PATCH"
    response["Access-Control-Max-Age"] = "1000"
    return response