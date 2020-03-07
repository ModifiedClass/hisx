from django.urls import path
from oapm import views

urlpatterns = [
    #时间轴
    path('timeline/',views.TimelineView.as_view()),
]
