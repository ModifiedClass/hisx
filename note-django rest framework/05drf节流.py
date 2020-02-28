#django rest fromework节流
from rest_framework.views import APIView
from rest_framework.throttling import BaseThrottle
import time

VISIT_RECORD={}
class VisitThrottle(object):
    def __init__(self):
        self.history=None
        
    def alow_request(self,request,view):
        remote_addr=request.META.get('REMOTE_ADDR')#用户ip
        if remote_addr not in VISIT_RECORD:
            ctime=time.time()
            VISIT_RECORD[remote_addr]=[ctime,]
            return True
        history=VISIT_RECORD.get(remote_addr)
        self.history=history
        while history and history[-1]<ctime-10:  #10秒内 
            history.pop()
        if len(history)<3:                       #访问3次
            history.insert(0,ctime)
            return True
    def wait(self):
        ctime=time.time()
        return 60-(ctime-self.history[-1])

class ExampleView(APIView):
    throttle_classes=[VisitThrottle,]
    
    def get(self,request,*args,**kwargs):
        ret={'status':0,'msg':'msg'}
        return HttpResponse(json.dumps(ret))


#配置文件全局节流
#appname/utils/throttle.py
###########################################################

from rest_framework.throttling import BaseThrottle
import time

VISIT_RECORD={}
class VisitThrottle(object):
    def __init__(self):
        self.history=None
        
    def alow_request(self,request,view):
        remote_addr=request.META.get('REMOTE_ADDR')#用户ip
        if remote_addr not in VISIT_RECORD:
            ctime=time.time()
            VISIT_RECORD[remote_addr]=[ctime,]
            return True
        history=VISIT_RECORD.get(remote_addr)
        self.history=history
        while history and history[-1]<ctime-10:  #10秒内 
            history.pop()
        if len(history)<3:                       #访问3次
            history.insert(0,ctime)
            return True
    def wait(self):
        ctime=time.time()
        return 60-(ctime-self.history[-1])
###########################################################################
REST_FRAMEWORK={
    "DEFAULT_THROTTLE_CLASSES":['appname.utils.auth.VisitThrottle',],
}
#内置节流
from rest_framework.throttling import SimpleRateThrottle
class VisitThrottle(SimpleRateThrottle):
    scope="times"   
    def get_cache_key(self,request,view):
        return self.get_ident(request)

REST_FRAMEWORK={
    "DEFAULT_THROTTLE_RATES":{
        times:'10/m'
    },
}