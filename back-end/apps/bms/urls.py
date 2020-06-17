from django.urls import path
from bms import views

urlpatterns = [
    #图书
    path('book/',views.BooksView.as_view()),
    #类别
    path('bookcategory/',views.BookCategoryView.as_view()),
    #库存
    path('bookstock/',views.BookStockView.as_view()),
    #借阅
    path('borrowrecord/',views.BorrowRecordView.as_view()),
]
