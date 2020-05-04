from .models import *
from django.core import serializers
import os
from imp import reload
from django.utils import timezone
from utils.globalutilitys import *

# Create your views here.
   
#删除数据库大于20天session 
def delovertimesession(request):
    ret={'msg':None}
    reload(sys)
    sys.setdefaultencoding("utf-8")
    from django.contrib.sessions.backends.db import SessionStore
    from django.contrib.sessions.models import Session
    store = SessionStore()
    count = Session.objects.all().count()
    if count > 20:
        nowtime = datetime.datetime.now()
        outdatesession = Session.objects.filter(expire_date__lt=nowtime)
        for item in outdatesession:
            store.delete(item.session_key)
        ret['msg']='清理完毕！'
        return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
    else:
        ret['msg']='无须清理！'
        return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


#备份
def database_backup(request):
    ret={'msg':None}
    path=request.GET.get("path")
    backupname="hisx_"+timezone.now().strftime("%Y%m%d%H%M%S")
    u="root"
    p="Mysql-5.7.24"
    os.system("mysqldump -u"+u+" -p"+p+" exhis > "+path+backupname+".sql")
    ret['msg']="备份结束,路径是:"+path+backupname+".sql"
    return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
    
 
#清理nginx日志
def clear_nginxlog(request):
    ret={'msg':None}
    para=request.GET.get("path")
    path="rm -rf "+para
    reopen="/usr/local/nginx/sbin/nginx -s reopen"
    os.system(path)
    os.system(reopen)
    ret['msg']="清理结束!"
    return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))
