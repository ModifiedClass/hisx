hisconn="zlhis/z2ohis@192.168.100.120:1521/orcl"
oracleconn={
'his':{'u':'zlhis','p':'z2ohis','host':'192.168.100.120','port':'1521','instance':'orcl'},
'his1':{'u':'wbjkzy','p':'his','host':'192.168.100.120','port':'1521','instance':'orcl'},
'tjxt':{'u':'tjxt','p':'tjxt','host':'192.168.100.107','port':'1521','instance':'tjxt'}
}
zyks='''select ID,名称 from 部门表 where 上级id=122 and 撤档时间>sysdate order by 简码'''
mzks='''select ID,名称 from 部门表 where 上级id=121 and 撤档时间>sysdate order by 简码'''