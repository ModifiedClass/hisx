from django.db import models

# Create your models here.
class DeviceCategory(models.Model):
    _id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=50)
    create_time=models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table="hisx_DeviceCategorys"
        verbose_name='设备类别'
        verbose_name_plural='设备类别'

    def __str__(self):
        return self.name
        
class DeviceModel(models.Model): 
    _id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=50)
    devicectegory=models.ForeignKey(DeviceCategory,on_delete=models.CASCADE,verbose_name='类别')
    create_time=models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table="hisx_DeviceModels"
        verbose_name='设备型号'
        verbose_name_plural='设备型号'

    def __str__(self):
        return self.name

class InstallLocation(models.Model):
    _id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=50)
    create_time=models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table="hisx_InstallLocations"
        verbose_name='安装位置'
        verbose_name_plural='安装位置'

    def __str__(self):
        return self.name

        
class DeviceInfo(models.Model):
    _id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=50)
    sn=models.CharField(blank=True,null=True,max_length=50)  #序列号
    status=models.IntegerField(default= 1)                 #状态，1正常，0维修，-1停用
    devicemodel=models.ForeignKey(DeviceModel,on_delete=models.CASCADE,blank=True,null=True)  #型号
    ip=models.CharField(blank=True,null=True,max_length=100)
    mac=models.CharField(blank=True,null=True,max_length=100)
    installdate=models.DateField(auto_now_add=True)  #安装时间
    parent=models.ForeignKey('self',on_delete=models.CASCADE,blank=True,null=True) #连接设备
    runos=models.IntegerField(default= 1) #运行系统
    installlocation=models.ForeignKey(Installlocation,on_delete=models.CASCADE,blank=True,null=True)
    create_time=models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table="hisx_DeviceInfos"
        verbose_name='设备信息'
        verbose_name_plural='设备信息'

    def __str__(self):
        return self.name


class devicetopo(models.Model):
    _id=models.AutoField(primary_key=True)
    icon=models.CharField(max_length=50)
    x=models.IntegerField(default= 1)
    y=models.IntegerField(default= 1)
    device=models.OneToOneField(DeviceInfo,on_delete=models.CASCADE,blank=True,null=True)

    class Meta:
        db_table="hisx_Equtopo"
        verbose_name='设备拓扑'
        verbose_name_plural='设备拓扑'

    def __str__(self):
        return self.name