"""hbe URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,re_path,include
from django.conf.urls.static import static
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    path('api/account/', include('account.urls')),
    path('api/informationdevice/', include('informationdevice.urls')),
    path('api/oapm/', include('oapm.urls')),
    path('api/timeline/', include('timeline.urls')),
    path('api/analysis/', include('analysis.urls')),
    path('api/systemsetting/', include('systemsetting.urls')),
    re_path(r'^media/(?P<path>.*)',serve, {"document_root":settings.MEDIA_ROOT}),
]#+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)