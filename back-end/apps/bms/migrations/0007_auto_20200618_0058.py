# Generated by Django 3.0.3 on 2020-06-17 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bms', '0006_auto_20200618_0008'),
    ]

    operations = [
        migrations.AlterField(
            model_name='borrowrecord',
            name='return_time',
            field=models.DateTimeField(blank=True, null=True, verbose_name='归还日期'),
        ),
    ]
