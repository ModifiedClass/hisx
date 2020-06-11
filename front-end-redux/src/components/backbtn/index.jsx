import React from 'react'
import {Icon} from 'antd'

import {BASE_BLUE} from '../../utils/colors'
import './index.less'

export default function BackBtn(props){
    return(
        <button {...props} className="linkbtn" ><Icon type='left' style={{color:BASE_BLUE}}/></button>
    )
}