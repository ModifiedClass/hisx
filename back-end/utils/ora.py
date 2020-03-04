import os
os.environ['NLS_LANG'] = 'SIMPLIFIED CHINESE_CHINA.UTF8'

class oraUtils():
    def __init__(self,ip,port,dbname,user,password):
        self.ip=ip
        self.port=port
        self.dbname=dbname
        self.user=user
        self.password=password
        self.connectObj = ""
        self.connCnt = 0
        self.cursorCnt = 0
 
    def initOraConn(self):
        oracle_tns = cx_Oracle.makedsn(self.ip, self.port,self.dbname)
        if self.connCnt == 0:
            self.connectObj = cx_Oracle.connect(self.user, self.password, oracle_tns)
            self.connCnt += 1
 
    def getOraConn(self):
        self.initOraConn()
        return self.connectObj
  
    def closeOraConn(self, connectObj):
        connectObj.close()
        self.connCnt -= 1
 
    def getOraCur(self):
        self.initOraConn()
        self.cursorCnt += 1
        return self.connectObj.cursor()
 
    def closeOraCur(self, cursorObj):
        cursorObj.close()
        self.cursorCnt -= 1
        if self.cursorCnt == 0:
            print "will close conn"
        self.closeOraConn(self.connectObj)
 
    def selectDbTable(self, sql, argsDict):
        # 将查询结果由tuple转为list
        queryAnsList = []
        Cur = self.getOraCur()
        Cur.prepare(sql)
        queryAns = Cur.execute(None, argsDict)
        for ansItem in queryAns:
            queryAnsList.append(list(ansItem))
 
        self.closeOraCur(Cur)
        return queryAnsList
        
    def changeDbTable(self, sql, argsDict):
        conn=getOraConn()
        conn.prepare(sql)
        rown = conn.execute(None, argsDict) #executemany(None, argsDicts)
        conn.commit()
        return rown
