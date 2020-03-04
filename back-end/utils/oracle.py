import os
os.environ['NLS_LANG'] = 'SIMPLIFIED CHINESE_CHINA.UTF8'

class oracleUtils():
    def __init__(self):
        self.connectObj = ""
        self.connCnt = 0
        self.cursorCnt = 0
 
    def initOraConn(self,ip,port,dbname,user,password):
        oracle_tns = cx_Oracle.makedsn(ip, port,dbname)
        if self.connCnt == 0:
            self.connectObj = cx_Oracle.connect(user, password, oracle_tns)
            self.connCnt += 1
 
    def getOraConn(self):
        self.initOraConn()
        return self.connectObj
  
    def closeOraConn(self, connectObj):
        connectObj.close()
        self.connCnt -= 1
 
    def getOraCur(self):
        self.initOraConn)
        self.cursorCnt += 1
        return self.connectObj.cursor()
 
    def closeOraCur(self, cursorObj):
        cursorObj.close()
        self.cursorCnt -= 1
        if self.cursorCnt == 0:
            print "will close conn"
        self.closeOraConn(self.connectObj)
 
    def selectFromDbTable(self, sql, argsDict):
        # 将查询结果由tuple转为list
        queryAnsList = []
        selectCursor = self.getOraCur()
        selectCursor.prepare(sql)
        queryAns = selectCursor.execute(None, argsDict)
        for ansItem in queryAns:
            queryAnsList.append(list(ansItem))
 
        self.closeOraCur(selectCursor)
        return queryAnsList

'''
数据库连接
1、使用tns串连接
oracle_tns = cx_Oracle.makedsn('XXX.XXX.XXX.XXX', 1521,'oracleName')
connectObj = cx_Oracle.connect('oracleUserName', 'password', oracle_tns)
 
2、其他简洁方式
db = cx_Oracle.connect('hr', 'hrpwd', 'localhost:1521/XE')
db1 = cx_Oracle.connect('hr/hrpwd@localhost:1521/XE')
 
数据库断开连接
connectObj.close()
 
建立游标
cursorObj = connectObj.cursor()
 

关闭游标
cursorObj.close()
 
增
1、单条插入：
sql = "INSERT INTO T_AUTOMONITOR_TMP(point_id) VALUES(:pointId)"
cursorObj.prepare(sql)
rown = cursorObj.execute(None, {'pointId' : pointId})
connectObj.commit()
 

2、多条插入：
sql = "INSERT INTO T_AUTOMONITOR_TMP(point_id) VALUES(:pointId)"
cursorObj.prepare(sql)
rown = cursorObj.executemany(None, recordList)
connectObj.commit()
 

删
sql = "DELETE FROM T_AUTOMONITOR_TMP t WHERE t.point_id = :pointId "
cursorObj.prepare(sql)
rown = cursorObj.execute(None, {'pointId' : pointId})
connectObj.commit()
 

改
sql = "UPDATE t_automonitor_other t\
  SET t.active = '2'\
  WHERE t.active = '1'\
  AND t.point_id = :pointId\
  "
cursorObj.prepare(sql)
cursorObj.execute(None, {'pointId' : pointId})
connectObj.commit()
 

查
sql = "SELECT t.describ FROM t_automonitor_tmp t WHERE t.point_id = :pointId"
cursorObj.prepare(sql)
cursorObj.execute(None, {'pointId' : pointId})
 

'''