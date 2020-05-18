from django.shortcuts import render
from django.db.models import Count
import json
import datetime

from utils.globalutilitys import *
from utils.datetimeutilitys import *
from oapm.models import ProblemCategory,ProcessedRecord
from informationdevice.models import DeviceInfo,DeviceCategory
import cx_Oracle
from utils.sql.sqlstr import hisconn,zyks
from utils.sql.zlqk import qyzlqk,bmyszlqk
from utils.sql.zdqk import qyzdqk,bmyszdqk

# Create your views here.
def getzyks(request):
    '''住院科室'''
    sql=zyks
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    try:
        cursor.execute(sql)
        res=cursor.fetchall()
        return setzhJsonResponseHeader(json.dumps(res,ensure_ascii=False))
    except:
        pass
    finally:
        cursor.close()
        conn.close()

def chart_processedrecord_day(request):
    """获取最近n天问题记录""" 
    ret={'xdate':None,'legenddata':None,'seriesdata':None}
    begin_date = (datetime.datetime.now() - datetime.timedelta(days =30)).strftime("%Y-%m-%d")
    startdate = datetime.datetime.strptime(begin_date, "%Y-%m-%d")
    enddate = datetime.datetime.strptime(time.strftime('%Y-%m-%d',time.localtime(time.time())), "%Y-%m-%d")
    xdate=getnDays(startdate,enddate)
    legenddata=[]
    pc=ProblemCategory.objects.all()
    pr=ProcessedRecord.objects.filter(create_time__range=(startdate, enddate))
    for p in pc:
        legenddata.append(p.name)
    seriesdata=[]
    for l in legenddata:
        two=[]
        for x in xdate:
            nums=0
            for p in pr:
                if str(p.create_time)[0:10]==str(x) and p.problem_category.name==l:
                    nums=nums+1
            two.append(nums)
        seriesdata.append({
            'name': l,
            'type': 'line',
            'smooth': True,
            'data':two
        })
    ret['xdate']=xdate
    ret['legenddata']=legenddata
    ret['seriesdata']=seriesdata
    return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


def chart_processedrecord(request):
    """获取问题结构""" 
    ret={'legenddata':None,'seriesdata':None,'sum':None}
    legenddata=[]
    seriesdata=[]
    pc=ProblemCategory.objects.values('name').annotate()
    pr=ProcessedRecord.objects.values('problem_category__name').annotate(nums=Count('_id'))
    sum=len(ProcessedRecord.objects.all())
    for p in pc:
        legenddata.append(p['name'])
    for r in pr:
        seriesdata.append({'value': r['nums'], 'name': r['problem_category__name']})
    ret['legenddata']=legenddata
    ret['seriesdata']=seriesdata
    ret['sum']=len(ProcessedRecord.objects.all())
    return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


def chart_device(request):
    """获取设备结构""" 
    ret={'data':None,'sum':0,}
    di=DeviceInfo.objects.values('devicemodel__devicecategory__name').annotate(nums=Count('_id'))
    sum=len(DeviceInfo.objects.all())
    data=[]
    for i in di:
        data.append({'value':i['nums'], 'name': i['devicemodel__devicecategory__name']})
    ret['data']=data
    ret['sum']=sum
    return setzhJsonResponseHeader(json.dumps(ret,ensure_ascii=False))


def chart_qyzlqk(request):
    '''全院治疗情况'''
    sql=qyzlqk
    startDate=request.GET.get("startDate")
    endDate=request.GET.get("endDate")
    params=[startDate,endDate]
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    
    try:
        cursor.execute(sql,params)
        res=cursor.fetchall()
        return setzhJsonResponseHeader(json.dumps(res,ensure_ascii=False))
    except:
        pass
    finally:
        cursor.close()
        conn.close()

def chart_bmyszlqk(request):
    '''部门医师治疗情况'''
    sql=bmyszlqk
    department=request.GET.get("department")
    startDate=request.GET.get("startDate")
    endDate=request.GET.get("endDate")
    params=[department,startDate,endDate]
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    try:
        cursor.execute(sql,params)
        res=cursor.fetchall()
        return setzhJsonResponseHeader(json.dumps(res,ensure_ascii=False))
    except:
        pass
    finally:
        cursor.close()
        conn.close()

def chart_qyzdqk(request):
    '''全院诊断情况'''
    sql=qyzdqk
    startDate=request.GET.get("startDate")
    endDate=request.GET.get("endDate")
    params=[startDate,endDate]
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    
    try:
        cursor.execute(sql,params)
        res=cursor.fetchall()
        return setzhJsonResponseHeader(json.dumps(res,ensure_ascii=False))
    except:
        pass
    finally:
        cursor.close()
        conn.close()

def chart_bmyszdqk(request):
    '''部门医师诊断情况'''
    sql=bmyszdqk
    department=request.GET.get("department")
    startDate=request.GET.get("startDate")
    endDate=request.GET.get("endDate")
    params=[department,startDate,endDate]
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    try:
        cursor.execute(sql,params)
        res=cursor.fetchall()
        return setzhJsonResponseHeader(json.dumps(res,ensure_ascii=False))
    except:
        pass
    finally:
        cursor.close()
        conn.close()
'''    
#病人区域分布
def getpatdis(request):
    sql=sqlpatdis
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    cursor.execute(sql)
    res=cursor.fetchall()
    cursor.close()
    conn.close()
    return setzhResponseHeader(res)

#当前在院病人数
def getinhosnum(request):
    sql=sqlinhosnum
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    cursor.execute(sql)
    res=cursor.fetchall()
    cursor.close()
    conn.close()
    return setzhResponseHeader({'pz':res[0][0],'jz':res[0][1],'zz':res[0][2],'now':res[0][3],'in':res[0][4],'out':res[0][5],'ss':res[0][6]})

#当前预出院病人数
def getpreparatorynum(request):
    sql=sqlpreparatorynum
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    cursor.execute(sql)
    res=cursor.fetchall()
    cursor.close()
    conn.close()
    return setzhResponseHeader({'num':res})
    
#当月出院未结账病人数
def getnochecknum(request):
    sql=sqlnochecknum
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    cursor.execute(sql)
    res=cursor.fetchall()
    cursor.close()
    conn.close()
    return setzhResponseHeader({'num':res})
    
#当日就诊人次
def getconsultationnum(request):
    sql=sqlconsultationnum
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    cursor.execute(sql)
    res=cursor.fetchall()
    cursor.close()
    conn.close()
    obj={}
    return setzhResponseHeader({'num':res})

#三年收入对比
def getdisease(request):
    sql=sqldisease
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    cursor.execute(sql)
    res=cursor.fetchall()
    cursor.close()
    conn.close()
    return setzhResponseHeader(res)

#当月每天门诊入出院人次
def getnumbyday(request):
    sqlm=sqlnumbydaym
    sqle=sqlnumbydaye
    sqli=sqlnumbydayi
    sqlo=sqlnumbydayo
    conn = cx_Oracle.connect(hisconn)
    c1= conn.cursor()
    c2= conn.cursor()
    c3= conn.cursor()
    c4= conn.cursor()
    
    c1.execute(sqlm)
    resm=c1.fetchall()
    c1.close()
    
    c2.execute(sqle)
    rese=c2.fetchall()
    c2.close()
    
    c3.execute(sqli)
    resi=c3.fetchall()
    c3.close()
    
    c4.execute(sqlo)
    reso=c4.fetchall()
    c4.close()
    conn.close()
    dict={'m':resm,'e':rese,'i':resi,'o':reso}
    return setzhResponseHeader(dict)

#医保类别费用比例
def getmedinsu(request):
    sql=sqlmedinsu
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    cursor.execute(sql)
    res=cursor.fetchall()
    cursor.close()
    conn.close()
    return setzhResponseHeader(res)

#月门诊收入
def getincomebythisday(request):
    #sql=sqlincomebythisday
    sql=sqloutpatientbythismon
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    cursor.execute(sql)
    res=cursor.fetchall()
    cursor.close()
    conn.close()
    return setzhResponseHeader(res)

#月结账统计
def getincomebythismon(request):
    sql=sqlincomebythismon
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    cursor.execute(sql)
    res=cursor.fetchall()
    cursor.close()
    conn.close()
    return setzhResponseHeader(res)
    
#医生负荷
def getdoctorload(request):
    sqlc=sqlconsultationnum
    sqld=sqldoctornums

    conn = cx_Oracle.connect(hisconn)
    c1= conn.cursor()
    c2= conn.cursor()

    c1.execute(sqlc)
    resc=c1.fetchall()
    c1.close()
    
    c2.execute(sqld)
    resd=c2.fetchall()
    c2.close()
    
    conn.close()
    dict={'d':resd,'c':resc}
    return setzhResponseHeader(dict)
    
#医生待诊
def getdoctoratv(request):
    sqlw=sqlwaitnums
    sqld=sqldoctornums

    conn = cx_Oracle.connect(hisconn)
    c1= conn.cursor()
    c2= conn.cursor()

    c1.execute(sqlw)
    resw=c1.fetchall()
    c1.close()
    
    c2.execute(sqld)
    resd=c2.fetchall()
    c2.close()
    
    conn.close()
    dict={'d':resd,'w':resw}
    return setzhResponseHeader(dict)
    
#患者平均等待时间
def getavgwaitingtime(request):
    sql=sqlavgwaitingtime
    conn = cx_Oracle.connect(hisconn)
    c1= conn.cursor()
    c1.execute(sql)
    res=c1.fetchall()
    c1.close()    
    conn.close()
    return setzhResponseHeader(res)
    

def hqms(request):
    sql=hqmsbydata
    dates=request.GET.get("paras") if request.GET.get("paras") else "1900-01-01/1900-01-01"
    startDate=dates.split("/")[0]
    endDate=dates.split("/")[-1]
    params=[startDate,endDate,startDate,endDate]
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    cursor.execute(sql,params)
    res=cursor.fetchall()
    cursor.close()
    conn.close()
    obj={}
    try:
        nums=len(res)
        rows = []
        for i in res:
            dict={}
            j=0
            for d in hqmsheader:
                dict[d]=i[j]
                j=j+1  
            rows.append(dict)
        obj = { "rows" : rows, "total" : nums }
    except:
        obj = { "rows" : [], "total" : 0 }   
    return setzhResponseHeader(obj)
    
def hqms_p(request):
    sql=hqmsbypnum
    dt=request.GET.get("paras") if request.GET.get("paras") else "0"
    params=[dt,dt]
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    cursor.execute(sql,params)
    res=cursor.fetchall()
    cursor.close()
    conn.close()
    pageSize=int(request.GET.get("pageSize")) if request.GET.get("pageSize") else 2
    pageNumber=int(request.GET.get("pageNumber")) if request.GET.get("pageNumber") else 1
    sort=request.GET.get("sort") if request.GET.get("sort") else "id"
    obj={}
    try:
        nums=len(res)
        start=(pageNumber - 1) * pageSize
        end=nums if nums<pageNumber*pageSize else pageNumber*pageSize
        allres = res[start:end]
        rows = []
        for i in allres:
            dict={}
            j=0
            for d in hqmsheader:
                dict[d]=i[j]
                j=j+1  
            rows.append(dict)
        obj = { "rows" : rows, "total" : nums }
    except:
        obj = { "rows" : [], "total" : 0 }   
    return setzhResponseHeader(obj)
    
import csv,codecs
from django.http import StreamingHttpResponse
#from django.template.loader import get_template 
from django.views.decorators.csrf import csrf_exempt   
@csrf_exempt    
def exporthqmscsv(request):
    sql=hqmsbydata
    dates=request.GET.get("paras") if request.GET.get("paras") else "1900-01-01/1900-01-01"
    startDate=dates.split("/")[0]
    endDate=dates.split("/")[-1]
    params=[startDate,endDate,startDate,endDate]
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    cursor.execute(sql,params)
    res=cursor.fetchall()
    cursor.close()
    conn.close()   
    header=hqmsheader
    rows=[];
    rows.append(header)

    for s in res:
        ls=list(s)
        #for i,item in enumerate(ls):
            #if item==None:
            #    ls[i]='-'
        rows.append(ls)
    context={'rows':rows}
    template=get_template('medicalrecord/csv.txt')
    csv_template=template.render(context)
    name="hqmsts_"+startDate[0:4]+"M"+startDate[5:7]+".csv"
    response = StreamingHttpResponse(content_type='text/csv;charset=gb18030')
    response['Content-Disposition'] = "attachment;filename='%s'" % name
    response.streaming_content = csv_template
    return response
'''