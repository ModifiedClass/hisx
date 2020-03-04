#当月前10位疾病人次排名
sqldisease='''select * from(
select count(*) as 人次, D.诊断描述
from 病案主页 A,住院费用记录 B,收费项目类别 C,病人诊断记录 D
where A.病人ID=D.病人ID
AND D.病人ID=B.病人ID
AND A.主页ID=B.主页ID
AND D.记录来源=4
AND D.诊断类型=3
AND D.诊断次序=1
AND C.编码=B.收费类别
AND A.出院日期 BETWEEN trunc(sysdate,'mm')
AND trunc(sysdate+1)
group by D.诊断描述
order by 人次 desc)
where rownum<=10'''

#当前在院病人数
sqlinhosnum='''Select count(*)  当前在院病人数  From 病案主页  Where 出院日期 is null and 主页ID >0 and 出院病床 is not null'''

#当前预出院人数
sqlpreparatorynum='''Select count(*) as 预出院病人数
From 病人信息 A, 病案主页 B,病人变动记录 Z
Where A.病人ID = B.病人ID  
And Nvl(B.主页ID, 0) <> 0    
And B.病人ID = Z.病人ID(+) 
And B.主页ID = Z.主页ID(+) 
And Z.开始原因(+) = 10 
And Z.附加床位(+) = 0 
And A.在院=1 
And B.状态=3'''

#当月出院未结账人数
sqlnochecknum='''Select count(*) as 出院未结账病人数
From 病人信息 A, 病案主页 B
Where A.病人ID = B.病人ID  
And Nvl(B.主页ID, 0) <> 0
And B.出院日期 Between trunc(sysdate,'mm')
AND trunc(sysdate+1)
And Exists
(Select 1 From 病人未结费用 
Where 病人id = a.病人id 
And Nvl(主页id,0) = Nvl(b.主页id,0) 
And Rownum < 2)'''

#当日接诊人次
sqlconsultationnum='''Select count(*) as 当日接诊人次
From 病人挂号记录 A,挂号安排 B
Where A.登记时间 Between 
to_date(to_char(sysdate,'yyyy-mm-dd')||' 00:00:00','yyyy-mm-dd hh24:mi:ss')
and sysdate
And A.执行部门id Is Not Null
AND A.号别=B.号码'''
 
#当前待诊人次
sqlwaitnums='''select count(*) as 待诊数  from 
病人挂号记录 where 执行状态=0
and 记录性质=1
and 记录状态=1
and 登记时间 >trunc(sysdate)
and 诊室 is not null and 诊室<>'NONE' '''

#当前坐诊医生数
sqldoctornums='''select count(distinct 科室名称) as 排班科室数 from
(Select Distinct To_Char(sysdate,'yyyy-MM-dd') As 日期,
       Decode(To_Char(sysdate, 'D'), '1', '星期日', '2', '星期一', '3', '星期二', '4', '星期三', '5', '星期四', '6','星期五', '7', '星期六', Null) As 星期,
       P.ID,p.计划ID,P.号码 as 专业代码,E.编码 As 号类,P.科室ID,B.名称 As 科室名称,P.项目ID,C.名称 As 项目名称,ZLHIS.b_Zlgy_Onecardinterface.Getprice(P.项目ID) As 挂号费, P.医生ID  医生ID,
 P.医生姓名  as 医生,
       Nvl(A.已挂数,0) as 已挂,Nvl(A.已约数,0) as 已约,P.限号数 as 限挂,P.限约数 as 限约,Nvl(P.病案必须,0) as 病案,
       Nvl(C.项目特性,0) as 是否急诊,P.周日,P.周一 ,P.周二 ,P.周三 ,P.周四 ,P.周五 ,P.周六 ,
       Decode(P.分诊方式,1,'指定',2,'动态',3,'平均',NULL) as 分诊方式,P.序号控制,P.排班,
       to_char(D.开始时间,'hh24:mi:ss') As 排班开始时间,to_char(D.终止时间-1/24/2,'hh24:mi:ss') As 排班终止时间,
       decode(f.安排ID,null,0,1) as 是否分时段
 From  (  Select P.ID,0 as 计划ID,P.号码 ,P.号类,P.科室ID,P.项目ID,P.医生ID,P.医生姓名,P.限号数,P.限约数,Nvl(P.病案必须,0) as 病案必须,
                 P.周日,P.周一 ,P.周二 ,P.周三 ,P.周四 ,P.周五 ,P.周六,P.分诊方式,P.序号控制,
                 Decode(To_Char(Sysdate,'D'),'1',P.周日,'2',P.周一,'3',P.周二,'4',P.周三,'5',P.周四,'6',P.周五,'7',P.周六,NULL) as 排班  
           From (Select A.ID, A.号码, A.号类, A.科室id, A.项目id, A.医生id, A.医生姓名, A.病案必须, A. 周日, A.周一, A.周二, A.周三,A.周四 , A.周五, A.周六,
                        A.分诊方式,a.开始时间,a.终止时间, A.序号控制, B.限号数, B.限约数,a.停用日期  
                  From 挂号安排 A, 挂号安排限制 B 
                  Where a.停用日期 Is Null And Sysdate Between Nvl(a.开始时间, To_Date('1900-01-01', 'YYYY-MM-DD')) And Nvl(a.终止时间, To_Date('3000-01-01', 'YYYY-MM-DD'))
                    And a.ID = B.安排id(+) And Decode(To_Char(Sysdate, 'D'), '1', '周日', '2', '周一', '3', '周二', '4', '周三', '5', '周四', '6', '周五', '7', '周六', Null) = B.限制项目(+) 
                    And Decode(To_Char(Sysdate, 'D'), '1', a.周日, '2', a.周一, '3', a.周二, '4', a.周三, '5', a.周四, '6', a.周五, '7',a.周六, Null) Is Not Null) P  
           Where Not Exists(Select 1 From 挂号安排停用状态 Where 安排ID=P.ID and Sysdate between 开始停止时间 and 结束停止时间 )  ) P,        
       (  Select A.ID as 安排ID,B.已挂数,B.已约数   
           From (Select A.ID, A.号码, A.号类, A.科室id, A.项目id, A.医生id, A.医生姓名, A.病案必须, A. 周日, A.周一, A.周二, A.周三,A.周四 , A.周五, A.周六,
                        A.分诊方式,a.开始时间,a.终止时间, A.序号控制, B.限号数, B.限约数,a.停用日期
                  From 挂号安排 A, 挂号安排限制 B
                  Where a.停用日期 Is Null And Sysdate Between Nvl(a.开始时间, To_Date('1900-01-01', 'YYYY-MM-DD')) And Nvl(a.终止时间, To_Date('3000-01-01', 'YYYY-MM-DD'))
                    And a.ID = B.安排id(+) And Decode(To_Char(Sysdate, 'D'), '1', '周日', '2', '周一', '3', '周二', '4', '周三', '5', '周四', '6', '周五', '7', '周六', Null) = B.限制项目(+) 
                    And Decode(To_Char(Sysdate, 'D'), '1', a.周日, '2', a.周一, '3', a.周二, '4', a.周三, '5', a.周四, '6', a.周五, '7',a.周六, Null) Is Not Null) A,
                 病人挂号汇总 B  
           Where A.科室ID = B.科室ID And A.项目ID = B.项目ID And Nvl(A.医生ID,0)=Nvl(B.医生ID,0) And Nvl(A.医生姓名,'医生')=Nvl(B.医生姓名,'医生') 
             And (A.号码=B.号码 or B.号码 is Null )  And B.日期=TRUNC(Sysdate)) A,
       部门表 B,收费项目目录 C ,时间段 D,号类 E,
       (Select Distinct 安排id From 挂号安排时段 Where 星期=Decode(To_Char(Sysdate, 'D'),'1','周日','2','周一','3','周二','4','周三','5','周四','6','周五','7','周六',Null)) F
 Where P.ID=A.安排ID(+) And P.科室ID=B.ID And P.项目ID=C.Id And (C.撤档时间 is NULL Or C.撤档时间=To_Date('3000-01-01','YYYY-MM-DD')) 
   And (B.站点='-' Or B.站点 is Null)  And Decode(To_Char(sysdate,'D'),'1',P.周日,'2',P.周一,'3',P.周二,'4',P.周三,'5',P.周四,'6',P.周五,'7',P.周六,NULL)=D.时间段
   And Decode(To_Char(Sysdate,'D'),'1',P.周日,'2',P.周一,'3',P.周二,'4',P.周三,'5',P.周四,'6',P.周五,'7',P.周六,NULL) 
       In(Select 时间段 From 时间段 Where ('3000-01-10 '||To_Char(Sysdate,'HH24:MI:SS') Between Decode(Sign(开始时间-(终止时间-1/24/2)),1,'3000-01-09 '||To_Char(开始时间,'HH24:MI:SS'),'3000-01-10 '||To_Char(开始时间,'HH24:MI:SS')) 
                 And '3000-01-10 '||To_Char(终止时间-1/24/2,'HH24:MI:SS')) Or ('3000-01-10 '||To_Char(Sysdate,'HH24:MI:SS')  Between  '3000-01-10 '||To_Char(开始时间,'HH24:MI:SS') 
                 And Decode(Sign(开始时间-(终止时间-1/24/2)),1,'3000-01-11 '||To_Char(终止时间-1/24/2,'HH24:MI:SS'),'3000-01-10 '||To_Char(终止时间-1/24/2,'HH24:MI:SS')))) 
   And (Nvl(P.医生ID,0)=0 Or Exists(Select 1 From 人员表 Q Where P.医生ID=Q.ID And (Q.撤档时间 = To_Date('3000-01-01', 'YYYY-MM-DD') Or Q.撤档时间 Is Null))) 
   And (Case When /*B0*/0/*E0*/=0 Then 0 Else p.科室Id End)=/*B0*/0/*E0*/
   And (Case When /*B1*/0/*E1*/=0 Then 0 Else p.医生Id End)=/*B1*/0/*E1*/
   And P.号类=E.名称(+)
   ANd P.id=F.安排ID(+)
   and nvl(P.限约数,0)>0
Order by p.号码)'''

#平均等待时间
sqlavgwaitingtime='''select round(avg(a.等待时间分),0) as 平均等待时间分钟
from (select ceil(((执行时间-登记时间))*24*60) as 等待时间分 from 
病人挂号记录 where 执行状态=1
and 记录性质=1
and 记录状态=1
and 登记时间 >trunc(sysdate)
and 诊室 is not null and 诊室<>'NONE' 
and ceil(((执行时间-登记时间))*24*60)<240
and 执行时间>登记时间) a'''
 
#当月六盘水地区出院病人分布
sqlpatdis='''select count(*) as 人数,位置 from
(Select SUBSTR(A.家庭地址，8， 3) as 位置
From 病人信息 A, 病案主页 B, 病案主页从表 D, 医保病人档案 E, 医保病人关联表 F, 病人余额 X, 部门表 C, 部门表 H 
Where A.病人ID = B.病人ID And B.出院科室ID = C.ID And Nvl(B.主页ID, 0) <> 0 And B.病人ID = D.病人ID(+) And B.主页ID = D.主页ID(+) And 
      D.信息名(+) = '医保号' And A.病人ID = X.病人ID(+) And X.性质(+) = 1 And X.类型(+)=2 And A.病人ID = F.病人ID(+) And A.险类 = F.险类(+) And F.标志(+) = 1 And 
      F.医保号 = E.医保号(+) And F.险类 = E.险类(+) And F.中心 = E.中心(+) And B.当前病区ID + 0 = H.ID 
    And (H.站点='0' Or H.站点 is Null) 
And B.出院日期 BETWEEN trunc(sysdate,'mm')
AND trunc(sysdate+1))
where 位置 in ('钟山区','水城县','盘县')
group by 位置''' 

#当月结帐金额累计
sqlincomebythismon='''select sum(费用) as 费用,名称 from
(select sum(B.结帐金额) as 费用,
decode(C.名称,
'中成药','药品费',
'西药费','药品费',
'中草药','药品费',
'治疗费','治疗费',
'材料费','材料费',
'化验费','化验费',
'诊查费','诊查费',
'心电图','检查费',
'检查费','检查费',
'护理费','护理费',
'放射费','检查费',
'图文费','检查费',
'输血费','输血费',
'麻醉费','麻醉费',
'手术费','手术费',
'其他费','其他费',
'床位费','床位费',
'B超费','检查费','其他费') as 名称
from 病案主页 A,y_病人住院结帐汇总 B,收入项目 C
where A.病人ID=B.病人ID
AND A.主页ID=B.主页ID
AND C.id=B.收入项目id
AND C.上级id is not null
AND B.结帐时间 BETWEEN trunc(sysdate,'mm')
AND trunc(sysdate+1)
group by C.名称)group by 名称'''


#当日结帐金额累计
sqlincomebythisday='''select sum(费用) as 费用,名称 from
(select sum(B.结帐金额) as 费用,
decode(C.名称,
'中成药','药品费',
'西药费','药品费',
'中草药','药品费',
'治疗费','治疗费',
'材料费','材料费',
'化验费','化验费',
'诊查费','诊查费',
'心电图','检查费',
'检查费','检查费',
'护理费','护理费',
'放射费','检查费',
'图文费','检查费',
'输血费','输血费',
'麻醉费','麻醉费',
'手术费','手术费',
'其他费','其他费',
'床位费','床位费',
'B超费','检查费','其他费') as 名称
from 病案主页 A,y_病人住院结帐汇总 B,收入项目 C
where A.病人ID=B.病人ID
AND A.主页ID=B.主页ID
AND C.id=B.收入项目id
AND C.上级id is not null
AND B.结帐时间 >trunc(sysdate)
group by C.名称)group by 名称'''


#当月每天门诊人次
sqlnumbydaym='''select count(*) as 接诊人次,to_char(发生时间,'dd') as 时间
 from 
 病人挂号记录
 where 执行状态 in (1,2)
 and 记录性质=1
 and 记录状态=1
 and 急诊=0
 and 接收时间 BETWEEN trunc(sysdate,'mm')
AND trunc(sysdate+1)
group by to_char(发生时间,'dd')
order by to_char(发生时间,'dd')'''

#当月每天急诊人次
sqlnumbydaye='''select count(*) as 接诊人次,to_char(发生时间,'dd') as 时间
from 
病人挂号记录
where 执行状态 in (1,2)
and 记录性质=1
and 记录状态=1
and 急诊=1
and 接收时间 BETWEEN trunc(sysdate,'mm')
AND trunc(sysdate+1)
group by to_char(发生时间,'dd')
order by to_char(发生时间,'dd')'''

#当月每天入院人次
sqlnumbydayi='''select count(*) as 入院人次,to_char(入院日期,'dd') as 时间
from 病案主页
where 入院日期  BETWEEN trunc(sysdate,'mm')
AND trunc(sysdate+1)
group by to_char(入院日期,'dd')
order by to_char(入院日期,'dd')'''

#当月每天出院人次
sqlnumbydayo='''select count(*) as 出院人次,to_char(出院日期,'dd') as 时间
from 病案主页
where 出院日期  BETWEEN trunc(sysdate,'mm')
AND trunc(sysdate+1)
group by to_char(出院日期,'dd')
order by to_char(出院日期,'dd')'''

#当月医保结账费用
sqlmedinsu='''SELECT sum(总金额) as 费用,医保类型 FROM (
select DECODE(C.险类,
NULL,'自费病人',
910,'水钢医保',
111,decode(C.医疗类别,1,'市居民医保',21,'市职工医保',11,'市职工医保',12,'市职工医保',2,
'市居民医保',31,'离休','22','退休','4','市居民医保','32','二残军人','市居民医保'),
235,decode(D.农合类型,'520203','六枝农合','520206','北部五乡镇','520222','盘县农合','520221','水城县农合','520201','钟山区农合',D.农合类型||'其他'),
811,'钟山区农合内部医保',
810,DECODE(C.医疗类别,1,'计划生育',2,'新工伤',3,'老工伤',4,'公司领导',5,'水城县农合大病',6,'水城县农合大病',7,'水城县农合大病',8,'水城县农合大病',9,'水城县农合大病',
12,'盘县农合',13,'六枝农合',15,'水城县农合大病',16,'水城县农合大病',17,'医学观察',18,'外聘专家',19,'水城县农合大病',20,'水城县农合大病',23,'六枝农合大病',
29,'新职业病',30,'老职业病',33,'盘新农合大病',34,'六枝农合大病',35,'水城县农合大病',37,'120',38,'盘新农合大病'),
C.险类) as 医保类型,Sum(A.冲预交) 总金额
  from 病人预交记录 A, 病人结帐记录 B,保险结算记录 C,保险帐户在职 D
 where B.收费时间 BETWEEN trunc(sysdate,'mm')
AND trunc(sysdate+1)
   and A.结帐id = B.id
   AND B.ID=C.记录ID(+)
   AND C.险类=D.险类(+)
   AND C.病人ID=D.病人ID(+)
   GROUP BY D.农合类型,C.医疗类别,C.险类
having Sum(冲预交) <> 0 )
group by 医保类型'''


