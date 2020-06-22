import React,{Component} from 'react'
import {connect} from 'react-redux'

import {Card,Button,Timeline,Select,Icon,Typography,Modal} from 'antd'

import {rTls} from '../../../redux/actions/timeline-action'
import {shortDate,formateYear} from '../../../utils/dateUtils'

const Option=Select.Option
const { Text } = Typography

class DTimeLine extends Component{
    state={
        isShow:false,
        reverse: true,
        years:[],
        tls:[],
        ytls:[]
    }
    
    handleClick = () => {
        this.setState({ reverse: !this.state.reverse });
    }
    
    selectYear=value=>{
        const ytls=[]
        if(value!=='all'){
            this.state.tls.forEach(tl=>{
                if(tl.create_time.substring(0, 4)===value.toString()){
                    ytls.push(tl)
                }
            })
            this.setState({ytls})
        }else{
            this.setState({ytls:this.state.tls})
        }
    }
    
    initTimelines=async()=>{
        await this.props.rTls()
        const result=this.props.timelinemanage
        const date=new Date()
        const thisyear=date.getFullYear()
        const tls=result.data
        const ytls=[]
        const arr=['all']
        tls.forEach(tl=>{
            arr.push(formateYear(tl.create_time))
        })
        const years=Array.from(new Set(arr))
        tls.forEach(tl=>{
            if(tl.create_time.substring(0, 4)===thisyear.toString()){
                ytls.push(tl)
            }
        })
        this.setState({
            tls,years,ytls:ytls
        })
    }
    
    showDetails=tlid=>{
        this.state.tls.forEach(tl=>{
            if(tl._id===tlid){
                this.details=tl.details
            }
        })
        this.setState({isShow:true})
    }
    
    componentWillMount(){
        this.initTimelines()
    }
    
    render(){
        const{years,reverse,ytls,isShow}=this.state
        const date=new Date()
        const thisyear=date.getFullYear()
        const title='时间轴'
        return(
            <Card title={title}>
                <div>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary"  onClick={this.handleClick}>
                             排序
                        </Button>
                        <Select defaultValue={thisyear} className="searchbar-select" onChange={this.selectYear} style={{float:'right'}}>
                            {years.map(year=><Option key={year} value={year}>{year}</Option>)}
                        </Select>
                    </div>
                    <Timeline pending="读取..." reverse={reverse} >
                        {
                            ytls.map(tl=>
                                <Timeline.Item key={tl._id}> 
                                {tl.name+' '+shortDate(tl.create_time)}
                                {tl.details?  <span>&nbsp;<Icon onClick={()=>{this.showDetails(tl._id)}} type="profile" theme="twoTone" /></span>:<span></span>}
                                </Timeline.Item>
                            )
                        }
                    </Timeline>
                    
                </div>
                <Modal
                  title={"详情"}
                  visible={isShow}
                  onOk={()=>{
                      this.setState({isShow:false}) 
                  }}
                  onCancel={()=>{
                      this.setState({isShow:false}) 
                  }}
                >
                    <Text>{this.details}</Text>
                </Modal>
            </Card>
        )
    }
}
export default connect(
    state=>({timelinemanage:state.timelinemanage}),
    {rTls}
)(DTimeLine)