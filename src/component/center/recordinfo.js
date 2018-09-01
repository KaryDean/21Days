import React from 'react'
import {Button} from 'antd-mobile'


class RecordInfo extends React.Component{

  constructor(props){
    super(props)
    this.state={
    }
  }

  render(){
    return (
      <div>
      <h3>打卡地址</h3>
      {this.props.info.Record.map(v=>(
          <Button size="small" key={v} type='warning' activeStyle={false}>{v}</Button>
      ))}
      </div>
    )
  }
}

export default RecordInfo
