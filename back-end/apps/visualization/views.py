from .models import *
from django.core import serializers
from rest_framework import exceptions
from utils.globalutilitys import *
from utils.visualizationsql import *
import cx_Oracle

# Create your views here.
#病人区域分布
def getpatdis(request):
    '''ret={'status':0,'msg':None,'data':None}
    sql=sqlpatdis
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    try:
        cursor.execute(sql)
        res=cursor.fetchall()
        ret['status']=1
        ret['data']=res
    except Exception as e:
        ret['msg']=str(e)
    finally:
        cursor.close()
        conn.close()
    return setzhResponseHeader(ret)'''
    sql=sqlpatdis
    conn = cx_Oracle.connect(hisconn)
    cursor = conn.cursor()
    cursor.execute(sql)
    res=cursor.fetchall()
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

#日结账统计
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