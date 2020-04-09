from django.urls import path,re_path
from oapm import views

urlpatterns = [
    #问题类别
    path('problemcategory/',views.ProblemCategoryView.as_view()),
    #处理记录
    path('processedrecord/',views.ProcessedRecordView.as_view()),
    #打印机维修
    path('printerrepair/',views.PrinterRepairView.as_view()),
    #硒鼓加粉
    path('cartriday/',views.CartridayView.as_view()),
    #应用软件
    path('applicationsoftware/',views.ApplicationSoftWareView.as_view()),
    #图片
    #上传
    path('img/',views.ImgView.as_view()),
]
