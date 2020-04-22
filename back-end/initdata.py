#cmd-python
import sqlite3
conn = sqlite3.connect('db.sqlite3')
cur = conn.cursor()
cur.execute("insert into hisx_Users(username,password,isSuper,status) values('admin','e10adc3949ba59abbe56e057f20f883e',True,True)")
cur.execute("insert into hisx_Groups(name,create_time) values('管理员','2020-04-22')")
cur.execute("select * from hisx_Users")
results = cur.fetchall()
for row in results:
    print (row)
conn.commit()
cur.close()
conn.close()
