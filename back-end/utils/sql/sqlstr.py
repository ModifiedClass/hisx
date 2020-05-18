hisconn="zlhis/z2ohis@192.168.100.120:1521/orcl"
zyks='''select ID,名称 from 部门表 where 上级id=122 and 撤档时间>sysdate order by 简码'''