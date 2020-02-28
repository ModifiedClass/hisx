#django rest fromework解析器
#1请求头要求
Content-Type:application/x-www-form-urlencoded,
request.POST中才有值(去request.body中解析数据)

#2数据格式要求：
para1=value1&para2=value2

$.ajax({
    data:{para1:value1,para2,value2}
})
#内部转化para1=value1&para2=value2
$.ajax({
    data:JSON.stringfy({para1:value1,para2,value2})
})
#json.loads(request.body)

#rest_framework解析器，对请求体进行解析
from rest_framework.parsers import JSONParser,FormParser

class ExampleView(APIView):
    paraser_classes=[JSONParser,FormParser]
    '''
    JSONParser:只能解析Content-Type:application/json头
    FormParser:只能解析Content-Type:application/x-www-form-urlencoded头
    '''
    def post(self,request,*args,**kwargs):
        '''允许发json格式数据
        a.content-type:application/json
        b.{'para1':'value1','para2','value2'}
        '''
        '''
        1.获取用户请求
        2.获取用户请求体
        3.根据用户请求头和paraser_classes=[JSONParser,FormParser]中支持的请求头进行比较
        4.JSONParser对象去请求体
        5.request.data
        '''
        #解析后的结果
        request.data