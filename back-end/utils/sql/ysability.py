zyysability='''
select
住院医师, 
总数 as 收病人数,
平均住院天数,
round(治愈/总数*100,2) as 治愈率,
round(好转/总数*100,2) as 好转率,
round(未愈/总数*100,2) as 未愈率,
round(死亡/总数*100,2) as 死亡率,
round(其他/总数*100,2) as 其他,
round(三日内确诊/总数*100,2) as 三日内确诊率,
round(入出院诊断符合/总数*100,2) as 入出院诊断符合率,
round(药品/合计*100,2) as 药占比,
round(材料/合计*100,2) as 材料占比,
round(检查/合计*100,2) as 检查占比,
round(治疗/合计*100,2) as 治疗占比,
round(其他费用/合计*100,2) as 其他费用占比,
平均费用 from
(select 
住院医师,
count(*) as 总数,
sum(case when 出院情况='治愈' then 1 else 0 end) as 治愈,
sum(case when 出院情况='好转' then 1 else 0 end) as 好转,
sum(case when 出院情况='未愈' then 1 else 0 end) as 未愈,
sum(case when 出院情况='死亡' then 1 else 0 end) as 死亡,
sum(case when 出院情况='其他' then 1 else 0 end) as 其他,
sum(case when 确诊日期-入院日期<3 then 1 else 0 end) as 三日内确诊,
sum(case when 西医入院诊断=西医出院诊断 then 1 else 0 end) as 入出院诊断符合,
sum(nvl(药品,0)) as 药品,sum(nvl(材料,0)) as 材料,sum(nvl(检查,0)) as 检查,sum(nvl(治疗,0)) as 治疗,sum(nvl(其他,0)) as 其他费用，
sum(nvl(药品,0)+nvl(材料,0)+nvl(检查,0)+nvl(治疗,0)+nvl(其他,0)) as 合计,
round(avg(nvl(药品,0)+nvl(材料,0)+nvl(检查,0)+nvl(治疗,0)+nvl(其他,0)),2) as 平均费用,round(avg(住院天数),0) as 平均住院天数
from
(select E.*,F.出院情况 from
(select 病人id,主页id,住院医师,病人科室ID,入院日期,住院天数,确诊日期,
max(decode(诊断类型,'2',诊断)) as 西医入院诊断,
max(decode(诊断类型,'3',诊断)) as 西医出院诊断,
max(decode(收费类别,'5',费用,'6',费用,'7',0)) as 药品,
max(decode(收费类别,'4',费用,'M',0)) as 材料,
max(decode(收费类别,'C',费用,'D',费用)) as 检查,
max(decode(收费类别,'E',费用,'F',费用,0)) as 治疗,
max(decode(收费类别,'1',费用,'G',费用,'H',费用,'I',费用,'J',费用,'K',费用,'L',费用,'Z',费用,0)) as 其他 from
(select
A.病人id,A.主页id,B.住院医师,A.病人科室ID,B.住院天数,A.收费类别,B.入院日期,B.确诊日期,sum(A.实收金额) as 费用,D.编码||D.名称 as 诊断,C.诊断类型
from 住院费用记录 A,病案主页 B,病人诊断记录 C,疾病编码目录 D
where A.病人id=B.病人ID
and A.主页id=B.主页id
and B.病人ID=C.病人ID
and B.主页id=C.主页id
and C.疾病ID=D.Id
and A.记录状态<>0
and A.病人科室ID=:1
and B.出院日期 Between to_date(:2, 'yyyy-mm-dd hh24:mi:ss') and to_date(:3, 'yyyy-mm-dd hh24:mi:ss')
group by A.病人id,A.主页id,B.住院医师,A.病人科室ID,B.住院天数,A.收费类别,B.入院日期,B.确诊日期,D.编码||D.名称,C.诊断类型,C.出院情况)
group by 病人id,主页id,住院医师,病人科室ID,入院日期,住院天数,确诊日期) E,病人诊断记录 F
where E.主页id=F.主页id
and E.病人ID=F.病人ID
and F.记录来源=3
and F.诊断次序=1
and F.出院情况 is not null)
where 住院医师 is not null
group by 住院医师)
order by 2 desc
'''
zyability='''
select
总数 as 收病人数,
平均住院天数,
round(治愈/总数*100,2) as 治愈率,
round(好转/总数*100,2) as 好转率,
round(未愈/总数*100,2) as 未愈率,
round(死亡/总数*100,2) as 死亡率,
round(其他/总数*100,2) as 其他,
round(三日内确诊/总数*100,2) as 三日内确诊率,
round(入出院诊断符合/总数*100,2) as 入出院诊断符合率,
round(药品/合计*100,2) as 药占比,
round(材料/合计*100,2) as 材料占比,
round(检查/合计*100,2) as 检查占比,
round(治疗/合计*100,2) as 治疗占比,
round(其他费用/合计*100,2) as 其他费用占比,
平均费用 from
(select 
count(*) as 总数,
sum(case when 出院情况='治愈' then 1 else 0 end) as 治愈,
sum(case when 出院情况='好转' then 1 else 0 end) as 好转,
sum(case when 出院情况='未愈' then 1 else 0 end) as 未愈,
sum(case when 出院情况='死亡' then 1 else 0 end) as 死亡,
sum(case when 出院情况='其他' then 1 else 0 end) as 其他,
sum(case when 确诊日期-入院日期<3 then 1 else 0 end) as 三日内确诊,
sum(case when 西医入院诊断=西医出院诊断 then 1 else 0 end) as 入出院诊断符合,
sum(nvl(药品,0)) as 药品,sum(nvl(材料,0)) as 材料,sum(nvl(检查,0)) as 检查,sum(nvl(治疗,0)) as 治疗,sum(nvl(其他,0)) as 其他费用，
sum(nvl(药品,0)+nvl(材料,0)+nvl(检查,0)+nvl(治疗,0)+nvl(其他,0)) as 合计,
round(avg(nvl(药品,0)+nvl(材料,0)+nvl(检查,0)+nvl(治疗,0)+nvl(其他,0)),2) as 平均费用,round(avg(住院天数),0) as 平均住院天数
from
(select E.*,F.出院情况 from
(select 病人id,主页id,住院医师,病人科室ID,入院日期,住院天数,确诊日期,
max(decode(诊断类型,'2',诊断)) as 西医入院诊断,
max(decode(诊断类型,'3',诊断)) as 西医出院诊断,
max(decode(收费类别,'5',费用,'6',费用,'7',0)) as 药品,
max(decode(收费类别,'4',费用,'M',0)) as 材料,
max(decode(收费类别,'C',费用,'D',费用)) as 检查,
max(decode(收费类别,'E',费用,'F',费用,0)) as 治疗,
max(decode(收费类别,'1',费用,'G',费用,'H',费用,'I',费用,'J',费用,'K',费用,'L',费用,'Z',费用,0)) as 其他 from
(select
A.病人id,A.主页id,B.住院医师,A.病人科室ID,B.住院天数,A.收费类别,B.入院日期,B.确诊日期,sum(A.实收金额) as 费用,D.编码||D.名称 as 诊断,C.诊断类型
from 住院费用记录 A,病案主页 B,病人诊断记录 C,疾病编码目录 D
where A.病人id=B.病人ID
and A.主页id=B.主页id
and B.病人ID=C.病人ID
and B.主页id=C.主页id
and C.疾病ID=D.Id
and A.记录状态<>0
and B.出院日期 Between to_date(:1, 'yyyy-mm-dd hh24:mi:ss') and to_date(:2, 'yyyy-mm-dd hh24:mi:ss')
group by A.病人id,A.主页id,B.住院医师,A.病人科室ID,B.住院天数,A.收费类别,B.入院日期,B.确诊日期,D.编码||D.名称,C.诊断类型,C.出院情况)
group by 病人id,主页id,住院医师,病人科室ID,入院日期,住院天数,确诊日期) E,病人诊断记录 F
where E.主页id=F.主页id
and E.病人ID=F.病人ID
and F.记录来源=3
and F.诊断次序=1
and F.出院情况 is not null)
where 住院医师 is not null)
'''

mzysability='''
select
门诊医师, 
总数 as 收病人数,
round(药品/合计*100,2) as 药占比,
round(材料/合计*100,2) as 材料占比,
round(检查/合计*100,2) as 检查占比,
round(治疗/合计*100,2) as 治疗占比,
round(其他费用/合计*100,2) as 其他费用占比,
平均费用 from
(select
执行人 as 门诊医师,
count(*) as 总数,
sum(nvl(药品,0)) as 药品,sum(nvl(材料,0)) as 材料,sum(nvl(检查,0)) as 检查,sum(nvl(治疗,0)) as 治疗,sum(nvl(其他,0)) as 其他费用，
sum(nvl(药品,0)+nvl(材料,0)+nvl(检查,0)+nvl(治疗,0)+nvl(其他,0)) as 合计,
round(avg(nvl(药品,0)+nvl(材料,0)+nvl(检查,0)+nvl(治疗,0)+nvl(其他,0)),2) as 平均费用 
from
(select 病人id,执行部门ID,执行人,
max(decode(收费类别,'5',费用,'6',费用,'7',0)) as 药品,
max(decode(收费类别,'4',费用,'M',0)) as 材料,
max(decode(收费类别,'C',费用,'D',费用)) as 检查,
max(decode(收费类别,'E',费用,'F',费用,0)) as 治疗,
max(decode(收费类别,'1',费用,'G',费用,'H',费用,'I',费用,'J',费用,'K',费用,'L',费用,'Z',费用,0)) as 其他 from
(select
A.病人id,B.执行部门ID,B.执行人,收费类别,sum(实收金额) as 费用
from 门诊费用记录 A,病人挂号记录 B
where A.病人ID=B.病人ID 
and A.挂号id=B.ID
and A.记录性质 in (1,4)
and A.记录状态=1
and A.门诊标志=1
and B.执行状态=1
and B.记录状态=1
and B.执行部门ID=:1
and A.发生时间 Between to_date(:2, 'yyyy-mm-dd hh24:mi:ss') and  to_date(:3, 'yyyy-mm-dd hh24:mi:ss')
group by A.病人id,B.执行部门ID,B.执行人,收费类别)
group by 病人id,执行部门ID,执行人)
group by 执行人)
'''
mzability='''
select
总数 as 收病人数,
round(药品/合计*100,2) as 药占比,
round(材料/合计*100,2) as 材料占比,
round(检查/合计*100,2) as 检查占比,
round(治疗/合计*100,2) as 治疗占比,
round(其他费用/合计*100,2) as 其他费用占比,
平均费用 from
(select
count(*) as 总数,
sum(nvl(药品,0)) as 药品,sum(nvl(材料,0)) as 材料,sum(nvl(检查,0)) as 检查,sum(nvl(治疗,0)) as 治疗,sum(nvl(其他,0)) as 其他费用，
sum(nvl(药品,0)+nvl(材料,0)+nvl(检查,0)+nvl(治疗,0)+nvl(其他,0)) as 合计,
round(avg(nvl(药品,0)+nvl(材料,0)+nvl(检查,0)+nvl(治疗,0)+nvl(其他,0)),2) as 平均费用 
from
(select 病人id,执行部门ID,执行人,
max(decode(收费类别,'5',费用,'6',费用,'7',0)) as 药品,
max(decode(收费类别,'4',费用,'M',0)) as 材料,
max(decode(收费类别,'C',费用,'D',费用)) as 检查,
max(decode(收费类别,'E',费用,'F',费用,0)) as 治疗,
max(decode(收费类别,'1',费用,'G',费用,'H',费用,'I',费用,'J',费用,'K',费用,'L',费用,'Z',费用,0)) as 其他 from
(select
A.病人id,B.执行部门ID,B.执行人,收费类别,sum(实收金额) as 费用
from 门诊费用记录 A,病人挂号记录 B
where A.病人ID=B.病人ID 
and A.挂号id=B.ID
and A.记录性质 in (1,4)
and A.记录状态=1
and A.门诊标志=1
and B.执行状态=1
and B.记录状态=1
and A.发生时间 Between to_date(:1, 'yyyy-mm-dd hh24:mi:ss') and to_date(:2, 'yyyy-mm-dd hh24:mi:ss')
group by A.病人id,B.执行部门ID,B.执行人,收费类别)
group by 病人id,执行部门ID,执行人))
'''