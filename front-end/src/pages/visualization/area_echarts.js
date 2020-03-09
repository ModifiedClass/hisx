var lpsgeoCoordMap = {
    '钟山区': [104.850143,26.580516],
    '六枝特区': [105.484326,26.220432],
    '盘县': [104.478137,25.715625],
    '水城县': [104.964352,26.553344]
};
var convertData = function (lpsdata) {
    var res = [];
    for (var i = 0; i < lpsdata.length; i++) {
        var geoCoord = lpsgeoCoordMap[lpsdata[i].name];
        if (geoCoord) {
            res.push({
                name: lpsdata[i].name,
                value: geoCoord.concat(lpsdata[i].value)
            });
        }
    }
    return res;
    console.log(res);
};
$(function () {
    $.ajax({
        type: 'GET',
        url: '/getpatdis/',
        dataType: 'json',
        success: function(res){
			var data=[];
			for(var i=0;i<res.length;i++){
				var str={'name':res[i][1],'value':res[i][0]};
				data.push(str);
			}
			var chart = echarts.init(document.getElementById('map_1'));
			map(chart,data);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    });    
})
function map(myChart,lpsdata) {
    option = {
        title: {
            text: '当月出院病人区域分布',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip : {
            trigger: 'item',
		    formatter: function (params) {
                if(typeof(params.value)[2] == "undefined"){
              	    return params.name + ' : ' + params.value;
                }else{
              	    return params.name + ' : ' + params.value[2];
                }
            }
        },
  
        geo: {
            show:true,
            map: 'liupanshui',
            label: {
                emphasis: {
                    show:true,  //是否显示文本
                    color:'#CCC',  //文本颜色
                }
            },
            roam: true,//放大缩小
            itemStyle: {
                normal: {
                    areaColor: '#4c60ff',
                    borderColor: '#002097'
                },
                emphasis: {
                    areaColor: '#293fff'
                }
            },
        },
        series : [{
            name: '病人数',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data:convertData(lpsdata),
            symbolSize: function (val) {
                return val[2] / 15;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#ffeb7b'
                }
            },
            rippleEffect: { //涟漪特效相关配置。
                brushType: 'stroke' //波纹的绘制方式
            },
            hoverAnimation: true, //鼠标移入放大圆
        }]
    };
		
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}



