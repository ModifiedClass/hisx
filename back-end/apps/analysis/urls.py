from django.urls import path
from analysis import views

urlpatterns = [
    #数据分析
    path('getmzks/',views.getmzks,name='getmzks'),
    path('getzyks/',views.getzyks,name='getzyks'),
    path('chart_processedrecord_day/',views.chart_processedrecord_day,name='chart_processedrecord_day'),
    path('chart_processedrecord/',views.chart_processedrecord,name='chart_processedrecord'),
    path('chart_device/',views.chart_device,name='chart_device'),
    path('chart_qyzlqk/',views.chart_qyzlqk,name='chart_qyzlqk'),
    path('chart_bmyszlqk/',views.chart_bmyszlqk,name='chart_bmyszlqk'),
    path('chart_qyzdqk/',views.chart_qyzdqk,name='chart_qyzdqk'),
    path('chart_bmyszdqk/',views.chart_bmyszdqk,name='chart_bmyszdqk'),
    path('getzlhists/',views.getzlhists,name='getzlhists'),
    path('gettjxtts/',views.gettjxtts,name='gettjxtts'),
    path('gethislocktables/',views.gethislocktables,name='gethislocktables'),
    path('hisunlocktables/',views.hisunlocktables,name='hisunlocktables'),
    path('gettjxtlocktables/',views.gettjxtlocktables,name='gettjxtlocktables'),
    path('tjxtunlocktables/',views.tjxtunlocktables,name='tjxtunlocktables')
]
