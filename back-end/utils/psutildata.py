#!/usr/bin/python
#coding=utf-8
import datetime
import psutil

#https://blog.csdn.net/lsw_dabaojian/article/details/89576943
# 1.cpu
# 逻辑cpu/物理cpu
logical_cpu_amount = psutil.cpu_count()
physical_cpu_amount = psutil.cpu_count(logical=False)

# cpu利用率
# 默认整体cpu利用率
cpu_percent = psutil.cpu_percent()
# percpu参数指明每一个cpu
cpu_percent_each = psutil.cpu_percent(percpu=True)
# 阻塞获取cpu利用率
#cpu_percent_block = psutil.cpu_percent(percpu=True, interval=2)

# cpu时间花费
cpu_time_cost = psutil.cpu_times()
cpu_user = cpu_time_cost.user

# cpu耗时比
cpu_cost_percent = psutil.cpu_times_percent()

# cpu统计信息
#     上下文切换，中断，软中断，系统调用次数
stats = psutil.cpu_stats()

# 2.内存
virtual_memory = psutil.virtual_memory()
# 总内存，可用内存，内存利用率，buffer，cached等
print(virtual_memory)
# svmem(total=1019797504, available=615784448, percent=39.6, used=229548032, free=159846400, active=334213120, inactive=300457984, buffers=4272128, cached=626130944, shared=7860224, slab=131346432)

swap_memory = psutil.swap_memory()

# 3.磁盘
disk_partitions = psutil.disk_partitions()
# 磁盘名称、挂载点、文件系统类型等
print(disk_partitions)

# [sdiskpart(device='/dev/mapper/centos-root', mountpoint='/', fstype='xfs', opts='rw,seclabel,relatime,attr2,inode64,noquota'), sdiskpart(device='/dev/sda1', mountpoint='/boot', fstype='xfs', opts='rw,seclabel,relatime,attr2,inode64,noquota')]

# 磁盘使用情况
disk_usage = psutil.disk_usage("/")
# 磁盘容量，已使用磁盘容量，可用磁盘空间容量，磁盘空间利用率等
print(disk_usage)
# sdiskusage(total=18238930944, used=1506193408, free=16732737536, percent=8.3)

# 磁盘io
all_disk_io_counters = psutil.disk_io_counters()
# 读次数，写次数，读字节数，写字节数等等
print(all_disk_io_counters)
# sdiskio(read_count=30818, write_count=76996, read_bytes=949449216, write_bytes=3292064256, read_time=20242, write_time=26778, read_merged_count=29, write_merged_count=2238, busy_time=26438)

each_disk_io_counters = psutil.disk_io_counters(perdisk=True)
print(each_disk_io_counters)

# 4.网络
# 网络io统计信息：
net_io_counters = psutil.net_io_counters()
# 收发字节数、收发包的数量、出错情况、删包情况
print(net_io_counters)
# snetio(bytes_sent=2689536, bytes_recv=242624274, packets_sent=25548, packets_recv=175105, errin=0, errout=0, dropin=0, dropout=0)
each_net_io_counters = psutil.net_io_counters(pernic=True)
print(each_net_io_counters)

# 网络连接详细信息
net_connections = psutil.net_connections()
# 网络连接状态，统计连接个数以及处于特定状态的网络连接个数
print(net_connections)
# [sconn(fd=6, family=2, type=2, laddr=addr(ip='0.0.0.0', port=68), raddr=(), status='NONE', pid=8518)...]

# 网卡配置信息
net_if_addrs = psutil.net_if_addrs()
# ip地址，mac地址，子网掩码，广播地址
print(net_if_addrs)
# {'lo': [snicaddr(family=2, address='127.0.0.1', netmask='255.0.0.0', broadcast=None, ptp=None), snicaddr(family=10, address='::1', netmask='ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', broadcast=None, ptp=None), snicaddr(family=17, address='00:00:00:00:00:00', netmask=None, broadcast=None, ptp=None)],...}

# 网卡详细信息
net_if_stats = psutil.net_if_stats()
# 是否启动，通信类型，传输速度，mtu
print(net_if_stats)
# {'lo': snicstats(isup=True, duplex=0, speed=0, mtu=65536), 'ens33': snicstats(isup=True, duplex=2, speed=1000, mtu=1500)}

# 5.其他
# 用户
users = psutil.users()
print(users)

# 系统启动时间
boot_time = psutil.boot_time()
print(boot_time)

strf_boot_time = datetime.datetime.fromtimestamp(boot_time).strftime('%Y-%m-%d %H:%M:%S')
print(strf_boot_time)