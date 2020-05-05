#coding:utf-8
import datetime
import time

def get30Days():
    """
    获取最近一个月每天日期
    """
    begin_date = (datetime.datetime.now() - datetime.timedelta(days =30)).strftime("%Y-%m-%d")
    date_list = []
    begin_date = datetime.datetime.strptime(begin_date, "%Y-%m-%d")
    end_date = datetime.datetime.strptime(time.strftime('%Y-%m-%d',time.localtime(time.time())), "%Y-%m-%d")
    while begin_date <= end_date:
        date_str = begin_date.strftime("%Y-%m-%d")
        date_list.append(date_str)
        begin_date += datetime.timedelta(days=1)
    return date_list

def getnDays(begin_date,end_date):
    """
    获取指定范围内每天日期
    """
    date_list = []
    while begin_date <= end_date:
        date_str = begin_date.strftime("%Y-%m-%d")
        date_list.append(date_str)
        begin_date += datetime.timedelta(days=1)
    return date_list