from django.db import models
from account.models import Department,User
from informationdevice import DeviceInfo
# Create your models here.

class ProblemCategory(models.Model):
    class Meta:
        db_table="hisx_ProblemCategorys"
        verbose_name='问题类别'
        verbose_name_plural='问题类别'
    _id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=20)
    create_time=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
        
class ProcessedRecord(models.Model):
    class Meta:
        db_table="hisx_ProcessedRecords"
        verbose_name='处理记录'
        verbose_name_plural='处理记录'
    _id=models.AutoField(primary_key=True)
    create_time=models.DateTimeField(auto_now_add=True)
    situation=models.TextField()
    solution=models.TextField()
    department=models.ForeignKey(Department,on_delete=models.CASCADE)
    processing_mode=models.IntegerField(default=1)
    problem_state=models.IntegerField(default=1)
    discoverer=models.ForeignKey(User,on_delete=models.CASCADE)
    problem_category=models.ForeignKey(ProblemCategory,on_delete=models.CASCADE)
    handler=models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return self.situation

class Printerrepair(models.Model):
    class Meta:
        db_table="hisx_Printerrepairs"
        verbose_name='打印机维修'
        verbose_name_plural='打印机维修'
    _id=models.AutoField(primary_key=True)    
    printer=models.ForeignKey(DeviceInfo,on_delete=models.CASCADE,verbose_name='打印机型号')
    create_time=models.DateField(verbose_name='处理日期') 
    handler=models.ForeignKey(User,on_delete=models.CASCADE,verbose_name='处理人员')
    status=models.BooleanField(default=False)  #False未审核 True已审核

    def __str__(self):
        return str(self.fdate)


class Cartriday(models.Model):
    class Meta:
        db_table="hisx_Cartridays"
        verbose_name='硒鼓加粉'
        verbose_name_plural='硒鼓加粉'
        
    _id=models.AutoField(primary_key=True)
    create_time=models.DateField(verbose_name='加粉日期')
    status=models.BooleanField(default=False)  #False未审核 True已审核
    handler=models.ForeignKey(User,on_delete=models.CASCADE,verbose_name='处理人员')
    nums=models.IntegerField(verbose_name='数量')
    def __str__(self):
        return str(self.nums)


class ApplicationSoftWare(models.Model):
    _id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=50)
    framework=models.IntegerField(default=1)
    database=models.IntegerField(default=1)
    device=models.ForeignKey(DeviceInfo,on_delete=models.CASCADE,verbose_name='安装设备')
    deployment=models.TextField(blank=True,null=True)#部署
    create_time=models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table="hisx_ApplicationSoftWare"
        verbose_name='应用软件'
        verbose_name_plural='应用软件'

    def __str__(self):
        return self.name        
