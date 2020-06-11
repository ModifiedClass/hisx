import React from 'react'
import {Icon} from 'antd'

import {BASE_BLUE} from '../../utils/colors'
import './index.less'

export default function PreviewBtn(props){
    return(
        <button {...props} className="linkbtn" ><Icon type='eye' theme="filled" style={{color:BASE_BLUE}}/></button>
    )
}