# Generated by Django 3.0.3 on 2020-04-05 02:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Timeline',
            fields=[
                ('_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('create_time', models.DateTimeField(auto_now_add=True)),
                ('details', models.TextField(blank=True, max_length=500, null=True)),
            ],
            options={
                'verbose_name': '时间轴',
                'verbose_name_plural': '时间轴',
                'db_table': 'hisx_Timeline',
            },
        ),
    ]
