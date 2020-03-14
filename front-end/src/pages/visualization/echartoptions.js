    //echartoption
    //柱状图
export const echartHistogram=(cname,cvalue,color)=>{
        return {
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
      		    data: cname,
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
			        show:true,
			        extStyle: {
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
            series: [{
                type: 'bar',
                data: cvalue,
                barWidth:'35%', //柱子宽度
                itemStyle: {
                    normal: {
                        color:color,
                        opacity: 1,
				        barBorderRadius: 5,
                    }
                }
            }]
        };
    }

    //波形图	mon：当月号数 consultation 就诊 
export const echartWaveform=(mons,consultation,emergency,inhos,outhos)=>{
        return{
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
            series: [{
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
                        /*color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(1, 132, 213, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(1, 132, 213, 0.1)'
                        }], false),*/
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
                        /*color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(1, 132, 213, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(1, 132, 213, 0.1)'
                        }], false),*/
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
                        /*color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 216, 135, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 216, 135, 0.1)'
                        }], false),*/
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
                        /*color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 216, 135, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 216, 135, 0.1)'
                        }], false),*/
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
            },]
        };
    }
    //	miamount医保金额
export const echartPie=(miamount)=>{
        return{
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: ['#CD5C5C', '#00CED1', '#9ACD32', '#FFC0CB','#FFD700','#00BFFF','#EE82EE','#DC143C'],
            stillShowZeroSum: false,
            series: [{
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
            }]
        };
    }
    //当前医生平均负荷
export const echartCircle=(data1,data2,title,subtitle)=>{
        return {
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
                /*position:(p)=>{   //其中p为当前鼠标的位置
                    [p[0] + 10, p[1] - 10];
                }*/
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
    }