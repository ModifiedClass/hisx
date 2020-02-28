import React from 'react'
import {Icon} from 'antd'

import {BASE_RED} from '../../utils/colors'
import './index.less'

export default function DeleteBtn(props){
    return(
        <button {...props} className="linkbtn" ><Icon type='delete' theme="filled" style={{color:BASE_RED}}/></button>
    )
}