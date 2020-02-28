import React,{Component} from 'react'

import {Button} from 'antd'

import './index.less'
import {
    BASE_BLUE,
    BASE_GREY,
    BASE_RED,
    EyeProtectionGreen,
    BASE_BLACK,
    BASE_GREEN,
    BASE_YELLOW,
    BASE_VIOLET,
    BASE_PINK
    } 
    from '../../../utils/colors'
const data=[
  {title: '基色蓝',color:BASE_BLUE},
  {title: '基色灰',color:BASE_GREY},
  {title: '基色红',color:BASE_RED},
  {title: '护眼绿',color:EyeProtectionGreen},
  {title: '基色黑',color:BASE_BLACK},
  {title: '基色绿',color:BASE_GREEN},
  {title: '基色黄',color:BASE_YELLOW},
  {title: '基色紫',color:BASE_VIOLET},
  {title: '基色粉',color:BASE_PINK}
];

export default class Developing extends Component{

    render(){
        let btns=(
            <div>
            {
                data.map((data)=>{
                    return(
                        <Button 
                        key={data.color}
                        style={{backgroundColor:data.color,height:60,width:260}}
                        >
                        {data.title}
                        </Button>
                    )
                })
            }
            </div>
        )
        return(
            <div className="content">
            {/*<Icon type="loading" className="content-icon"/>
            <span>开发中</span>*/}
                <div>
                {btns}
                </div>
            </div>
        )
    }
}