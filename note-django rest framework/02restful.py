#restful协议
#域名
api.arcanum.cn      #跨域
www.arcanum.cn/api/#不跨域

#版本
www.arcanum.cn/api/v1/

#面向资源
www.arcanum.cn/api/v1/名词

#过滤
www.arcanum.cn/api/v1/名词/?para1=para1&para2=para3

#状态码与code结合
ret={'status':0,'msg':'msg'}
return HttpResponse(json.dumps(ret),status=201)

#返回结果
GET /collection 返回资源对象列表 GET /user 
GET /collection/resource 返回单个资源对象 GET /user/1
POST /collection 返回新生成资源对象
POST /collection/resource 返回完整资源对象
PATCH /collection/resource 返回资源对象列表
DELETE /collection/resource 返回空文档

#Hypermedia API
{
    "link":{
        "rel":"http://www.arcanum.cn/api/v1/名词/id",
        "href":"",
        "title":"",
        "type":"",
    }
}