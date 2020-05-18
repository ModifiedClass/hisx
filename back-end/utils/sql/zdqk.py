qyzdqk='''
select 
count(*) as 总数,
sum(case when 确诊日期-入院日期<3 then 1 else 0 end) as 三日内确诊数,
sum(case when 西医入院诊断=西医出院诊断 then 1 else 0 end) as 入出院诊断符合数
from
(select 病人id,主页id,出院科室,
max(decode(诊断类型,'1',诊断)) as 西医门诊诊断,
max(decode(诊断类型,'2',诊断)) as 西医入院诊断,
max(decode(诊断类型,'3',诊断)) as 西医出院诊断,
max(decode(诊断类型,'5',诊断)) as 院内感染,
max(decode(诊断类型,'6',诊断)) as 病理诊断,
max(decode(诊断类型,'7',诊断)) as 损伤中毒码,
max(decode(诊断类型,'8',诊断)) as 术前诊断,
max(decode(诊断类型,'9',诊断)) as 术后诊断,
max(decode(诊断类型,'10',诊断)) as 并发症,
max(decode(诊断类型,'11',诊断)) as 中医门诊诊断,
max(decode(诊断类型,'12',诊断)) as 中医入院诊断,
max(decode(诊断类型,'13',诊断)) as 中医出院诊断,
max(decode(诊断类型,'21',诊断)) as 病原学诊断,
max(decode(诊断类型,'22',诊断)) as 影像学诊断,
确诊日期,入院日期,出院日期,住院医师 from
(select distinct A.病人ID,A.主页ID,D.名称 as 出院科室,B.诊断类型,C.编码||C.名称 as 诊断,A.确诊日期,A.入院日期,A.出院日期,A.住院医师
from 病案主页 A,病人诊断记录 B,疾病编码目录 C,部门表 D
where A.病人ID=B.病人ID
and A.出院科室id=D.ID
and B.疾病ID=C.ID
and A.主页ID=B.主页ID
and A.出院日期 between TO_DATE(:1,'YYYY-MM-DD HH24:MI:SS')
and TO_DATE(:2,'YYYY-MM-DD HH24:MI:SS'))
group by 病人id,主页id,出院科室,确诊日期,入院日期,出院日期,住院医师
order by 出院科室,病人id)
'''

bmyszdqk='''
select 
住院医师,
count(*) as 总数,
sum(case when 确诊日期-入院日期<3 then 1 else 0 end) as 三日内确诊数,
sum(case when 西医入院诊断=西医出院诊断 then 1 else 0 end) as 入出院诊断符合数
from
(select 病人id,主页id,出院科室,
max(decode(诊断类型,'1',诊断)) as 西医门诊诊断,
max(decode(诊断类型,'2',诊断)) as 西医入院诊断,
max(decode(诊断类型,'3',诊断)) as 西医出院诊断,
max(decode(诊断类型,'5',诊断)) as 院内感染,
max(decode(诊断类型,'6',诊断)) as 病理诊断,
max(decode(诊断类型,'7',诊断)) as 损伤中毒码,
max(decode(诊断类型,'8',诊断)) as 术前诊断,
max(decode(诊断类型,'9',诊断)) as 术后诊断,
max(decode(诊断类型,'10',诊断)) as 并发症,
max(decode(诊断类型,'11',诊断)) as 中医门诊诊断,
max(decode(诊断类型,'12',诊断)) as 中医入院诊断,
max(decode(诊断类型,'13',诊断)) as 中医出院诊断,
max(decode(诊断类型,'21',诊断)) as 病原学诊断,
max(decode(诊断类型,'22',诊断)) as 影像学诊断,
确诊日期,入院日期,出院日期,住院医师 from
(select distinct A.病人ID,A.主页ID,D.名称 as 出院科室,B.诊断类型,C.编码||C.名称 as 诊断,A.确诊日期,A.入院日期,A.出院日期,A.住院医师
from 病案主页 A,病人诊断记录 B,疾病编码目录 C,部门表 D
where A.病人ID=B.病人ID
and A.出院科室id=D.ID
and B.疾病ID=C.ID
and A.主页ID=B.主页ID
and A.出院科室id=:1
and A.出院日期 between TO_DATE(:2,'YYYY-MM-DD HH24:MI:SS')
and TO_DATE(:3,'YYYY-MM-DD HH24:MI:SS'))
group by 病人id,主页id,出院科室,确诊日期,入院日期,出院日期,住院医师
order by 出院科室,病人id)
group by 住院医师
'''
