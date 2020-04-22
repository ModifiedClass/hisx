from django.db import models

# Create your models here.
class Group(models.Model):
    _id=models.AutoField(primary_key=True)
    name = models.CharField(max_length=50,unique=True)
    create_time=models.DateTimeField(auto_now_add=True)    #创建时间
    menu=models.TextField(blank=True,null=True)
    operation=models.TextField(blank=True,null=True)

    class Meta:
        db_table="hisx_Groups"
        verbose_name='用户组'
        verbose_name_plural='用户组'

    def __str__(self):
        return self.name

class Department(models.Model):
    class Meta:
        db_table="hisx_Departments"
        verbose_name='部门'
        verbose_name_plural='部门'

    _id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=20,unique=True)
    code=models.CharField(max_length=20,blank=True,null=True)
    _parent=models.ForeignKey('self',on_delete=models.CASCADE,blank=True,null=True)
    status = models.BooleanField(default=True) #启用,停用
    create_time=models.DateTimeField(blank=True,null=True,auto_now_add=True)

    def __str__(self):
        return self.name

class User(models.Model):
    _id=models.AutoField(primary_key=True)
    username=models.CharField(max_length=30)
    name=models.CharField(max_length=30,blank=True,null=True)
    password=models.CharField(max_length=50,blank=True,null=True)
    status=models.BooleanField(default=True)
    create_time=models.DateTimeField(blank=True,null=True,auto_now_add=True)
    isSuper = models.BooleanField(default=False)#超级用户
    group=models.ManyToManyField(Group)
    department=models.ManyToManyField(Department)

    class Meta:
        db_table="hisx_Users"
        verbose_name='用户'
        verbose_name_plural='用户'

    def __str__(self):
        return self.username
        
class UserToken(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    token=models.CharField(max_length=64)
    create_time=models.DateTimeField(blank=True,null=True,auto_now_add=True)
    
    def __str__(self):
        return self.token