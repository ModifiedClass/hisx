from django.urls import path
from analysis import views

urlpatterns = [
    #组
    path('chart_processedrecord_day/',views.chart_processedrecord_day,name='chart_processedrecord_day'),
    path('chart_processedrecord/',views.chart_processedrecord,name='chart_processedrecord'),
    path('chart_device/',views.chart_device,name='chart_device'),
]
