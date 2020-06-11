from django.urls import path
from bms import views

urlpatterns = [
    #图书
    path('books/',views.BooksView.as_view()),
    #类别
    path('bookcategory/',views.BookCategoryView.as_view()),
    #借阅
    path('borrowrecord/',views.BorrowRecordView.as_view()),
]
