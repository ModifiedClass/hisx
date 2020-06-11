import React from 'react'
import {Icon} from 'antd'

import {BASE_GREEN} from '../../utils/colors'
import './index.less'

export default function EditBtn(props){
    return(
        <button {...props} className="linkbtn" ><Icon type='edit' theme="filled" style={{color:BASE_GREEN}}/></button>
    )
}