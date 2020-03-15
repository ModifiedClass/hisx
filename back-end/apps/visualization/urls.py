from django.urls import path
from visualization import views

urlpatterns = [
    path('getpatdis/', views.getpatdis,name='getpatdis'),
    path('getinhosnum/', views.getinhosnum,name='getinhosnum'),
    path('getincomebythisday/', views.getincomebythisday,name='getincomebythisday'),
    path('getincomebythismon/', views.getincomebythismon,name='getincomebythismon'),
    path('getdisease/', views.getdisease,name='getdisease'),
    path('getnumbyday/', views.getnumbyday,name='getnumbyday'),
    path('getmedinsu/', views.getmedinsu,name='getmedinsu'),
    path('getnochecknum/', views.getnochecknum,name='getnochecknum'),
    path('getdoctoratv/', views.getdoctoratv,name='getdoctoratv'),
    path('getdoctorload/', views.getdoctorload,name='getdoctorload'),
    path('getavgwaitingtime/', views.getavgwaitingtime,name='getavgwaitingtime'),
]
