
$(function () {
	initinhosnum();//初始化当前在院病人数
	initconsultationnum();//初始化当日就诊人次
	initpreparatorynum();//初始化预出院人数
	initnochecknum();//初始化出院未结账人数
    initincomebythisday();//日结账统计
	initincomebythismon();//月结账统计
    initnumbyday();//当月每天门诊入出院人次
	initdoctorload();//门诊医生负荷
	initdoctoratv()//门诊医生待诊
	initavgwaitingtime()//就诊病人平均等待时间
    initdisease();//月疾病人次top10
    initmedinsu();//初始化医保类别费用比例
})
//初始化当前在院病人数
function initinhosnum(){
	setTimeout(initinhosnum, 1000 * 60 * 5);
	$.ajax({
        type: 'GET',
        url: '/getinhosnum/',
        dataType: 'json',
        success: function(res){
			$('#inhosnum').html(res.num);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    });
}
//初始化当日就诊人次
function initconsultationnum(){
	setTimeout(initconsultationnum, 1000 * 60 * 5);
	$.ajax({
        type: 'GET',
        url: '/getconsultationnum/',
        dataType: 'json',
        success: function(res){
			$('#consultationnum').html(res.num);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    });
}
//初始化预出院人数
function initpreparatorynum(){
	setTimeout(initpreparatorynum, 1000 * 60 * 5);
	$.ajax({
        type: 'GET',
        url: '/getpreparatorynum/',
        dataType: 'json',
        success: function(res){
			$('#preparatorynum').html(res.num);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    });
}
//初始化出院未结账人数
function initnochecknum(){
	setTimeout(initnochecknum, 1000 * 60 * 5);
	$.ajax({
        type: 'GET',
        url: '/getnochecknum/',
        dataType: 'json',
        success: function(res){
			$('#nochecknum').html(res.num);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    });
}
//日结账统计
function initincomebythisday(){
	$.ajax({
        type: 'GET',
        url: '/getincomebythisday/',
        dataType: 'json',
        success: function(res){
			var echart1data1=[];
			var echart1data2=[];
			var sum=0;
			for(var i=0;i<res.length;i++){
				echart1data1.push(res[i][1])
				echart1data2.push(res[i][0])
				sum+=parseFloat(res[i][0]);
			}
			$('#incomebythisdaysum').html("合计:"+sum.toFixed(2));
			var echart1 = echarts.init(document.getElementById('echart1'));
            /*var echart1data1=['药品费', '化验费', '检查费', '治疗费', '手术费', '护理费', '床位费'];
            var echart1data2=[200, 300, 300, 900, 1500, 1200, 600];*/
            echarts_1(echart1,echart1data1,echart1data2,'#2f89cf');
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    });
    
}
//月结账统计
function initincomebythismon(){
	$.ajax({
        type: 'GET',
        url: '/getincomebythismon/',
        dataType: 'json',
        success: function(res){
			var echart1data1=[];
			var echart1data2=[];
			var sum=0;
			for(var i=0;i<res.length;i++){
				echart1data1.push(res[i][1])
				echart1data2.push(res[i][0])
				sum+=parseFloat(res[i][0]);
			}
			$('#incomebythismonsum').html("合计:"+sum.toFixed(2));
			var echart1 = echarts.init(document.getElementById('echart2'));
            echarts_1(echart1,echart1data1,echart1data2,'#27d08a');
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    });
    
}
//月疾病人次top10
function initdisease(){
	$.ajax({
        type: 'GET',
        url: '/getdisease/',
        dataType: 'json',
        success: function(res){
			var echart1data1=[];
			var echart1data2=[];
			for(var i=0;i<res.length;i++){
				echart1data1.push(res[i][1])
				echart1data2.push(res[i][0])
			}
			var echart1 = echarts.init(document.getElementById('echart5'));
            echarts_1(echart1,echart1data1,echart1data2,'#2f89cf');
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    });
    
}
//当月每天门诊入出院人次
function initnumbyday(){
	setTimeout(initnumbyday, 1000 * 60 * 5);
	$.ajax({
        type: 'GET',
        url: '/getnumbyday/',
        dataType: 'json',
        success: function(res){
			var days=mGetDate();
			var mons=[];
			var consultation=[];
			var emergency=[];
			var inhos=[];
			var outhos=[];
			for(var i=0;i<days;i++){
				mons.push(i+1);
				if(res.m[i]){
				    consultation.push(res.m[i][0]);
				}else{
					consultation.push(0);
				}
				if(res.e[i]){
				    emergency.push(res.e[i][0]);
				}else{
					emergency.push(0);
				}
				if(res.i[i]){
				    inhos.push(res.i[i][0]);
				}else{
				    inhos.push(0);
				}
				if(res.o[i]){
				    outhos.push(res.o[i][0]);
				}else{
				    outhos.push(0);
				}
			}
			var echart1 = echarts.init(document.getElementById('echart4'));
            echarts_4(echart1,mons,consultation,emergency,inhos,outhos);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    });
    
}
//初始化医保类别费用比例
function initmedinsu(){
	$.ajax({
        type: 'GET',
        url: '/getmedinsu/',
        dataType: 'json',
        success: function(res){
			var miamount=[];
			var sum=0;
			for(var i=0;i<res.length;i++){
				var str={'value':res[i][0],'name':res[i][1]};
				miamount.push(str);
				sum+=Number(res[i][0]);
			}
			$('#medinsusum').html("合计:"+sum.toFixed(2));
			var echart1 = echarts.init(document.getElementById('echart6'));
            echarts_6(echart1,miamount);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    });
}
//门诊医生负荷
function initdoctorload(){
	setTimeout(initdoctorload, 1000 * 60 * 5);
	$.ajax({
        type: 'GET',
        url: '/getdoctorload/',
        dataType: 'json',
        success: function(res){
			var data1=['诊室数','已接诊'];
			var data2=[
                {value:res.d, name:'诊室数'},
                {value:res.c, name:'已接诊'}
            ];
            var myChart = echarts.init(document.getElementById('fb1')); 
			var avg=res.c/res.d;
	        echarts_31(myChart,data1,data2,'诊室负荷','平均每诊室接诊'+avg.toFixed(0)+'个患者');	
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    });	
}
//门诊医生待诊
function initdoctoratv(){
	setTimeout(initdoctoratv, 1000 * 60 * 5);
	$.ajax({
        type: 'GET',
        url: '/getdoctoratv/',
        dataType: 'json',
        success: function(res){
			var data1=['诊室数','待诊数'];
			var data2=[
                {value:res.d, name:'诊室数'},
                {value:res.w, name:'待诊数'}
            ];
            var myChart = echarts.init(document.getElementById('fb2')); 
			if(res.w>res.d){
			    var avg=res.w/res.d;
	            echarts_31(myChart,data1,data2,'平均待诊数','平均每诊室待诊'+avg.toFixed(0)+'个患者');
			}else{
				var avg=res.d/res.w;
	            echarts_31(myChart,data1,data2,'平均待诊数','平均每'+avg.toFixed(0)+'诊室待诊1个患者');
			}
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    });
}
//就诊病人平均等待时间
function initavgwaitingtime(){
	setTimeout(initavgwaitingtime, 1000 * 60 * 5);
	$.ajax({
        type: 'GET',
        url: '/getavgwaitingtime/',
        dataType: 'json',
        success: function(res){
			var data1=['1','2'];
			var data2=[
                {value:1, name:'1'},
                {value:1, name:'2'}
            ];
            var myChart = echarts.init(document.getElementById('fb3')); 
	        echarts_31(myChart,data1,data2,'平均等待:'+res+'分钟','平均等待:'+res+'分钟');
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    });	
}
//柱状图
function echarts_1(myChart,data1,data2,color) {
    option = {

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '0%',
		top:'10px',
        right: '0%',
        bottom: '4%',
       containLabel: true
    },
    xAxis: [{
        type: 'category',
      		data: data1,
        axisLine: {
            show: true,
         lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
		
        axisTick: {
            show: false,
        },
		axisLabel:  {
                interval: 0,
               // rotate:50,
                show: true,
                splitNumber: 15,
                textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
            },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
           //formatter: '{value} %'
			show:true,
			 textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
               color: "rgba(255,255,255,.1)",
            }
        }
    }],
    series: [
		{
        type: 'bar',
        data: data2,
        barWidth:'35%', //柱子宽度
       // barGap: 1, //柱子之间间距
        itemStyle: {
            normal: {
                color:color,
                opacity: 1,
				barBorderRadius: 5,
            }
        }
    }
		
	]
};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

//波形图	mon：当月号数 consultation 就诊 
function echarts_4(myChart,mons,consultation,emergency,inhos,outhos) {
    option = {
	    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#dddc6b'
            }
        }
    },
		    legend: {
    top:'0%',
        data:['门诊','急诊','入院','出院'],
                textStyle: {
           color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        }
    },
    grid: {
        left: '10',
		top: '30',
        right: '10',
        bottom: '10',
        containLabel: true
    },

    xAxis: [{
        type: 'category',
        boundaryGap: false,
axisLabel:  {
                textStyle: {
 					color: "rgba(255,255,255,.6)",
					fontSize:12,
                },
            },
        axisLine: {
			lineStyle: { 
				color: 'rgba(255,255,255,.2)'
			}

        },

   data: mons

    }, {

        axisPointer: {show: false},
        axisLine: {  show: false},
        position: 'bottom',
        offset: 20,

       

    }],

    yAxis: [{
        type: 'value',
        axisTick: {show: false},
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.1)'
            }
        },
       axisLabel:  {
                textStyle: {
 					color: "rgba(255,255,255,.6)",
					fontSize:12,
                },
            },

        splitLine: {
            lineStyle: {
                 color: 'rgba(255,255,255,.1)'
            }
        }
    }],
    series: [
		{
        name: '门诊',
        type: 'line',
         smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
			
            normal: {
				color: '#0184d5',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(1, 132, 213, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(1, 132, 213, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#0184d5',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
        data: consultation

    },
	{
        name: '急诊',
        type: 'line',
         smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
			
            normal: {
				color: '#DC143C',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(1, 132, 213, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(1, 132, 213, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#DC143C',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
        data: emergency

    },
{
        name: '入院',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
			
            normal: {
				color: '#00d887',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 216, 135, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 216, 135, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#00d887',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
        data: inhos

    }, 
	{
        name: '出院',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
			
            normal: {
				color: '#EEB422',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 216, 135, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 216, 135, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#EEB422',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
        data: outhos

    }, 
		 ]

};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
//	miamount医保金额
function echarts_6(myChart,miamount) {
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ['#CD5C5C', '#00CED1', '#9ACD32', '#FFC0CB','#FFD700','#00BFFF','#EE82EE','#DC143C'],
        stillShowZeroSum: false,
        series: [
            {
                name: '',
                type: 'pie',
                radius: '80%',
                center: ['50%', '50%'],
                data: miamount,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            }
        ]
    };
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
//当前医生平均负荷
function echarts_31(myChart,data1,data2,title,subtitle) {
    option = {
	    title: [{
            text: title,
            left: 'center',
            textStyle: {
                color: '#fff',
			    fontSize:'16'
            }
            }],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            position:function(p){   //其中p为当前鼠标的位置
                return [p[0] + 10, p[1] - 10];
            }
        },
        legend: {        
            top:'70%',
            itemWidth: 10,
            itemHeight: 10,
		    data:data1,
            textStyle: {
                color: 'rgba(255,255,255,.5)',
			    fontSize:'12',
            }
        },
        series: [{
        	name:subtitle,
            type:'pie',
			center: ['50%', '42%'],
            radius: ['40%', '60%'],
            color: ['#065aab','#06f0ab'],	
            label: {show:false},
			labelLine: {show:false},
			data:data2
        }]
    };
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

function mGetDate(){
     var date = new Date();
     var year = date.getFullYear();
     var month = date.getMonth()+1;
     var d = new Date(year, month, 0);
     return d.getDate();
}				
	




		
		
		


		









