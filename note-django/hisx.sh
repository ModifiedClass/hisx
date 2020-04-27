#！/bin/bash
/usr/local/python3/bin/uwsgi --ini /var/www/exhis/exhis/uwsgi.ini
/usr/local/python3/bin/uwsgi --ini /var/www/hisx/hisx/uwsgi.ini
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
/usr/local/nginx/sbin/nginx -s reload

#1.首先用vi命令打开文件
#vi start.sh  Esc+i键,调出命令模式
#2.在vi命令模式中使用 :set ff 命令
#可以看到文件的格式为
#fileformat=dos
#3.修改文件format为unix
#使用vi/vim修改文件format
#:set fileformat=unix
#之后每次我们只需要运行./start.sh就可以运行我们的nginx+uwsgi项目

#1、因为在centos7中/etc/rc.d/rc.local的权限被降低了，所以需要赋予其可执行权
#chmod +x /etc/rc.d/rc.local
#2、赋予脚本可执行权限
#假设/usr/local/script/autostart.sh是你的脚本路径，给予执行权限
#chmod +x /usr/local/script/autostart.sh
#3、打开/etc/rc.d/rc.local文件，在末尾增加如下内容
#/usr/local/script/autostart.sh

#oracle开机启动
#Root用户下：  chmod +x /etc/rc.d/rc.local
#vi chmod +x /etc/rc.d/rc.local  添加如下：
#su oracle -lc " /data/oracle/product/11.2.0/db_1/bin/emctl start dbconsole"
#su oracle -lc " /data/oracle/product/11.2.0/db_1/bin/lsnrctl start"
#su oracle -lc " /data/oracle/product/11.2.0/db_1/bin/dbstart"
