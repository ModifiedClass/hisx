from django.urls import path
from informationdevice import views

urlpatterns = [
    #设备类别
    path('devicecategory/',views.DeviceCategoryView.as_view()),
    #设备型号
    path('devicemodel/',views.DeviceModelView.as_view()),
    #安装地点
    path('installlocation/',views.InstallLocationView.as_view()),
    #设备信息
    path('deviceinfo/',views.DeviceInfoView.as_view()),
    #设备拓扑
    path('devicetopo/',views.DeviceTopoView.as_view()),
]
