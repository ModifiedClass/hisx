from django.db import models

# Create your models here.
class Group(models.Model):
    id=models.AutoField(primary_key=True)
    name = models.CharField(max_length=50,unique=True)
    create_time=models.DateTimeField(auto_now_add=True)    #创建时间
    isDelete = models.BooleanField(default=False)         #逻辑删除
    remark=models.TextField(blank=True,null=True)
    menu=models.models.TextField
    operation=models.models.TextField

    class Meta:
        db_table="hisx_Groups"
        verbose_name='用户组'
        verbose_name_plural='用户组'

    def __str__(self):
        return self.name

class Department(models.Model):
    class Meta:
        db_table="hisx_Department"
        verbose_name='部门'
        verbose_name_plural='部门'

    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=20,unique=True)
    code=models.CharField(max_length=20,blank=True,null=True)
    parent=models.ForeignKey('self',on_delete=models.CASCADE,blank=True,null=True)
    isDelete = models.BooleanField(default=False)
    create_time=models.DateTimeField(blank=True,null=True,auto_now_add=True)

    def __str__(self):
        return self.name

class User(models.Model):
    id=models.AutoField(primary_key=True)
    username=models.CharField(max_length=30)
    name=models.CharField(max_length=30,blank=True,null=True)
    password=models.CharField(max_length=50,blank=True,null=True)
    state=models.IntegerField(default=1)
    error=models.PositiveIntegerField(default=0)
    create_time=models.DateTimeField(blank=True,null=True,auto_now_add=True)
    isDelete = models.BooleanField(default=False)
    group=models.ManyToManyField(Group)
    department=models.ManyToManyField(Department)

    class Meta:
        db_table="hisx_User"
        verbose_name='用户'
        verbose_name_plural='用户'

    def __str__(self):
        return self.username
        
class UserToken(models.Model):
    user=models.OneToOneField(to=User)
    token=models.CharField(max_length=64)