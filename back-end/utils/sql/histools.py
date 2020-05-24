tablespacestatus='''
select 表空间名,min(使用率) "使用率%" from
(SELECT a.tablespace_name "表空间名",
round((total - free) / total, 4) * 100 "使用率"
FROM (SELECT FILE_ID,tablespace_name, SUM(bytes) free
FROM dba_free_space
GROUP BY FILE_ID,tablespace_name) a,
(SELECT FILE_ID,FILE_NAME,tablespace_name, SUM(bytes) total
FROM dba_data_files
GROUP BY FILE_ID,FILE_NAME,tablespace_name) b
WHERE a.FILE_ID=B.FILE_ID)
group by 表空间名
order by 表空间名
'''

onetablespacestatus='''
SELECT a.tablespace_name "表空间名",B.file_name "文件路径",
total / (1024 * 1024) "表空间大小(M)",
round((total - free) / total, 4) * 100 "使用率%"
FROM (SELECT FILE_ID,tablespace_name, SUM(bytes) free
FROM dba_free_space
GROUP BY FILE_ID,tablespace_name) a,
(SELECT FILE_ID,FILE_NAME,tablespace_name, SUM(bytes) total
FROM dba_data_files
GROUP BY FILE_ID,FILE_NAME,tablespace_name) b
WHERE a.FILE_ID=B.FILE_ID
and a.tablespace_name=:1
ORDER BY 表空间名,A.file_ID
'''

locktablestatus='''
SELECT dob.OBJECT_NAME 表名,lo.SESSION_ID，vss.SERIAL#
From v$locked_object lo, dba_objects dob, v$session vss, V$PROCESS VPS
Where lo.OBJECT_ID = dob.OBJECT_ID
and lo.SESSION_ID = vss.SID
AND VSS.paddr = VPS.addr
order by 2,3,DOB.object_name
'''

unlocktables='''
ALTER system kill session ':1'
'''