from django.db import models
from account.models import User

# Create your models here.
class BookCategory(models.Model):
    class Meta:
        db_table="hisx_BookCategorys"
        verbose_name='图书类别'
        verbose_name_plural='图书类别'
    _id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=20)
    create_time=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    class Meta:
        db_table="hisx_Books"
        verbose_name='图书'
        verbose_name_plural='图书'
        
    _id=models.AutoField(primary_key=True)
    create_time=models.DateTimeField(verbose_name='创建日期')
    bookcategory=models.ForeignKey(BookCategory,on_delete=models.CASCADE)
    name=models.CharField(max_length=50)
    isbn=models.TextField(blank=True,null=True)
    cover=models.TextField(blank=True,null=True)#封面
    profile=models.TextField(blank=True,null=True)#简介
    publisher=models.CharField(max_length=50,blank=True,null=True)#出版社
    publisheryear=models.CharField(max_length=4,blank=True,null=True)#出版年份
    author=models.CharField(max_length=50,blank=True,null=True)#作者
    price=models.DecimalField(max_digits=5, decimal_places=2,blank=True,null=True)#价格
    def __str__(self):
        return str(self.name)


class BookStock(models.Model):
    class Meta:
        db_table="hisx_BookStocks"
        verbose_name='图书库存'
        verbose_name_plural='图书库存'
        
    _id=models.AutoField(primary_key=True)
    create_time=models.DateTimeField(verbose_name='入库日期')
    book=models.ForeignKey(Book,on_delete=models.CASCADE)
    nums=models.IntegerField(blank=True,null=True)  #入库数量
    def __str__(self):
        return str(self.nums)


class BorrowRecord(models.Model):
    class Meta:
        db_table="hisx_BorrowRecords"
        verbose_name='借阅记录'
        verbose_name_plural='借阅记录'
    _id=models.AutoField(primary_key=True)
    create_time=models.DateTimeField(verbose_name='借出日期')
    return_time=models.DateTimeField(verbose_name='归还日期')
    reader=models.ForeignKey(User,on_delete=models.CASCADE,related_name='reader')
    book=models.ForeignKey(Book,on_delete=models.CASCADE,related_name='book')

    def __str__(self):
        return self.book.name