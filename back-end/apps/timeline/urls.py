from django.urls import path
from timeline import views

urlpatterns = [
    #时间轴
    path('timeline/',views.TimelineView.as_view()),
]
