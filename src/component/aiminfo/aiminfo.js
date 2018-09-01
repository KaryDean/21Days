import React from 'react'
import {List,Button} from 'antd-mobile'

class AimInfo extends React.Component{

  constructor(props){
    super(props)
    this.state={
    }
  }

  render(){
    return (
      <div>

      <List>
      <h4>{"目标详情: "+this.props.info.detail}</h4>
      <h5>{"监督人数: "+this.props.info.circusee}</h5>
      <h5>{"完成天数: "+this.props.info.doneDays+"/"+this.props.info.totalDays}</h5>
      <h5>{"参与金额: "+this.props.info.money}</h5>
      <h5>{"休息天数: "+this.props.info.rest+'/'+this.props.info.restDays}</h5>
      <Button size="small" type='warning' activeStyle={false}>交易地址1 {this.props.info.AddressOfTotal}</Button>
      <Button size="small" type='warning' activeStyle={false}>交易地址2 {this.props.info.AddressOfDeposit}</Button>
      </List>
      </div>
    )
  }
}

export default AimInfo
