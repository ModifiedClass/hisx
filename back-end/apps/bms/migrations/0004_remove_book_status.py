# Generated by Django 3.0.3 on 2020-06-14 14:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bms', '0003_auto_20200614_2202'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='status',
        ),
    ]
