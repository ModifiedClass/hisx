from django.db import models

# Create your models here.

#时间线        
class Timeline(models.Model):
    _id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=200)
    create_time=models.DateTimeField(auto_now_add=True)
    details=models.TextField(blank=True,null=True,max_length=500)

    class Meta:
        db_table="hisx_Timeline"
        verbose_name='时间线'
        verbose_name_plural='时间线'

    def __str__(self):
        return self.name

