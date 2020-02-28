from django.urls import path
from account import views

urlpatterns = [
    #登录注册
    path('login/',views.login,name='login'),
    path('logout/',views.logout,name='logout'),
    #部门管理
    path('department/list',views.spadepartment_get,name='spadepartment_get'),
    #组管理
    path('group/list',views.spagroup_get,name='spagroup_get'),
    #用户管理
    path('user/$',views.userview.as_view()),
    #认证
    path('auth/$',views.AuthView.as_view()),
]
