#django rest fromework渲染器
from rest_framework.renderers import JSONRenderer,BrowsableAPIRenderer
class ExampleView(APIView):
    renderer_classes[JSONRenderer,BrowsableAPIRenderer]#展示数据限制
    def get():
