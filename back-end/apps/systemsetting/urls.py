from django.urls import path
from systemsetting import views

urlpatterns = [
    path('delovertimesession/',views.delovertimesession,name='delovertimesession'),
    path('database_backup/',views.database_backup,name='database_backup'),
    path('clear_nginxlog/',views.clear_nginxlog,name='clear_nginxlog'),
]
