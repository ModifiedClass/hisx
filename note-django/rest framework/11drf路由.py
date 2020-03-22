#django rest fromework路由
#基本路由
urlpatterns = [
    path('(?p<version>[v1|v2]+)/example/$',views.ExampleView.as_View),
]

urlpatterns = [
    path('(?p<version>[v1|v2]+)/$',views.ExampleView.as_View({'get':'list','post':'create'})),
]