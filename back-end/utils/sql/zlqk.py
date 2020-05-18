qyzlqk='''
select
round(治愈/合计,2)*100 as 治愈率, 
round(好转/合计,2)*100 as 好转率, 
round(未愈/合计,2)*100 as 未愈率, 
round(死亡/合计,2)*100 as 死亡率, 
round(其他/合计,2)*100 as 其他
from 
(select 治愈,好转,未愈,死亡,其他,治愈+好转+未愈+死亡+其他 as 合计 from
(select 
nvl(治愈,0) as 治愈,nvl(好转,0) as 好转,nvl(未愈,0) as 未愈,nvl(死亡,0) as 死亡,nvl(其他,0) as 其他
from
(SELECT
        MAX(DECODE(出院情况, '治愈', 数量)) AS 治愈,
        MAX(DECODE(出院情况, '好转', 数量)) AS 好转,
        MAX(DECODE(出院情况, '未愈', 数量)) AS 未愈,
        MAX(DECODE(出院情况, '死亡', 数量)) AS 死亡,
        MAX(DECODE(出院情况, '其他', 数量)) AS 其他
FROM 
(select 出院情况,count(*) as 数量 from
(select distinct A.病人ID,A.主页ID,B.出院情况,A.出院日期,A.住院医师
from 病案主页 A,病人诊断记录 B
where A.病人ID=B.病人ID
and A.主页ID=B.主页ID
and A.出院日期 between TO_DATE(:1,'YYYY-MM-DD HH24:MI:SS')
and TO_DATE(:2,'YYYY-MM-DD HH24:MI:SS')
and B.诊断类型 in (3,13) 
and B.诊断次序=1)
group by 出院情况))))
order by 治愈率 desc
'''

bmyszlqk='''
select 住院医师,
round(治愈/合计,2)*100 as 治愈率, 
round(好转/合计,2)*100 as 好转率, 
round(未愈/合计,2)*100 as 未愈率, 
round(死亡/合计,2)*100 as 死亡率, 
round(其他/合计,2)*100 as 其他
from 
(select 住院医师,治愈,好转,未愈,死亡,其他,治愈+好转+未愈+死亡+其他 as 合计 from
(select 
住院医师,nvl(治愈,0) as 治愈,nvl(好转,0) as 好转,nvl(未愈,0) as 未愈,nvl(死亡,0) as 死亡,nvl(其他,0) as 其他
from
(SELECT 住院医师,
        MAX(DECODE(出院情况, '治愈', 数量)) AS 治愈,
        MAX(DECODE(出院情况, '好转', 数量)) AS 好转,
        MAX(DECODE(出院情况, '未愈', 数量)) AS 未愈,
        MAX(DECODE(出院情况, '死亡', 数量)) AS 死亡,
        MAX(DECODE(出院情况, '其他', 数量)) AS 其他
FROM 
(select 出院情况,住院医师,count(*) as 数量 from
(select distinct A.病人ID,A.主页ID,C.名称 as 出院科室,B.出院情况,A.出院日期,A.住院医师
from 病案主页 A,病人诊断记录 B,部门表 C
where A.病人ID=B.病人ID
and A.出院科室ID=C.ID
and A.主页ID=B.主页ID
and A.出院科室ID=:1
and A.出院日期 between TO_DATE(:2,'YYYY-MM-DD HH24:MI:SS')
and TO_DATE(:3,'YYYY-MM-DD HH24:MI:SS')
and B.诊断类型 in (3,13) 
and B.诊断次序=1)
group by 出院情况,住院医师)
GROUP BY 住院医师)))
order by 治愈率 desc
'''
