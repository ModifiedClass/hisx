from django.urls import path
from account import views

urlpatterns = [
    #组
    path('group/',views.GroupView.as_view()),
    #部门
    path('department/',views.DepartmentView.as_view()),
    #用户管理
    path('user/',views.UserView.as_view()),
    #认证
    path('auth/',views.AuthView.as_view()),
]
