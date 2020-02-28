import React,{Component} from 'react';

import './index.less'
export default class FooterBar extends Component{
    constructor() {
        super()
        let thisdate=new Date(),date=thisdate.getFullYear()
        this.state={
            date:date
        }
    }
    render(){
        let complany='hisp'
        let devdate='2020',copyrightdate=''
        if(this.state.date.toString() === devdate){
            copyrightdate=this.state.date
        }else{
            copyrightdate=devdate+' - '+this.state.date
        }
        return(
            <div className="footerbar">
                <span>&copy; {complany} &trade; {copyrightdate}</span>
            </div>
        )
    }
}