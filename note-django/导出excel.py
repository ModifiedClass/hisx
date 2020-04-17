pip3 install xlwt

views.py
import xlwt
from io import BytesIO
# 导出excel数据
def export_ProcessedRecord_excel(request):
    import xlwt
    from io import BytesIO
    import re
    searchdict={}
    if request.GET.get("startdate"):#__range=(startdate, enddate)
        searchdict['create_time__gte']=request.GET.get("startdate")
    if request.GET.get("enddate"):
        searchdict['create_time__lte']=request.GET.get("enddate")
    # 设置HTTPResponse的类型
    response = HttpResponse(content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment;filename=ProcessedRecord.xls'
    # 创建一个文件对象
    wb = xlwt.Workbook(encoding='utf8')
    # 创建一个sheet对象
    sheet = wb.add_sheet('ProcessedRecord-sheet')

    # 写入文件标题
    sheet.write(0,0,'记录时间')
    sheet.write(0,1,'问题情况')
    sheet.write(0,2,'解决办法')
    sheet.write(0,3,'处理方式')
    sheet.write(0,4,'问题状态')
    sheet.write(0,5,'发生部门')
    sheet.write(0,6,'发现人')
    sheet.write(0,7,'问题类别')
    sheet.write(0,8,'处理人')

    # 写入数据
    data_row = 1
    obj=ProcessedRecord.objects.filter(**searchdict).values('create_time','situation','solution','processing_mode','problem_state','department__name','discoverer__name','problem_category__name','handler__name').order_by('-create_time')
    pre = re.compile('>(.*?)<')
    for i in obj:
        # 格式化datetime
        pri_time = i['create_time'].strftime('%Y-%m-%d')
        solution = ''.join(pre.findall(i['solution']))
        processing_mode=''
        if i['processing_mode']==1:
            processing_mode='远程处理'
        elif i['processing_mode']==2:
            processing_mode='现场处理'
        elif i['processing_mode']==3:
            processing_mode='内部处理'
        else:
            processing_mode='第三方处理'
        problem_state=''
        if i['problem_state']==1:
            problem_state='待处理'
        elif i['problem_state']==2:
            problem_state='已处理'
        else:
            problem_state='需跟进'
        sheet.write(data_row,0,pri_time)
        sheet.write(data_row,1,i['situation'])
        sheet.write(data_row,2,solution)
        sheet.write(data_row,3,processing_mode)
        sheet.write(data_row,4,problem_state)
        sheet.write(data_row,5,i['department__name'])
        sheet.write(data_row,6,i['discoverer__name'])
        sheet.write(data_row,7,i['problem_category__name'])
        sheet.write(data_row,8,i['handler__name'])
        data_row = data_row + 1

    # 写出到IO
    output = BytesIO()
    wb.save(output)
    # 重新定位到开始
    output.seek(0)
    response.write(output.getvalue())
    return response